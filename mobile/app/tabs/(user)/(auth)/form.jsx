import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Form() {
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  // const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState(null);

  const router = useRouter();

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
        Seu formulário
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
        placeholder="Eddie Medrado"
      />
      <TextInput
        label="Profissão"
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
        placeholder="Desenvolvedor"
      />
      <TextInput
        label="Data de nascimento"
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
        placeholder="23/11/2004"
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
        placeholder="eddie@gmail.com"
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
        placeholder="********"
      />
      <Button
        onPress={() => {}}
        style={{
          marginTop: 20,
          alignSelf: "center",
          borderRadius: 50,
          width: "90%",
          backgroundColor: "#235c5b",
        }}
      >
        <Text style={{ color: "#fff" }}>Editar informações</Text>
      </Button>
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
