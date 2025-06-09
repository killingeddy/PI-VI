import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Loader from "../tools/loader";
import { api } from "../tools/api";
import React from "react";

export default function HomeScreen() {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const [stocks, setStocks] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const fetchStocks = async () => {
    setLoading(true);
    await api
      .get("/stocks")
      .then((response) => {
        setStocks(response.data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar ações:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStocks();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#235c5b",
            }}
          >
            Todas as Ações:
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Acompanhe o mercado de investimentos:
          </Text>
          <ScrollView>
            {stocks.map((stock, index) => (
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
                      Setor:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {stock.sector}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      Último Preço:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {formatter.format(parseFloat(stock.latest_price))}
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
                      }}
                    >
                      Última Atualização:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {new Date(stock.price_date).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
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
                      backgroundColor: "#024d40",
                      width: "100%",
                      height: 40,
                    }}
                    onPress={() => console.log("Pressed")}
                  >
                    Adquirir
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 0,
    paddingTop: 40,
  },
});
