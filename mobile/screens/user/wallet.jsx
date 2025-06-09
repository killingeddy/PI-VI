import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToastManager, { Toast } from "toastify-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Loader from "../../tools/loader";
import { api } from "../../tools/api";
import { Image } from "expo-image";
import React from "react";

export default function UserWalletScreen() {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const [portifolioSummary, setPortifolioSummary] = React.useState({});
  const [portifolioStocks, setPortifolioStocks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo !== null) {
        const parsedUserInfo = JSON.parse(userInfo);

        setUser(parsedUserInfo);
      } else {
        setUser(null);
      }
    } catch (error) {
      Toast.error("Erro ao recuperar informações do usuário");
    }
  };

  const getPortifolioSummary = async () => {
    setLoading(true);
    await api
      .get(`/portfolios/${user?.id}`)
      .then((response) => {
        setPortifolioSummary(response.data.data);
      })
      .catch((error) => {
        Toast.error("Erro ao recuperar resumo do portfólio");
        setPortifolioSummary({});
      })
      .finally(() => {
        getPortifolioStocks();
      });
  };

  const getPortifolioStocks = async () => {
    await api
      .get(`/portfolios/${user?.id}/stocks`)
      .then((response) => {
        setPortifolioStocks(response.data.data);
      })
      .catch((error) => {
        Toast.error("Erro ao recuperar ações do portfólio");
        setPortifolioStocks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deletePortifolioStock = async (stockId) => {
    setLoading(true);
    await api
      .delete(`/portfolios/${user?.id}/stocks/${stockId}`)
      .then((response) => {
        Toast.success("Ação excluída com sucesso");
        getPortifolioSummary();
      })
      .catch((error) => {
        Toast.error("Erro ao excluir ação do portfólio");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
      if (user?.id) {
        getPortifolioSummary();
      } else {
        setPortifolioSummary({});
        setPortifolioStocks([]);
      }
    }, [user?.id])
  );

  return (
    <View style={styles.container}>
      {!user ? (
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              color: "#235c5b",
              textAlign: "center",
            }}
          >
            Você precisa estar logado para acessar esta página.
          </Text>
          <Image
            source={require("../../assets/images/auth.png")}
            contentFit="cover"
            style={{
              width: "100%",
              height: 400,
            }}
          />
          <Button
            mode="contained"
            style={{
              width: "90%",
              height: 50,
              backgroundColor: "#024d40",
              marginTop: 20,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              FAZER LOGIN
            </Text>
          </Button>
        </View>
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#235c5b",
            }}
          >
            Olá, {user?.name}!
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Acompanhe seus investimentos:
          </Text>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 10,
              padding: 10,
              backgroundColor: "#e0f2f1",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Total Investido:
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: "#235c5b",
                fontWeight: "bold",
              }}
            >
              {formatter.format(portifolioSummary.totalInvested || 0)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                marginBottom: 10,
                padding: 10,
                backgroundColor: "#fff9c4",
                borderRadius: 10,
                width: "48%",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Total Valor Atual:
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: "#8c7f0b",
                  fontWeight: "bold",
                }}
              >
                {formatter.format(portifolioSummary.totalCurrentValue || 0)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 10,
                padding: 10,
                backgroundColor: "#ffcccc",
                borderRadius: 10,
                width: "48%",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Total Prejuízo:
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: "#c23030",
                  fontWeight: "bold",
                }}
              >
                {formatter.format(portifolioSummary.profitLoss || 0)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                marginBottom: 10,
                padding: 10,
                backgroundColor: "#e6e6e6",
                borderRadius: 10,
                width: "31%",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Total Ações:
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: "#616161",
                  fontWeight: "bold",
                }}
              >
                {portifolioSummary.stockCount || 0}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 10,
                padding: 10,
                backgroundColor: "#e6e6e6",
                borderRadius: 10,
                width: "31%",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Média Risco:
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: "#616161",
                  fontWeight: "bold",
                }}
              >
                {parseFloat(portifolioSummary.averageRiskLevel).toFixed(2) || 0}
                %
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 10,
                padding: 10,
                backgroundColor: "#e6e6e6",
                borderRadius: 10,
                width: "31%",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Média Beta:
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: "#616161",
                  fontWeight: "bold",
                }}
              >
                {parseFloat(portifolioSummary.averageBeta).toFixed(2) || 0}%
              </Text>
            </View>
          </View>
          <ScrollView>
            {portifolioStocks?.map((stock, index) => (
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#f0f0f0",
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
                key={index}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {stock.company_name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      Volatilidade:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {parseFloat(stock.volatility).toFixed(2)}%
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "black",
                        textAlign: "right",
                      }}
                    >
                      Beta:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {parseFloat(stock.beta).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      Categoria de Risco:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {stock.risk_category}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "black",
                        textAlign: "right",
                      }}
                    >
                      Simbolo:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {stock.symbol}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginTop: 10,
                  }}
                >
                  <Button
                    mode="contained"
                    style={{
                      backgroundColor: "#400101",
                      width: "100%",
                      height: 40,
                    }}
                    onPress={() => deletePortifolioStock(stock.id)}
                  >
                    <Text style={{ color: "#ffebeb", fontSize: 16 }}>
                      Excluir Ação
                    </Text>
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
      <ToastManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
});
