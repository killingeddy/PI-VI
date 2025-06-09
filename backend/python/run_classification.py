import os
import ssl
import certifi
import numpy as np
import pandas as pd
import yfinance as yf
import logging
from datetime import datetime
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans, AgglomerativeClustering
import matplotlib.pyplot as plt
import seaborn as sns
from dotenv import load_dotenv
import psycopg2
import warnings
from typing import List, Dict, Tuple, Optional
from IPython.display import display

try:
    from adjustText import adjust_text
    ADJUST_TEXT_INSTALLED = True
except ImportError:
    ADJUST_TEXT_INSTALLED = False

# ================= CONFIGURAÇÕES GERAIS ==================

warnings.filterwarnings('ignore')
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette('husl')
np.random.seed(42)  # Garantir reprodutibilidade
os.environ['SSL_CERT_FILE'] = certifi.where()
ssl._create_default_https_context = ssl._create_unverified_context

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, '..', 'data')
os.makedirs(DATA_DIR, exist_ok=True)

LOG_DIR = os.path.join(BASE_DIR, 'log')
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, f'preprocessing_PIVI{datetime.now().strftime("%Y%m%d_%H%M%S")}.log')

N_CLUSTERS = 5
PERIOD = '1y'
BENCHMARK = '^BVSP'

