import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Categoria,
  obtenerAleatorias,
  obtenerPorCategoria
} from "./preguntas";

export default function GameScreen() {
  const router = useRouter();
  const { usuario_id, nombre, categoria } = useLocalSearchParams();

  const obtenerPreguntas = () => {
    if (!categoria || categoria === "todas") {
      return obtenerAleatorias(10);
    }
    const porCategoria = obtenerPorCategoria(categoria as Categoria);
    return porCategoria.length >= 5 ? porCategoria : obtenerAleatorias(10);
  };

  const [listado] = useState(obtenerPreguntas());
  const [indice, setIndice] = useState(0);
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [correctas, setCorrectas] = useState(0);
  const [tiempo, setTiempo] = useState(15);

  const pregunta = listado[indice];

  useEffect(() => {
    setTiempo(15);
    setSeleccionada(null);
    setRespondida(false);
  }, [indice]);

  useEffect(() => {
    if (respondida) return;

    const intervalo = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          clearInterval(intervalo);
          setRespondida(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [respondida, indice]);

  const responder = (index: number) => {
    if (respondida) return;
    setSeleccionada(index);
    setRespondida(true);
    if (index === pregunta.correcta) {
      setPuntaje((p) => p + 100);
      setCorrectas((c) => c + 1);
    }
  };

  const guardarPuntaje = async (
    puntajeFinal: number,
    correctasFinal: number,
  ) => {
    if (!usuario_id) return;
    try {
      await fetch("http://localhost:3000/puntajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: Number(usuario_id),
          puntaje: puntajeFinal,
          correctas: correctasFinal,
        }),
      });
    } catch (e) {
      console.log("Error guardando puntaje:", e);
    }
  };

  const siguiente = async () => {
    if (indice + 1 >= listado.length) {
      await guardarPuntaje(puntaje, correctas);
      router.push({
        pathname: "/resultado",
        params: { puntaje, correctas, nombre, total: listado.length },
      });
    } else {
      setIndice((i) => i + 1);
    }
  };

  const colorOpcion = (index: number) => {
    if (!respondida) return styles.opcion;
    if (index === pregunta.correcta) return styles.opcionCorrecta;
    if (index === seleccionada) return styles.opcionIncorrecta;
    return styles.opcion;
  };

  const colorTiempo = () => {
    if (tiempo > 10) return "#FFD700";
    if (tiempo > 5) return "#FFA500";
    return "#FF4444";
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.puntaje}>Puntaje: {puntaje}</Text>
        <Text style={[styles.tiempo, { color: colorTiempo() }]}>{tiempo}s</Text>
        <Text style={styles.preguntaNum}>
          {indice + 1} / {listado.length}
        </Text>
      </View>

      {pregunta.categoria && (
        <Text style={styles.categoriaLabel}>
          {pregunta.categoria.toUpperCase()}
        </Text>
      )}

      <View style={styles.tarjeta}>
        <Text style={styles.preguntaTexto}>{pregunta.texto}</Text>
      </View>

      <View style={styles.opciones}>
        {pregunta.opciones.map((opcion, index) => (
          <TouchableOpacity
            key={index}
            style={colorOpcion(index)}
            onPress={() => responder(index)}
          >
            <Text style={styles.opcionLetra}>
              {["A", "B", "C", "D"][index]}
            </Text>
            <Text style={styles.opcionTexto}>{opcion}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {respondida && (
        <TouchableOpacity style={styles.btnSiguiente} onPress={siguiente}>
          <Text style={styles.btnSiguienteTexto}>
            {indice + 1 >= listado.length
              ? "Ver resultado"
              : "Siguiente pregunta"}
          </Text>
        </TouchableOpacity>
      )}
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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  puntaje: {
    color: "#888888",
    fontSize: 14,
  },
  tiempo: {
    fontSize: 18,
    fontWeight: "700",
  },
  preguntaNum: {
    color: "#888888",
    fontSize: 14,
  },
  categoriaLabel: {
    color: "#FFD700",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  tarjeta: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  preguntaTexto: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 30,
    textAlign: "center",
  },
  opciones: {
    gap: 12,
  },
  opcion: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  opcionCorrecta: {
    backgroundColor: "#0F3D1F",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1D9E75",
  },
  opcionIncorrecta: {
    backgroundColor: "#3D0F0F",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9E1D1D",
  },
  opcionLetra: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 14,
    width: 20,
  },
  opcionTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  btnSiguiente: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  btnSiguienteTexto: {
    color: "#0D0D0D",
    fontSize: 16,
    fontWeight: "700",
  },
});
