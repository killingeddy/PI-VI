import { Link, useRouter } from 'expo-router';
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Login() {
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  // const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState(null);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        resizeMode="cover"
        style={{
          width: '100%',
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
      />
      <Link
        href="/tabs/home"
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
        <Text style={{ color: "#fff", fontWeight: 'bold' }}>Entrar</Text>
      </Link>
      <Button
        onPress={() => { router.navigate('/register') }}
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
