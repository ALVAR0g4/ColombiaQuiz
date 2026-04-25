import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Jugador = {
  nombre: string;
  mejor_puntaje: number;
  mejor_correctas: number;
};

export default function RankingScreen() {
  const router = useRouter();
  const [ranking, setRanking] = useState<Jugador[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/ranking")
      .then((res) => res.json())
      .then((data) => {
        setRanking(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const medalla = (index: number) => {
    if (index === 0) return "1";
    if (index === 1) return "2";
    if (index === 2) return "3";
    return `${index + 1}`;
  };

  const colorMedalla = (index: number) => {
    if (index === 0) return "#FFD700";
    if (index === 1) return "#C0C0C0";
    if (index === 2) return "#CD7F32";
    return "#555555";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Ranking nacional</Text>
        <Text style={styles.subtitulo}>Los mejores jugadores de Colombia</Text>
      </View>

      {cargando ? (
        <Text style={styles.cargando}>Cargando ranking...</Text>
      ) : ranking.length === 0 ? (
        <Text style={styles.cargando}>Nadie ha jugado aun. Se el primero.</Text>
      ) : (
        <FlatList
          data={ranking}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.fila}>
              <Text style={[styles.posicion, { color: colorMedalla(index) }]}>
                {medalla(index)}
              </Text>
              <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.correctas}>
                  {item.mejor_correctas} / 10 correctas
                </Text>
              </View>
              <Text style={styles.puntaje}>{item.mejor_puntaje}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
        />
      )}

      <TouchableOpacity
        style={styles.btnVolver}
        onPress={() => router.push("/")}
      >
        <Text style={styles.btnVolverTexto}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  subtitulo: {
    fontSize: 14,
    color: "#888888",
    marginTop: 8,
  },
  cargando: {
    color: "#888888",
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  posicion: {
    fontSize: 18,
    fontWeight: "800",
    width: 36,
  },
  info: {
    flex: 1,
  },
  nombre: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  correctas: {
    color: "#888888",
    fontSize: 12,
    marginTop: 2,
  },
  puntaje: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "700",
  },
  separador: {
    height: 1,
    backgroundColor: "#1A1A1A",
  },
  btnVolver: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    marginTop: 24,
  },
  btnVolverTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
