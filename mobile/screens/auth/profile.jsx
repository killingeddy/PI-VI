import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastManager, { Toast } from "toastify-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Loader from "../../tools/loader";
import { api } from "../../tools/api";
import { Image } from "expo-image";
import React from "react";

export default function Profile({ navigation }) {
  const [user, setUser] = React.useState(null);

  const [userProfile, setUserProfile] = React.useState({});

  const [loading, setLoading] = React.useState(true);

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
      Toast.error("Erro ao carregar informações do usuário");
    }
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "Não informado";
    const formattedValue = parseFloat(value).toFixed(2);
    return `R$ ${formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      navigation.navigate("Login");
      Toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Error during logout:", error);
      Toast.error("Erro ao realizar logout");
    }
  };

  const getUserProfile = async () => {
    setLoading(true);
    await api
      .get(`/profiles/${user.id}`)
      .then((response) => {
        setUserProfile(response.data.data);
      })
      .catch((error) => {
        Toast.error(
          error?.response?.data?.message || "Erro ao carregar perfil"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const translateRiskTolerance = (riskTolerance) => {
    switch (riskTolerance) {
      case 1:
        return "Muito Baixa";
      case 2:
        return "Baixa";
      case 3:
        return "Moderada";
      case 4:
        return "Alta";
      case 5:
        return "Muito Alta";
      default:
        return "Não informado";
    }
  };

  const translateInvestmentHorizon = (horizon) => {
    switch (horizon) {
      case 1:
        return "Menos que 1 ano";
      case 2:
        return "1 a 3 anos";
      case 3:
        return "3 a 5 anos";
      case 4:
        return "5 a 10 anos";
      case 5:
        return "Mais de 10 anos";
      default:
        return "Não informado";
    }
  };

  const translateInvestmentExperience = (experience) => {
    switch (experience) {
      case 1:
        return "Nenhuma";
      case 2:
        return "Básica";
      case 3:
        return "Intermediária";
      case 4:
        return "Avançada";
      case 5:
        return "Especialista";
      default:
        return "Não informado";
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
      if (user) {
        getUserProfile();
      }
    }, [user?.id, navigation])
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#235c5b",
          textAlign: "left",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        {user?.name}
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#235c5b",
                marginLeft: 20,
              }}
            >
              Email:
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#000",
                marginLeft: 10,
              }}
            >
              {user?.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#235c5b",
                marginLeft: 20,
              }}
            >
              Renda Mensal:
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#000",
                marginLeft: 10,
              }}
            >
              {userProfile?.monthly_income
                ? `${formatCurrency(userProfile.monthly_income)}`
                : "Não informado"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#235c5b",
                marginLeft: 20,
              }}
            >
              Classificação do Perfil:
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#000",
                marginLeft: 10,
              }}
            >
              {userProfile?.profile_type
                ? userProfile.profile_type
                : "Não informado"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#235c5b",
                marginLeft: 20,
              }}
            >
              Tolerância a Risco:
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#000",
                marginLeft: 10,
              }}
            >
              {userProfile?.risk_tolerance
                ? translateRiskTolerance(userProfile.risk_tolerance)
                : "Não informado"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#235c5b",
                marginLeft: 20,
              }}
            >
              Horizontes de Investimento:
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#000",
                marginLeft: 10,
              }}
            >
              {userProfile?.investment_horizon
                ? translateInvestmentHorizon(userProfile.investment_horizon)
                : "Não informado"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#235c5b",
                marginLeft: 20,
              }}
            >
              Experiência com Investimentos:
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#000",
                marginLeft: 10,
              }}
            >
              {userProfile?.investment_experience
                ? translateInvestmentExperience(
                    userProfile.investment_experience
                  )
                : "Não informado"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              width: "90%",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("UserWallet")}
              style={{
                borderRadius: 10,
                width: "45%",
                borderWidth: 1,
                borderColor: "#235c5b40",
                position: "relative",
                marginTop: 20,
                display: "flex",
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Image
                source={require("../../assets/images/wallet.png")}
                contentFit="contain"
                style={{ width: 165, height: 165 }}
              />
              <Text
                style={{
                  color: "#235c5b",
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                Acessar Carteira
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserShares")}
              style={{
                borderRadius: 10,
                width: "45%",
                borderWidth: 1,
                borderColor: "#235c5b40",
                position: "relative",
                marginTop: 20,
                display: "flex",
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Image
                source={require("../../assets/images/recommendations.png")}
                contentFit="contain"
                style={{ width: 165, height: 165 }}
              />
              <Text
                style={{
                  color: "#235c5b",
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                Ver Recomendações
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            onPress={() => handleLogout()}
            style={{
              alignSelf: "center",
              borderRadius: 50,
              width: "90%",
              borderColor: "#235c5b",
              borderWidth: 1,
              position: "absolute",
              bottom: 20,
            }}
          >
            <Text style={{ color: "#235c5b" }}>Sair</Text>
          </Button>
        </>
      )}
      <ToastManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingTop: 40,
  },
});
