import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import Loader from "../../tools/loader";
import Modal from "react-native-modal";
import { api } from "../../tools/api";
import { Image } from "react-native";
import moment from "moment";
import React from "react";

export default function UserSharesScreen({ navigation }) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const [user, setUser] = React.useState(null);

  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [registering, setRegistering] = React.useState(false);
  const [detailsVisible, setDetailsVisible] = React.useState(false);

  const [selectedStock, setSelectedStock] = React.useState({});

  const [quantity, setQuantity] = React.useState(0);
  const [purchasePrice, setPurchasePrice] = React.useState(0);
  const [purchaseDate, setPurchaseDate] = React.useState(new Date());

  const [primaryRecommendations, setPrimaryRecommendations] = React.useState(
    []
  );
  const [secondaryRecommendations, setSecondaryRecommendations] =
    React.useState([]);

  const [type, setType] = React.useState("primary");

  const getRecommendations = async () => {
    setLoading(true);
    await api
      .get(`/recommendations/${user?.id}`)
      .then((response) => {
        const { primary, secondary } = response.data.data.recommendations;
        setPrimaryRecommendations(primary);
        setSecondaryRecommendations(secondary);
      })
      .catch((error) => {})
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

  const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo !== null) {
        const parsedUserInfo = JSON.parse(userInfo);
        setUser(parsedUserInfo);
      }
    } catch (error) {
      console.error("Error retrieving userInfo:", error);
    }
    return null;
  };

  const handleStockAcquisition = async () => {
    setRegistering(true);
    if (!selectedStock || !quantity || !purchasePrice) {
      Toast.error("Por favor, preencha todos os campos.");
      setRegistering(false);
      return;
    }

    const acquisitionData = {
      stockId: selectedStock.id,
      symbol: selectedStock.symbol,
      quantity: quantity,
      purchasePrice: purchasePrice,
      purchaseDate: moment(purchaseDate).format("YYYY-MM-DD"),
    };

    await api
      .post(`/portfolios/${user?.id}/stocks`, acquisitionData)
      .then((response) => {
        Toast.success("Ação adquirida com sucesso!");
        setIsModalVisible(false);
        setSelectedStock({});
        setQuantity(0);
        setPurchasePrice(0);
        setPurchaseDate(new Date());
        getRecommendations();
      })
      .catch((error) => {
        console.log(error);

        Toast.error(error?.response?.data?.error || "Erro ao adquirir ação");
      })
      .finally(() => {
        setRegistering(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
      getRecommendations();
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
            resizeMode="cover"
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
      ) : (
        <>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#235c5b",
            }}
          >
            Acompanhe o que investir:
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Preparamos algumas sugestões para você, basendo em seu perfil:
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: type === "primary" ? "#024d40" : "#fff",
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "#024d40",
              }}
              onPress={() => setType("primary")}
            >
              <Text
                style={{
                  color: type === "primary" ? "#fff" : "#000",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Primárias
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: type === "secondary" ? "#024d40" : "#fff",
                borderWidth: 1,
                borderColor: "#024d40",
                borderRadius: 100,
                marginLeft: 10,
              }}
              onPress={() => setType("secondary")}
            >
              <Text
                style={{
                  color: type === "secondary" ? "#fff" : "#000",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Secundárias
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <Loader
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <>
              <ScrollView
                style={{ display: type === "primary" ? "flex" : "none" }}
              >
                {primaryRecommendations?.map((stock, index) => (
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
              <ScrollView
                style={{ display: type === "secondary" ? "flex" : "none" }}
              >
                {secondaryRecommendations?.map((stock, index) => (
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
                      Adquirir Ação: {selectedStock.company_name}
                    </Text>
                    <View>
                      <TextInput
                        label="Quantidade"
                        mode="outlined"
                        value={quantity || 0}
                        onChangeText={(text) => setQuantity(parseInt(text))}
                        keyboardType="numeric"
                        style={{ marginBottom: 10 }}
                      />
                    </View>
                    <View>
                      <TextInput
                        label="Preço de Compra"
                        mode="outlined"
                        value={purchasePrice || 0}
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
    paddingTop: 40,
  },
});
