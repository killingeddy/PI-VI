import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { Button, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Loader from "../../tools/loader";
import { api } from "../../tools/api";
import React from "react";

export default function Register({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [riskTolerance, setRiskTolerance] = React.useState();
  const [monthlyIncome, setMonthlyIncome] = React.useState();
  const [investmentHorizon, setInvestmentHorizon] = React.useState();
  const [investmentExperience, setInvestmentExperience] = React.useState();

  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !riskTolerance ||
      !monthlyIncome ||
      !investmentHorizon ||
      !investmentExperience
    ) {
      Toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

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
        setLoading(false);
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
        navigation.navigate("Profile");
      })
      .catch((error) => {
        Toast.error(error?.response?.data?.message || "Erro ao criar perfil");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
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
      {loading ? (
        <Loader />
      ) : (
        <>
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
            <Picker.Item label="Muito baixa" value={1} />
            <Picker.Item label="Baixa" value={2} />
            <Picker.Item label="Média" value={3} />
            <Picker.Item label="Alta" value={4} />
            <Picker.Item label="Muito alta" value={5} />
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
            <Picker.Item label="Menos de 1 ano" value={1} />
            <Picker.Item label="1 a 3 anos" value={2} />
            <Picker.Item label="3 a 5 anos" value={3} />
            <Picker.Item label="5 a 10 anos" value={4} />
            <Picker.Item label="Mais de 10 anos" value={5} />
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
            <Picker.Item label="Especialista" value={5} />
          </Picker>
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
              navigation.navigate("Login");
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
        </>
      )}
      <ToastManager />
    </KeyboardAvoidingView>
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
