const db = require('../config/database');

class StockAnalysisService {
  /**
   * Calcula informações de análise técnica para uma ação
   * @param {string} symbol Símbolo da ação
   * @returns {Object} Análise técnica da ação
   */
  async analyzeStock(symbol) {
    try {  
    // Buscar cadastro completo da ação  
    const stockResult = await db.query('SELECT * FROM stocks WHERE symbol = $1', [symbol]);  
    if (stockResult.rows.length === 0) {  
      throw new Error(`Ação com símbolo ${symbol} não encontrada`);  
    }  
    const stockData = stockResult.rows[0]; 
      // Obter dados históricos dos últimos 252 dias úteis (1 ano)
       const stockId = stockData.id;  
    const pricesResult = await db.query(`  
      SELECT date, adj_close, volume   
      FROM stock_prices   
      WHERE stock_id = $1   
      ORDER BY date DESC  
      LIMIT 252`, [stockId]);  
    const prices = pricesResult.rows.reverse();  
    if (prices.length < 20) throw new Error('Dados históricos insuficientes para análise');
      
      // Calcular média móvel de 20 dias
      const ma20 = this.calculateMovingAverage(prices, 20);
      
      // Calcular média móvel de 50 dias
      const ma50 = this.calculateMovingAverage(prices, 50);
      
      // Calcular RSI (Relative Strength Index)
      const rsi = this.calculateRSI(prices);
      
      // Calcular retorno diário médio
      const dailyReturns = this.calculateDailyReturns(prices);
      const avgDailyReturn = dailyReturns.reduce((sum, val) => sum + val, 0) / dailyReturns.length;
      
      // Calcular volatilidade (desvio padrão dos retornos diários)
      const volatility = this.calculateVolatility(dailyReturns);
      
      // Tendência recente (últimos 30 dias)
      const recentTrend = this.calculateTrend(prices.slice(-30));
      
      // Calcular preço atual e variação diária
      const latestPrice = prices[prices.length - 1].adj_close;
      const previousPrice = prices[prices.length - 2].adj_close;
      const dailyChange = ((latestPrice - previousPrice) / previousPrice) * 100;
      
      return {  
      symbol: stockData.symbol,  
      company_name: stockData.company_name,  
      sector: stockData.sector,  
      industry: stockData.industry,  
      risk_category: stockData.risk_category,  
      dividend_yield: stockData.dividend_yield,  
      risk_level: stockData.risk_level,  
      volatility: stockData.volatility,  
      max_drawdown: stockData.max_drawdown,  
      beta: stockData.beta,  
      liquidity: stockData.liquidity,  
      market_cap: stockData.market_cap,  
      pe_ratio: stockData.pe_ratio,  
      price_to_book: stockData.price_to_book,  
      roe: stockData.roe,  
      profit_margins: stockData.profit_margins,  
      gross_margins: stockData.gross_margins,  
      ebitda_margins: stockData.ebitda_margins,  
      enterprise_value: stockData.enterprise_value,  
      revenue: stockData.revenue,  
      website: stockData.website,  
      description: stockData.description,  
      // Dados técnicos calculados  
      latestPrice,  
      dailyChange,  
      movingAverage20Days: ma20[ma20.length - 1],  
      movingAverage50Days: ma50[ma50.length - 1],  
      rsi: rsi[rsi.length - 1],  
      avgDailyReturn,  
      recentTrend,  
      priceHistory: prices.map(p => ({  
        date: p.date,  
        price: p.adj_close,  
        volume: p.volume  
      }))  
    };  
  } catch (error) {  
    console.error(`Erro ao analisar ação ${symbol}:`, error);  
    throw error;  
  }  
}  
  
  // Calcula a média móvel para um período específico
  calculateMovingAverage(prices, period) {
    const result = [];
    
    for (let i = 0; i < prices.length; i++) {
      if (i < period - 1) {
        result.push(null);
        continue;
      }
      
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) {
        sum += parseFloat(prices[j].adj_close);
      }
      
      result.push(sum / period);
    }
    
    return result;
  }
  
  // Calcula os retornos diários
  calculateDailyReturns(prices) {
    const returns = [];
    
    for (let i = 1; i < prices.length; i++) {
      const previousPrice = parseFloat(prices[i - 1].adj_close);
      const currentPrice = parseFloat(prices[i].adj_close);
      returns.push((currentPrice - previousPrice) / previousPrice);
    }
    
    return returns;
  }
  
  // Calcula a volatilidade (desvio padrão dos retornos)
  calculateVolatility(returns) {
    const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
    const variance = returns.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / returns.length;
    return Math.sqrt(variance) * Math.sqrt(252); // Anualizado
  }
  
  // Calcula o RSI (Relative Strength Index)
  calculateRSI(prices, period = 14) {
    const changes = [];
    for (let i = 1; i < prices.length; i++) {
      changes.push(parseFloat(prices[i].adj_close) - parseFloat(prices[i - 1].adj_close));
    }
    
    const result = [];
    for (let i = 0; i < period - 1; i++) {
      result.push(null);
    }
    
    for (let i = period - 1; i < changes.length; i++) {
      let gains = 0;
      let losses = 0;
      
      for (let j = i - period + 1; j <= i; j++) {
        if (changes[j] > 0) {
          gains += changes[j];
        } else {
          losses -= changes[j];
        }
      }
      
      const avgGain = gains / period;
      const avgLoss = losses / period;
      
      if (avgLoss === 0) {
        result.push(100);
      } else {
        const rs = avgGain / avgLoss;
        result.push(100 - (100 / (1 + rs)));
      }
    }
    
    return result;
  }
  
  // Calcula a tendência recente
  calculateTrend(prices) {
    if (prices.length < 2) return 'Indefinida';
    
    const firstPrice = parseFloat(prices[0].adj_close);
    const lastPrice = parseFloat(prices[prices.length - 1].adj_close);
    
    const percentChange = ((lastPrice - firstPrice) / firstPrice) * 100;
    
    if (percentChange > 5) return 'Alta';
    if (percentChange < -5) return 'Baixa';
    return 'Lateral';
  }
  
  // Busca ações com base em filtros
  async getStocksWithFilters(filters = {}, limit = 100, offset = 0) {
    try {
      let query = `
        SELECT 
          s.id, 
          s.symbol, 
          s.company_name, 
          s.sector, 
          s.risk_category, 
          trunc(s.dividend_yield, 2),
            trunc(sp.adj_close, 2) as latest_price,
            sp."date" as price_date
        FROM stocks s
        LEFT JOIN (
          SELECT DISTINCT ON (stock_id) stock_id, adj_close, "date"
          FROM stock_prices
          ORDER BY stock_id, "date" DESC
        ) sp ON s.id = sp.stock_id
        WHERE 1=1
      `;
      
      const queryParams = [];
      let paramCount = 1;
      
      // Filtro por categoria de risco
      if (filters.riskCategory) {
        query += ` AND s.risk_category = $${paramCount}`;
        queryParams.push(filters.riskCategory);
        paramCount++;
      }
      
      // Filtro por setor
      if (filters.sector) {
        query += ` AND s.sector = $${paramCount}`;
        queryParams.push(filters.sector);
        paramCount++;
      }

      // Ordenação
      query += ` ORDER BY s.symbol ASC`;

      // Limite e offset
      query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
      queryParams.push(limit, offset);
      paramCount += 2;

      const result = await db.query(query, queryParams);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar ações com filtros:', error);
      throw error;
    }
  }
}

module.exports = new StockAnalysisService();