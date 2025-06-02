import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, StyleSheet, Text } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { Button, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { api } from "../../../../tools/api";
import { useRouter } from "expo-router";
import React from "react";

export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [riskTolerance, setRiskTolerance] = React.useState();
  const [monthlyIncome, setMonthlyIncome] = React.useState();
  const [investmentHorizon, setInvestmentHorizon] = React.useState();
  const [investmentExperience, setInvestmentExperience] = React.useState();

  const handleRegister = async () => {
    await api
      .post("/auth/register", {
        fullName,
        email,
        password,
      })
      .then(async (response) => {
        await AsyncStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.data.user)
        );
        Toast.success("Cadastro realizado com sucesso!");
        createProfile(response.data.data.user.id);
      })
      .catch((error) => {
        Toast.error(error?.response?.data?.message || "Erro ao cadastrar");
      });
  };

  const createProfile = async (id) => {
    await api
      .post(`/profiles/${id}`, {
        risk_tolerance: riskTolerance,
        monthly_income: monthlyIncome,
        investment_horizon: investmentHorizon,
        investment_experience: investmentExperience,
      })
      .then((response) => {
        Toast.success("Perfil criado com sucesso!");
        console.log("Profile created:", response.data);
        router.navigate("/tabs/(user)/(auth)/form");
      })
      .catch((error) => {
        Toast.error(error?.response?.data?.message || "Erro ao criar perfil");
      });
  };


  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#235c5b",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Cadastre-se
      </Text>
      <TextInput
        label="Nome"
        mode="outlined"
        style={{
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
        }}
        theme={{
          colors: {
            primary: "#000",
            underlineColor: "transparent",
            background: "#fff",
          },
          roundness: 50,
        }}
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        label="Email"
        mode="outlined"
        style={{
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
        }}
        theme={{
          colors: {
            primary: "#000",
            underlineColor: "transparent",
            background: "#fff",
          },
          roundness: 50,
        }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Renda mensal"
        mode="outlined"
        style={{
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
        }}
        theme={{
          colors: {
            primary: "#000",
            underlineColor: "transparent",
            background: "#fff",
          },
          roundness: 50,
        }}
        keyboardType="numeric"
        value={monthlyIncome}
        onChangeText={(text) => setMonthlyIncome(text)}
      />
      <Picker
        selectedValue={riskTolerance}
        onValueChange={(itemValue) => setRiskTolerance(itemValue)}
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: 20,
          borderRadius: 50,
          backgroundColor: "#fff",
          height: 50,
          borderColor: "#000",
          borderWidth: 1,
          color: "#000",
          paddingHorizontal: 10,
        }}
      >
        <Picker.Item label="Tolerância ao risco" value="" />
        <Picker.Item label="Baixa" value={1} />
        <Picker.Item label="Média" value={2} />
        <Picker.Item label="Alta" value={3} />
      </Picker>
      <Picker
        selectedValue={investmentHorizon}
        onValueChange={(itemValue) => setInvestmentHorizon(itemValue)}
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: 20,
          borderRadius: 50,
          backgroundColor: "#fff",
          height: 50,
          borderColor: "#000",
          borderWidth: 1,
          color: "#000",
          paddingHorizontal: 10,
        }}
      >
        <Picker.Item label="Horizonte de investimento" value="" />
        <Picker.Item label="Curto prazo (até 1 ano)" value={1} />
        <Picker.Item label="Médio prazo (1 a 5 anos)" value={2} />
        <Picker.Item label="Longo prazo (mais de 5 anos)" value={3} />
      </Picker>
      <Picker
        selectedValue={investmentExperience}
        onValueChange={(itemValue) => setInvestmentExperience(itemValue)}
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: 20,
          borderRadius: 50,
          backgroundColor: "#fff",
          height: 50,
          borderColor: "#000",
          borderWidth: 1,
          color: "#000",
          paddingHorizontal: 10,
        }}
      >
        <Picker.Item label="Experiência em investimentos" value="" />
        <Picker.Item label="Nenhuma" value={1} />
        <Picker.Item label="Básica" value={2} />
        <Picker.Item label="Intermediária" value={3} />
        <Picker.Item label="Avançada" value={4} />
      </Picker>
      <TextInput
        label="Senha"
        mode="outlined"
        style={{
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
        }}
        theme={{
          colors: {
            primary: "#000",
            underlineColor: "transparent",
            background: "#fff",
          },
          roundness: 50,
        }}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        onPress={handleRegister}
        style={{
          marginTop: 20,
          alignSelf: "center",
          borderRadius: 50,
          width: "90%",
          backgroundColor: "#235c5b",
        }}
      >
        <Text style={{ color: "#fff" }}>Criar conta</Text>
      </Button>
      <Button
        onPress={() => {
          router.back();
        }}
        style={{
          marginTop: 20,
          alignSelf: "center",
          borderRadius: 50,
          width: "90%",
        }}
      >
        <Text style={{ color: "#235c5b" }}>Já tem uma conta? </Text>
        <Text style={{ color: "#235c5b", fontWeight: "bold" }}>Entre</Text>
      </Button>
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
