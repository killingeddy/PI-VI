import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Loader from "../../tools/loader";
import { api } from "../../tools/api";
import { Image } from "react-native";
import React from "react";

export default function UserSharesScreen({ navigation }) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const [user, setUser] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

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
    paddingTop: 40,
  },
});
