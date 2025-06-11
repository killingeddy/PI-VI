import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastManager, { Toast } from "toastify-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Loader from "../tools/loader";
import { api } from "../tools/api";
import moment from "moment";
import React from "react";

export default function HomeScreen() {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const [stocks, setStocks] = React.useState([]);
  const [selectedStock, setSelectedStock] = React.useState({});

  const [searchQuery, setSearchQuery] = React.useState("");

  const [quantity, setQuantity] = React.useState(0);
  const [purchasePrice, setPurchasePrice] = React.useState(0);
  const [purchaseDate, setPurchaseDate] = React.useState(new Date());

  const [registering, setRegistering] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [detailsVisible, setDetailsVisible] = React.useState(false);

  const fetchStocks = async () => {
    setLoading(true);
    await api
      .get("/stocks", {
        params: {
          search: searchQuery,
        },
      })
      .then((response) => {
        setStocks(response.data.data);
      })
      .catch((error) => {
        Toast.error("Erro ao buscar ações");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchStockDetails = async (stockId) => {
    setLoading(true);
    await api
      .get(`/stocks/${stockId}`)
      .then((response) => {
        setSelectedStock(response.data.data);
        setDetailsVisible(true);
      })
      .catch((error) => {
        Toast.error("Erro ao buscar detalhes da ação");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStockAcquisition = async () => {
    setRegistering(true);
    if (!selectedStock || !quantity || !purchasePrice) {
      Toast.error("Por favor, preencha todos os campos.");
      setRegistering(false);
      return;
    }

    const acquisitionData = {
      stockId: selectedStock?.id,
      symbol: selectedStock?.symbol,
      quantity: quantity,
      purchasePrice: purchasePrice,
      purchaseDate: moment(purchaseDate).format("YYYY-MM-DD"),
    };

    await api
      .post(`/portfolios/${user?.id}/stocks`, acquisitionData)
      .then((response) => {
        Toast.success("Ação adquirida com sucesso!");
        fetchStocks();
        setIsModalVisible(false);
        setQuantity(0);
        setPurchasePrice(0);
        setPurchaseDate(new Date());
        setSelectedStock({});
      })
      .catch((error) => {
        console.log(error);

        Toast.error(error?.response?.data?.error || "Erro ao adquirir ação");
      })
      .finally(() => {
        setRegistering(false);
      });
  };

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

  useFocusEffect(
    React.useCallback(() => {
      fetchStocks();
      getUserInfo();
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
          <View
            style={{
              width: "100%",
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              label="Pesquisar Ação"
              mode="outlined"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={fetchStocks}
              style={{ marginBottom: 10, flex: 1, backgroundColor: "#fff" }}
              theme={{
                colors: {
                  primary: "#024d40",
                  placeholder: "#024d40",
                },
                roundness: 15,
              }}
              outlineColor="#024d40"
              activeOutlineColor="#024d40"
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#024d40",
                width: 40,
                height: 40,
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginLeft: 10,
              }}
              onPress={fetchStocks}
            >
              <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
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
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Button
                    mode="contained"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#024d40",
                      borderWidth: 1,
                      width: "38%",
                      height: 40,
                    }}
                    onPress={() => {
                      fetchStockDetails(stock.symbol);
                      setDetailsVisible(true);
                    }}
                  >
                    <Text style={{ color: "#024d40", fontWeight: "bold" }}>
                      Detalhes
                    </Text>
                  </Button>
                  <Button
                    mode="contained"
                    style={{
                      backgroundColor: "#024d40",
                      width: "58%",
                      height: 40,
                    }}
                    onPress={() => {
                      setSelectedStock(stock);
                      setIsModalVisible(true);
                    }}
                  >
                    Adquirir
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <KeyboardAvoidingView
          style={{
            padding: 20,
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1000,
            }}
          >
            <Text style={{ fontSize: 20, color: "#024d40" }}>✕</Text>
          </TouchableOpacity>
          {user ? (
            <>
              {registering ? (
                <View
                  style={{
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader />
                </View>
              ) : (
                <>
                  <>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Adquirir Ação: {selectedStock?.company_name}
                    </Text>
                    <View>
                      <TextInput
                        label="Quantidade"
                        mode="outlined"
                        value={quantity}
                        onChangeText={(text) => setQuantity(parseInt(text))}
                        keyboardType="numeric"
                        style={{ marginBottom: 10 }}
                      />
                    </View>
                    <View>
                      <TextInput
                        label="Preço de Compra"
                        mode="outlined"
                        value={purchasePrice}
                        onChangeText={(text) =>
                          setPurchasePrice(parseFloat(text))
                        }
                        keyboardType="numeric"
                        style={{ marginBottom: 10 }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleStockAcquisition();
                      }}
                      style={{
                        backgroundColor: "#024d40",
                        width: "100%",
                        height: 40,
                        marginTop: 10,
                        justifyContent: "center",
                        borderRadius: 100,
                        zIndex: 100,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {registering ? "Registrando..." : "Registrar Ação"}
                      </Text>
                    </TouchableOpacity>
                  </>
                </>
              )}
            </>
          ) : (
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
              Por favor, faça login para adquirir ações.
            </Text>
          )}
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        isVisible={detailsVisible}
        onBackdropPress={() => setDetailsVisible(false)}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <ScrollView
          style={{
            padding: 20,
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 20,
            height: "auto",
            maxHeight: "80%",
          }}
        >
          <TouchableOpacity
            onPress={() => setDetailsVisible(false)}
            style={{
              position: "absolute",
              top: -10,
              right: -2,
              zIndex: 1000,
            }}
          >
            <Text style={{ fontSize: 20, color: "#024d40" }}>✕</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#024d40",
            }}
          >
            {selectedStock?.company_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
            >
              Símbolo:
            </Text>
            <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
              {selectedStock?.symbol}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
            >
              Setor:
            </Text>
            <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
              {selectedStock?.sector}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
              >
                Industria:
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
                {selectedStock?.industry}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
              >
                Categoria de Risco:
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
                {selectedStock?.risk_category}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
              >
                Último Preço:
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
                {formatter.format(parseFloat(selectedStock?.latestPrice))}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
              >
                Tendência Recente:
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
                {selectedStock?.recentTrend}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
              >
                Variação Percentual:
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
                {parseFloat(selectedStock?.volatility).toFixed(2)}%
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
              >
                Receita Anual:
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
                {formatter.format(parseFloat(selectedStock?.revenue))}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
              >
                Média Móvel dos Últimos 20 Dias:
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
                {formatter.format(
                  parseFloat(selectedStock?.movingAverage20Days)
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#024d40", fontWeight: "bold" }}
              >
                Média Móvel dos Últimos 50 Dias:
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "semibold" }}>
                {formatter.format(
                  parseFloat(selectedStock?.movingAverage50Days)
                )}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <BarChart
              data={selectedStock?.priceHistory?.map((item) => ({
                value: parseFloat(item.price),
                label: moment(item.date).format("DD/MM"),
              }))}
              width={250}
              height={200}
              barWidth={15}
              spacing={10}
              barBorderRadius={5}
              xAxisLabelTextStyle={{
                color: "#024d40",
                fontSize: 8,
              }}
              yAxisLabelWidth={30}
            />
          </View>
        </ScrollView>
      </Modal>
      <ToastManager />
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