logging.basicConfig(filename=LOG_FILE,
                    level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(message)s')

# =========== FUNÇÕES UTILITÁRIAS E ETL =====================

def get_b3_tickers() -> List[str]:
    tickers = [
        'PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'ABEV3', 'B3SA3', 'WEGE3',
        'RENT3', 'BBAS3', 'PETR3', 'ITSA4', 'SUZB3', 'EQTL3', 'RADL3',
        'JBSS3', 'BBSE3', 'SANB11', 'HYPE3', 'UGPA3', 'BRFS3', 'CMIG4',
        'LREN3', 'BBDC3', 'VIVT3', 'MGLU3', 'GGBR4', 'EMBR3', 'RAIL3',
        'CCRO3', 'TOTS3', 'KLBN11', 'CIEL3', 'SULA11', 'ENEV3', 'CSAN3',
        'PCAR3', 'CSNA3', 'FLRY3', 'MRFG3', 'SBSP3', 'AZUL4', 'AMER3',
        'MULT3', 'CYRE3', 'BRML3', 'COGN3', 'BPAC11', 'YDUQ3', 'TAEE11', 'GOAU4'
    ]
    return tickers

def fetch_stock_data(ticker: str, period: str = PERIOD) -> Optional[pd.DataFrame]:
    """Baixa histórico de preços de um ticker da B3 via yfinance."""
    try:
        data = yf.Ticker(f'{ticker}.SA').history(period=period)
        if data.empty:
            logging.warning(f'{ticker}: Histórico vazio.')
            return None
        data = data.rename(columns=str.capitalize)
        required = ['Open', 'High', 'Low', 'Close', 'Volume']
        for col in required:
            if col not in data:
                data[col] = np.nan
        data = data[required]
        # Tratamento de valores ausentes e interpolação
        n_missing = data.isnull().sum().sum()
        if n_missing > 0:
            data.interpolate(method='linear', inplace=True)
            logging.info(f'{ticker}: {n_missing} valores interpolados.')
        # Remover zero volume (fins de semana/feriados)
        before = len(data)
        data = data[data['Volume'] > 0]
        if before != len(data):
            logging.info(f'{ticker}: {before-len(data)} registros com volume=0 removidos.')
        return data
    except Exception as e:
        logging.error(f'{ticker}: Falha no download - {str(e)}')
        return None

def fetch_fundamental_data(ticker):
    """Coleta dados fundamentais e cadastrais via yfinance .info"""
    info = {}
    try:
        yf_info = yf.Ticker(f"{ticker}.SA").info
        info = {
            'symbol': ticker,
            'company_name': yf_info.get('longName', ''),
            'sector': yf_info.get('sector', ''),
            'industry': yf_info.get('industry', ''),
            'market_cap': yf_info.get('marketCap', np.nan),
            'pe_ratio': yf_info.get('trailingPE', np.nan),
            'price_to_book': yf_info.get('priceToBook', np.nan),
            'roe': yf_info.get('returnOnEquity', np.nan),
            'dividend_yield': yf_info.get('dividendYield', np.nan),
            'profit_margins': yf_info.get('profitMargins', np.nan),
            'gross_margins': yf_info.get('grossMargins', np.nan),
            'ebitda_margins': yf_info.get('ebitdaMargins', np.nan),
            'enterprise_value': yf_info.get('enterpriseValue', np.nan),
            'revenue': yf_info.get('totalRevenue', np.nan),
            'website': yf_info.get('website', ''),
            'description': yf_info.get('longBusinessSummary', '')[:500]
        }
    except Exception as e:
        print(f"[ERRO] Erro ao buscar metadados de {ticker}: {e}")
    return info

def fetch_benchmark_returns(period: str = PERIOD) -> Optional[pd.Series]:
    try:
        hist = yf.Ticker(BENCHMARK).history(period=period)
        if hist.empty:
            logging.warning(f'{BENCHMARK}: Histórico vazio.')
            return None
        returns = np.log(hist['Close'] / hist['Close'].shift(1)).dropna()
        return returns
    except Exception as e:
        logging.error(f'Benchmark fetch failed: {e}')
        return None

def detect_outliers(data: pd.Series, threshold: float = 3.5) -> np.ndarray:
    """Aplica método MAD para detectar outliers."""
    median = np.median(data)
    diff = np.abs(data - median)
    mad = np.median(diff)
    if mad < 1e-6:
        return np.zeros_like(data, dtype=bool)  # Nenhum outlier detectável
    modified_z = 0.6745 * diff / (mad + 1e-9)
    return modified_z > threshold

def calculate_metrics(prices: pd.DataFrame, benchmark_returns: Optional[pd.Series]) -> Optional[Dict]:
    """
    Calcula métricas quantitativas de risco: volatilidade, max_drawdown, beta, etc.
    Além disso, detecta e remove outliers extremos nos retornos.
    """
    results = dict()
    prices = prices.copy()
    prices['Returns'] = np.log(prices['Close'] / prices['Close'].shift(1))
    returns = prices['Returns'].dropna()
    mask_outlier = detect_outliers(returns, threshold=5.0)
    returns = returns[~mask_outlier]
    if len(returns) < 21:
        logging.warning("Menos de 21 retornos válidos após limpezas.")
        return None
    results['volatility'] = returns.std() * np.sqrt(252)
    results['mean_return'] = returns.mean() * 252
    cumulative = (1 + returns).cumprod()
    running_max = cumulative.cummax()
    drawdown = cumulative / running_max - 1
    results['max_drawdown'] = abs(drawdown.min())
    results['liquidity'] = prices['Volume'].mean() / 1e6
    results['beta'] = np.nan
    if benchmark_returns is not None:
        idx = returns.index.intersection(benchmark_returns.index)
        if len(idx) > 30:
            ret_stock = returns.loc[idx]
            ret_bench = benchmark_returns.loc[idx]
            if ret_bench.nunique() > 1 and ret_stock.nunique() > 1:
                # np.polyfit retorna coef de inclinação (beta), _
                beta, _ = np.polyfit(ret_bench, ret_stock, 1)
                results['beta'] = beta
            else:
                results['beta'] = np.nan
        else:
            results['beta'] = np.nan
    return results

def remove_low_variance(df: pd.DataFrame, feats: List[str], threshold: float = 1e-8) -> List[str]:
    """Remove colunas com variância muito baixa."""
    low_var_cols = [f for f in feats if df[f].var() < threshold]
    if low_var_cols:
        logging.warning(f"Colunas removidas por baixa variância: {low_var_cols}")
    return [f for f in feats if f not in low_var_cols]

# =========== CLASSE PARA MANIPULAÇÃO DE DADOS DO BANCO =====================

class StockDataHandler:
    @staticmethod
    def insert_stocks_supabase(df_all: pd.DataFrame):
        load_dotenv(dotenv_path=os.path.join(BASE_DIR, '../.env'))
        DATABASE_URL = os.getenv("DATABASE_URL")
        assert DATABASE_URL, "DATABASE_URL não configurada."
        conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        cur = conn.cursor()
        for _, row in df_all.iterrows():
            try:
                cur.execute("""
                    INSERT INTO stocks (
                        symbol, company_name, sector, industry, market_cap, pe_ratio,
                        price_to_book, roe, dividend_yield, profit_margins, gross_margins,
                        ebitda_margins, enterprise_value, revenue, website, description,
                        volatility, max_drawdown, beta, mean_return,
                        liquidity, risk_level, risk_category
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                    )
                    ON CONFLICT (symbol) DO UPDATE SET
                        company_name=EXCLUDED.company_name,
                        sector=EXCLUDED.sector,
                        industry=EXCLUDED.industry,
                        market_cap=EXCLUDED.market_cap,
                        pe_ratio=EXCLUDED.pe_ratio,
                        price_to_book=EXCLUDED.price_to_book,
                        roe=EXCLUDED.roe,
                        dividend_yield=EXCLUDED.dividend_yield,
                        profit_margins=EXCLUDED.profit_margins,
                        gross_margins=EXCLUDED.gross_margins,
                        ebitda_margins=EXCLUDED.ebitda_margins,
                        enterprise_value=EXCLUDED.enterprise_value,
                        revenue=EXCLUDED.revenue,
                        website=EXCLUDED.website,
                        description=EXCLUDED.description,
                        volatility=EXCLUDED.volatility,
                        max_drawdown=EXCLUDED.max_drawdown,
                        beta=EXCLUDED.beta,
                        mean_return=EXCLUDED.mean_return,
                        liquidity=EXCLUDED.liquidity,
                        risk_level=EXCLUDED.risk_level,
                        risk_category=EXCLUDED.risk_category,
                        updated_at = CURRENT_TIMESTAMP
                """, (
                    row['ticker'], row.get('company_name'), row.get('sector'), row.get('industry'),
                    row.get('market_cap'), row.get('pe_ratio'), row.get('price_to_book'), row.get('roe'),
                    row.get('dividend_yield'), row.get('profit_margins'), row.get('gross_margins'), row.get('ebitda_margins'),
                    row.get('enterprise_value'), row.get('revenue'), row.get('website'), row.get('description'),
                    row.get('volatility'), row.get('max_drawdown'), row.get('beta'),row.get('mean_return'), 
                    row.get('liquidity'), row.get('risk_level'), row.get('risk_category')
                ))
            except Exception as err:
                logging.error(f"Erro ao inserir {row['ticker']} no Supabase: {err}")
        conn.commit()
        cur.close()
        conn.close()
        print('Dados salvos no Supabase com sucesso!')

    @staticmethod
    def insert_stock_prices_supabase(historical_data: Dict[str, pd.DataFrame]):
        """Insere dados históricos de preços na tabela stock_prices"""
        load_dotenv(dotenv_path=os.path.join(BASE_DIR, '../.env'))
        DATABASE_URL = os.getenv("DATABASE_URL")
        assert DATABASE_URL, "DATABASE_URL não configurada."
        
        conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        cur = conn.cursor()
        
        try:
            for ticker, df in historical_data.items():
                # Primeiro, obter o stock_id
                cur.execute("SELECT id FROM stocks WHERE symbol = %s", (ticker,))
                result = cur.fetchone()
                
                if result is None:
                    logging.warning(f"Stock {ticker} não encontrado na tabela stocks. Pulando dados históricos.")
                    continue
                    
                stock_id = result[0]
                
                # Preparar dados para inserção
                df_copy = df.copy()
                df_copy.reset_index(inplace=True)
                
                # Verificar se existe coluna de data
                if 'Date' in df_copy.columns:
                    date_col = 'Date'
                elif df_copy.index.name == 'Date' or 'date' in str(df_copy.index.name).lower():
                    df_copy.reset_index(inplace=True)
                    date_col = df_copy.columns[0]  # Primeira coluna após reset_index
                else:
                    date_col = df_copy.columns[0]  # Assumir que a primeira coluna é a data
                
                # Inserir cada linha de dados históricos
                for _, row in df_copy.iterrows():
                    try:
                        # O yfinance já fornece Close ajustado por padrão
                        adj_close = row['Close']  # yfinance já fornece ajustado
                        
                        cur.execute("""
                            INSERT INTO stock_prices (
                                stock_id, date, open, high, low, close, volume, adj_close
                            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                            ON CONFLICT (stock_id, date) DO UPDATE SET
                                open = EXCLUDED.open,
                                high = EXCLUDED.high,
                                low = EXCLUDED.low,
                                close = EXCLUDED.close,
                                volume = EXCLUDED.volume,
                                adj_close = EXCLUDED.adj_close
                        """, (
                            stock_id,
                            row[date_col].date() if hasattr(row[date_col], 'date') else row[date_col],
                            float(row['Open']) if pd.notna(row['Open']) else None,
                            float(row['High']) if pd.notna(row['High']) else None,
                            float(row['Low']) if pd.notna(row['Low']) else None,
                            float(row['Close']) if pd.notna(row['Close']) else None,
                            int(row['Volume']) if pd.notna(row['Volume']) else None,
                            float(adj_close) if pd.notna(adj_close) else None
                        ))
                    except Exception as row_err:
                        logging.error(f"Erro ao inserir preço de {ticker} em {row[date_col]}: {row_err}")
                        
            conn.commit()
            print('Dados históricos salvos no banco com sucesso!')
            
        except Exception as e:
            logging.error(f"Erro geral ao inserir dados históricos: {e}")
            conn.rollback()
        finally:
            cur.close()
            conn.close()

# =========== PIPELINE DE PROCESSAMENTO =============

class RiskClassifier:
    """
    Pipeline ETL + modelagem + visualização + exportação.
    """
    def __init__(self, tickers: List[str], period: str = PERIOD, cluster_method: str = 'kmeans', n_clusters: int = N_CLUSTERS):
        self.tickers = tickers
        self.period = period
        self.cluster_method = cluster_method
        self.n_clusters = n_clusters
        self.benchmark_returns = fetch_benchmark_returns(period)
        self.metrics = []
        self.fundamentals = []
        self.historical_data = {}
        self.df_metrics = None
        self.labels_map = {1: "Muito Baixo", 2: "Baixo", 3: "Médio", 4: "Alto", 5: "Muito Alto"}
        self.normalized_feats = None

    def run(self):
        logging.info("Iniciando pipeline de classificação de risco...")
        for t in self.tickers:
            hist = fetch_stock_data(t, self.period)
            if hist is None or len(hist) < 60:
                logging.warning(f'{t}: Dados insuficientes.')
                continue
            met = calculate_metrics(hist, self.benchmark_returns)
            if met is None:
                continue
            self.historical_data[t] = hist.copy()
            met['ticker'] = t
            self.metrics.append(met)
            self.fundamentals.append(fetch_fundamental_data(t))
            logging.info(f'{t}: Métricas e fundamentais coletados com sucesso.')
        if not self.metrics:
            logging.error("Nenhuma ação com métricas calculadas!")
            return
        self.df_metrics = pd.DataFrame(self.metrics)
        self.df_fundam = pd.DataFrame(self.fundamentals)
        if not self.df_fundam.empty and 'symbol' not in self.df_fundam.columns:
            self.df_fundam['symbol'] = ""
        elif self.df_fundam.empty:
            self.df_fundam = pd.DataFrame(columns=['symbol'])
        self.df_metrics = pd.merge(self.df_metrics, self.df_fundam, left_on='ticker', right_on='symbol', how='left')
        self.normalize()
        self.cluster()
        self.visualize(show_labels=False)
        self.export()
        # Logging resumo por categoria de risco
        logging.info(self.df_metrics[['ticker', 'risk_category']].groupby('risk_category').count())

    def normalize(self):
        scaler = StandardScaler()
        feats = ['volatility', 'max_drawdown', 'beta', 'liquidity']
        # Remove colunas de baixa variância!
        feats = remove_low_variance(self.df_metrics, feats)
        self.normalized_feats = feats.copy()
        valid = self.df_metrics[feats].fillna(self.df_metrics[feats].mean())
        self.df_metrics[[f + "_norm" for f in feats]] = scaler.fit_transform(valid)

    def cluster(self):
        feats = [f + "_norm" for f in self.normalized_feats]
        X = self.df_metrics[feats]
        if self.cluster_method == 'kmeans':
            estimator = KMeans(n_clusters=self.n_clusters, random_state=42, n_init=20)
        elif self.cluster_method == 'hierarchical':
            estimator = AgglomerativeClustering(n_clusters=self.n_clusters)
        else:
            raise ValueError("Método de clusterização não suportado.")
        clusters = estimator.fit_predict(X)
        # Ordenar níveis de risco
        risk_combo = [self.df_metrics.loc[clusters == c, 'volatility'].mean() +
                      self.df_metrics.loc[clusters == c, 'max_drawdown'].mean()
                      for c in range(self.n_clusters)]
        order = np.argsort(risk_combo)
        logging.info(f'Order clusters/risk_combo: {order} {risk_combo}')
        level_map = {old: new + 1 for new, old in enumerate(order)}
        self.df_metrics['risk_level'] = [level_map[c] for c in clusters]
        self.df_metrics['risk_category'] = self.df_metrics['risk_level'].map(self.labels_map)

    def visualize(self, show_labels=False):
        # Dispersão: Volatilidade vs Drawdown colore por nível de risco
        plt.figure(figsize=(10, 6))
        sns.scatterplot(data=self.df_metrics,
                        x='volatility', y='max_drawdown',
                        hue='risk_category', palette='husl', s=100)
        texts = []
        if show_labels:
            for _, row in self.df_metrics.iterrows():
                texts.append(plt.text(row['volatility'], row['max_drawdown'], row['ticker'], fontsize=8, alpha=0.7))
            if ADJUST_TEXT_INSTALLED and texts:
                adjust_text(texts)
            else:
                print("Pacote adjustText não instalado; rótulos podem se sobrepor.")
        plt.title("Mapa de Risco das Ações B3")
        plt.xlabel("Volatilidade Anualizada")
        plt.ylabel("Max Drawdown")
        plt.legend()
        plt.tight_layout()
        os.makedirs(DATA_DIR, exist_ok=True)
        plt.savefig(os.path.join(DATA_DIR, "risk_scatter.png"))
        plt.close()

        # Histograma dos níveis de risco
        plt.figure(figsize=(8, 4))
        sns.countplot(x='risk_category', data=self.df_metrics, palette='husl')
        plt.title("Distribuição dos Níveis de Risco")
        plt.tight_layout()
        plt.savefig(os.path.join(DATA_DIR, "risk_hist.png"))
        plt.close()

    def export(self):
        """Exporta CSV e loga estatísticas principais."""
        os.makedirs(DATA_DIR, exist_ok=True)
        path = os.path.join(DATA_DIR, "classified_stocks_b3.csv")
        self.df_metrics.to_csv(path, index=False)
        logging.info(f'Dados finais salvos em {path}')
        print(f'Resumo:\n{self.df_metrics[["ticker", "volatility", "max_drawdown", "beta", "liquidity", "risk_category"]]}')

# ============ EXECUÇÃO PRINCIPAL ==============

if __name__ == "__main__":
    tickers = get_b3_tickers()
    clf = RiskClassifier(tickers, period=PERIOD, cluster_method='kmeans', n_clusters=5)
    clf.run()
    
    if clf.df_metrics is not None:
        # Primeiro inserir os dados das ações usando StockDataHandler
        StockDataHandler.insert_stocks_supabase(clf.df_metrics)
        
        # Depois inserir os dados históricos
        if clf.historical_data:
            StockDataHandler.insert_stock_prices_supabase(clf.historical_data)