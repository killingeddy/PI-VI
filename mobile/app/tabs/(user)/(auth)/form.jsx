import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { api } from "../../../../tools/api";
import { useRouter } from "expo-router";
import React from "react";

export default function Form() {
  const router = useRouter();

  const [user, setUser] = React.useState(null);

  const [userProfile, setUserProfile] = React.useState({});

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
      router.navigate("/tabs");
      Toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Error during logout:", error);
      Toast.error("Erro ao realizar logout");
    }
  };

  const getUserProfile = async () => {
    await api
      .get(`/profiles/${user.id}`)
      .then((response) => {
        setUserProfile(response.data.data);
      })
      .catch((error) => {
        Toast.error(
          error?.response?.data?.message || "Erro ao carregar perfil"
        );
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
      if (user) {
        getUserProfile();
      }
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
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
        Seu Perfil
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#235c5b",
            marginLeft: 20,
          }}
        >
          Nome:
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#000",
            marginLeft: 10,
          }}
        >
          {user?.name}
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
            fontSize: 18,
            fontWeight: "bold",
            color: "#235c5b",
            marginLeft: 20,
          }}
        >
          Email:
        </Text>
        <Text
          style={{
            fontSize: 18,
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
            fontSize: 18,
            fontWeight: "bold",
            color: "#235c5b",
            marginLeft: 20,
          }}
        >
          Renda Mensal:
        </Text>
        <Text
          style={{
            fontSize: 18,
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
            fontSize: 18,
            fontWeight: "bold",
            color: "#235c5b",
            marginLeft: 20,
          }}
        >
          Classificação do Perfil:
        </Text>
        <Text
          style={{
            fontSize: 18,
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
            fontSize: 18,
            fontWeight: "bold",
            color: "#235c5b",
            marginLeft: 20,
          }}
        >
          Tolerância a Risco:
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#000",
            marginLeft: 10,
          }}
        >
          {userProfile?.risk_tolerance
            ? userProfile.risk_tolerance
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
            fontSize: 18,
            fontWeight: "bold",
            color: "#235c5b",
            marginLeft: 20,
          }}
        >
          Horizontes de Investimento:
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#000",
            marginLeft: 10,
          }}
        >
          {userProfile?.investment_horizon
            ? userProfile.investment_horizon
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
            fontSize: 18,
            fontWeight: "bold",
            color: "#235c5b",
            marginLeft: 20,
          }}
        >
          Experiência com Investimentos:
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#000",
            marginLeft: 10,
          }}
        >
          {userProfile?.investment_experience
            ? userProfile.investment_experience
            : "Não informado"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Button
          onPress={() => handleLogout()}
          style={{
            alignSelf: "center",
            borderRadius: 50,
            width: "100%",
            borderColor: "#235c5b",
            borderWidth: 1,
          }}
        >
          <Text style={{ color: "#235c5b" }}>Sair</Text>
        </Button>
      </View>
      <ToastManager />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
});
