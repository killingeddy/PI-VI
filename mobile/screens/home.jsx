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

  const [quantity, setQuantity] = React.useState(0);
  const [purchasePrice, setPurchasePrice] = React.useState(0);
  const [purchaseDate, setPurchaseDate] = React.useState(new Date());

  const [registering, setRegistering] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const fetchStocks = async () => {
    setLoading(true);
    await api
      .get("/stocks")
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
                <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
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
