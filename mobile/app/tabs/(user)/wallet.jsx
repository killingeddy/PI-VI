import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function WalletScreen() {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#235c5b",
        }}
      >
        Olá, XXXX!
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Acompanhe seus investimentos:
      </Text>
      <View
        style={{
          width: "100%",
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
          padding: 10,
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Nubank</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#4CAF50" }}>
            {formatter.format(1278)}
          </Text>
          <MaterialCommunityIcons name="chevron-up" size={24} color="#4CAF50" />
        </View>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
          Ações adquiridas: 10 em: 01/01/2023
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Button
            mode="contained"
            style={{
              width: "48%",
              height: 40,
              backgroundColor: "tranparent",
              borderWidth: 1,
              borderColor: "#296157",
            }}
            onPress={() => console.log("Pressed")}
          >
            <Text style={{ color: "#296157", fontSize: 14 }}>Ver Detalhes</Text>
          </Button>
          <Button
            mode="contained"
            style={{ backgroundColor: "#024d40", width: "48%", height: 40 }}
            onPress={() => console.log("Pressed")}
          >
            Histórico
          </Button>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
          padding: 10,
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tesla</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ff0000" }}>
            {formatter.format(-2798)}
          </Text>
          <MaterialCommunityIcons name="chevron-up" size={24} color="#ff0000" />
        </View>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
          Ações adquiridas: 18 em: 12/05/2024
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Button
            mode="contained"
            style={{
              width: "48%",
              height: 40,
              backgroundColor: "tranparent",
              borderWidth: 1,
              borderColor: "#296157",
            }}
            onPress={() => console.log("Pressed")}
          >
            <Text style={{ color: "#296157", fontSize: 14 }}>Ver Detalhes</Text>
          </Button>
          <Button
            mode="contained"
            style={{ backgroundColor: "#024d40", width: "48%", height: 40 }}
            onPress={() => console.log("Pressed")}
          >
            Histórico
          </Button>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
          padding: 10,
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Google</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#4CAF50" }}>
            {formatter.format(526)}
          </Text>
          <MaterialCommunityIcons name="chevron-up" size={24} color="#4CAF50" />
        </View>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
          Ações adquiridas: 2 em: 05/10/2024
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Button
            mode="contained"
            style={{
              width: "48%",
              height: 40,
              backgroundColor: "tranparent",
              borderWidth: 1,
              borderColor: "#296157",
            }}
            onPress={() => console.log("Pressed")}
          >
            <Text style={{ color: "#296157", fontSize: 14 }}>Ver Detalhes</Text>
          </Button>
          <Button
            mode="contained"
            style={{ backgroundColor: "#024d40", width: "48%", height: 40 }}
            onPress={() => console.log("Pressed")}
          >
            Histórico
          </Button>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
          padding: 10,
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Nvidea</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#cfcc2d" }}>
            {formatter.format(0)}
          </Text>
          <MaterialCommunityIcons name="" size={24} color="#cfcc2d" />
        </View>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
          Ações adquiridas: 1 em: 01/05/2025
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Button
            mode="contained"
            style={{
              width: "48%",
              height: 40,
              backgroundColor: "tranparent",
              borderWidth: 1,
              borderColor: "#296157",
            }}
            onPress={() => console.log("Pressed")}
          >
            <Text style={{ color: "#296157", fontSize: 14 }}>Ver Detalhes</Text>
          </Button>
          <Button
            mode="contained"
            style={{ backgroundColor: "#024d40", width: "48%", height: 40 }}
            onPress={() => console.log("Pressed")}
          >
            Histórico
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
