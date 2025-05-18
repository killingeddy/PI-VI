import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function SharesScreen() {
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
        Acompanhe o que investir:
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Preparamos algumas sugestões para você, basendo em seu perfil:
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>BTG Pactual</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Último:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              22,00
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Minimo:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              20,40
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Máximo:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              22,00
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Variação:
            </Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#4CAF50" }}
            >
              +7,84%
            </Text>
          </View>
        </View>
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
            Adquirir
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Neoenergia</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Último:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              22,90
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Minimo:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              21,62
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Máximo:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              23,65
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Variação:
            </Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#4CAF50" }}
            >
              +4,61%
            </Text>
          </View>
        </View>
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
            Adquirir
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Microsoft</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Último:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              97,86
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Minimo:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              90,80
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Máximo:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              97,86
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Variação:
            </Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#4CAF50" }}
            >
              +5,97%
            </Text>
          </View>
        </View>
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
            Adquirir
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Booking</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Último:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              171,06
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Minimo:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              153,50
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Máximo:
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
              171,06
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "black" }}>
              Variação:
            </Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#4CAF50" }}
            >
              +7,93%
            </Text>
          </View>
        </View>
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
            Adquirir
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
