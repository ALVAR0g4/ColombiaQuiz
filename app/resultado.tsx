import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ResultadoScreen() {
  const router = useRouter();
  const { puntaje, correctas } = useLocalSearchParams();

  const puntajeNum = Number(puntaje) || 0;
  const correctasNum = Number(correctas) || 0;
  const total = 10;

  const mensaje = () => {
    if (correctasNum >= 9) return "Excelente, eres un experto en Colombia";
    if (correctasNum >= 7) return "Muy bien, conoces bien tu pais";
    if (correctasNum >= 5) return "Nada mal, sigue practicando";
    return "Necesitas repasar un poco mas";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Resultado final</Text>
        <Text style={styles.mensaje}>{mensaje()}</Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.puntajeLabel}>Puntaje total</Text>
        <Text style={styles.puntajeValor}>{puntajeNum}</Text>

        <View style={styles.divisor} />

        <View style={styles.fila}>
          <Text style={styles.filaLabel}>Respuestas correctas</Text>
          <Text style={styles.filaValor}>
            {correctasNum} / {total}
          </Text>
        </View>

        <View style={styles.fila}>
          <Text style={styles.filaLabel}>Respuestas incorrectas</Text>
          <Text style={styles.filaValorMal}>
            {total - correctasNum} / {total}
          </Text>
        </View>

        <View style={styles.fila}>
          <Text style={styles.filaLabel}>Porcentaje de acierto</Text>
          <Text style={styles.filaValor}>
            {Math.round((correctasNum / total) * 100)}%
          </Text>
        </View>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.push("/game")}
        >
          <Text style={styles.btnPrimaryTexto}>Jugar de nuevo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => router.push("/")}
        >
          <Text style={styles.btnSecondaryTexto}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 24,
    paddingVertical: 60,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  mensaje: {
    fontSize: 15,
    color: "#888888",
    marginTop: 10,
    textAlign: "center",
  },
  tarjeta: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  puntajeLabel: {
    fontSize: 13,
    color: "#888888",
    textAlign: "center",
  },
  puntajeValor: {
    fontSize: 64,
    fontWeight: "800",
    color: "#FFD700",
    textAlign: "center",
    letterSpacing: -2,
  },
  divisor: {
    height: 1,
    backgroundColor: "#2A2A2A",
    marginVertical: 20,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  filaLabel: {
    fontSize: 14,
    color: "#888888",
  },
  filaValor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  filaValorMal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF4444",
  },
  botones: {
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnPrimaryTexto: {
    color: "#0D0D0D",
    fontSize: 16,
    fontWeight: "700",
  },
  btnSecondary: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  btnSecondaryTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
