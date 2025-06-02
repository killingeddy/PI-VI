import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StyleSheet, Text, View } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { Button, TextInput } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { api } from "../../../../tools/api";
import React from "react";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  const handleLogin = async () => {
    await api
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        Toast.success("Login realizado com sucesso!");
        AsyncStorage.setItem("userInfo", JSON.stringify(response.data.data.user));
        console.log("User info saved:", response.data.data.user);
        
        router.navigate("/tabs/(user)/(auth)/form");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        Toast.error(error?.response?.data?.message || "Erro ao fazer login");
      });
  };

  const checkUserLoggedIn = async () => {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (userInfo) {
      router.navigate("/tabs/(user)/(auth)/form");
    }
  };

  React.useEffect(() => {
    checkUserLoggedIn();
  }, []);
  
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 400,
          marginTop: -10,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#235c5b",
          textAlign: "center",
          marginTop: 0,
        }}
      >
        Bem-vindo(a) ao Finara!
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "#235c5b",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Faça login para continuar
      </Text>
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
      {/* <Link
        href="/tabs/(user)/(auth)/form"
        style={{
          marginTop: 20,
          alignSelf: "center",
          borderRadius: 50,
          width: "90%",
          backgroundColor: "#235c5b",
          padding: 15,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
      </Link> */}
      <Button
        onPress={handleLogin}
        style={{
          marginTop: 20,
          alignSelf: "center",
          borderRadius: 50,
          width: "90%",
          backgroundColor: "#235c5b",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Entrar</Text>
      </Button>
      <Button
        onPress={() => {
          router.navigate("/tabs/(user)/(auth)/register");
        }}
        style={{
          marginTop: 20,
          alignSelf: "center",
          borderRadius: 50,
          width: "90%",
        }}
      >
        <Text style={{ color: "#235c5b" }}>Ainda não tem conta? </Text>
        <Text style={{ color: "#235c5b", fontWeight: "bold" }}>
          Cadastre-se
        </Text>
      </Button>
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
  },
});
