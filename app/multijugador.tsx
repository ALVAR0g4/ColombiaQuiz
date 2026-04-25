import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { io, Socket } from "socket.io-client";
import { preguntas } from "./preguntas";

const SERVIDOR = "http://localhost:3000";

export default function MultijugadorScreen() {
  const router = useRouter();
  const { nombre } = useLocalSearchParams();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sala_id, setSalaId] = useState("");
  const [estado, setEstado] = useState<
    "lobby" | "esperando" | "jugando" | "finalizado"
  >("lobby");
  const [jugadores, setJugadores] = useState<any[]>([]);
  const [indice, setIndice] = useState(0);
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [tiempo, setTiempo] = useState(15);

  const pregunta = preguntas[indice];

  useEffect(() => {
    const s = io(SERVIDOR);
    setSocket(s);

    s.on("jugadores_actualizados", (data) => setJugadores(data));
    s.on("juego_iniciado", () => setEstado("jugando"));
    s.on("puntajes_actualizados", (data) => setJugadores(data));
    s.on("nueva_pregunta", ({ indice: i }) => {
      if (i >= preguntas.length) {
        setEstado("finalizado");
      } else {
        setIndice(i);
        setSeleccionada(null);
        setRespondida(false);
        setTiempo(15);
      }
    });

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (estado !== "jugando" || respondida) return;

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
  }, [estado, respondida, indice]);

  const unirse = () => {
    if (!sala_id.trim()) return;
    socket?.emit("unirse_sala", { nombre, sala_id });
    setEstado("esperando");
  };

  const responder = (index: number) => {
    if (respondida) return;
    setSeleccionada(index);
    setRespondida(true);
    const correcta = index === pregunta.correcta;
    socket?.emit("responder", {
      sala_id,
      correcta,
      puntaje_ganado: correcta ? 100 : 0,
    });
  };

  const siguiente = () => {
    socket?.emit("siguiente_pregunta", { sala_id });
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

  if (estado === "lobby") {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Multijugador</Text>
        <Text style={styles.subtitulo}>
          Ingresa el codigo de sala para jugar con un amigo
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Codigo de sala (ej: SALA01)"
          placeholderTextColor="#555555"
          value={sala_id}
          onChangeText={setSalaId}
          autoCapitalize="characters"
        />
        <TouchableOpacity style={styles.btnPrimary} onPress={unirse}>
          <Text style={styles.btnPrimaryTexto}>Unirse a sala</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => router.push("/")}
        >
          <Text style={styles.btnSecondaryTexto}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (estado === "esperando") {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Sala: {sala_id}</Text>
        <Text style={styles.subtitulo}>Esperando jugadores...</Text>
        <View style={styles.jugadoresList}>
          {jugadores.map((j, i) => (
            <View key={i} style={styles.jugadorFila}>
              <Text style={styles.jugadorNombre}>{j.nombre}</Text>
              <Text style={styles.jugadorListo}>Listo</Text>
            </View>
          ))}
        </View>
        <Text style={styles.info}>
          El juego inicia automaticamente cuando se unan 2 jugadores
        </Text>
      </View>
    );
  }

  if (estado === "finalizado") {
    const ordenados = [...jugadores].sort((a, b) => b.puntaje - a.puntaje);
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Resultado final</Text>
        {ordenados.map((j, i) => (
          <View key={i} style={styles.jugadorFila}>
            <Text
              style={[
                styles.posicion,
                { color: i === 0 ? "#FFD700" : "#888888" },
              ]}
            >
              {i + 1}
            </Text>
            <Text style={styles.jugadorNombre}>{j.nombre}</Text>
            <Text style={styles.jugadorPuntaje}>{j.puntaje}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.push("/")}
        >
          <Text style={styles.btnPrimaryTexto}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          {jugadores.map((j, i) => (
            <Text key={i} style={styles.jugadorPuntajeTop}>
              {j.nombre}: {j.puntaje}
            </Text>
          ))}
        </View>
        <Text style={[styles.tiempo, { color: colorTiempo() }]}>{tiempo}s</Text>
        <Text style={styles.preguntaNum}>
          {indice + 1} / {preguntas.length}
        </Text>
      </View>

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
            {indice + 1 >= preguntas.length
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
    justifyContent: "center",
    gap: 16,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: -1,
  },
  subtitulo: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    textAlign: "center",
    letterSpacing: 4,
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
  jugadoresList: {
    gap: 12,
  },
  jugadorFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  jugadorNombre: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    marginLeft: 12,
  },
  jugadorListo: {
    color: "#1D9E75",
    fontSize: 13,
    fontWeight: "600",
  },
  jugadorPuntaje: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "700",
  },
  posicion: {
    fontSize: 18,
    fontWeight: "800",
    width: 30,
  },
  info: {
    color: "#555555",
    fontSize: 12,
    textAlign: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  jugadorPuntajeTop: {
    color: "#888888",
    fontSize: 12,
  },
  tiempo: {
    fontSize: 18,
    fontWeight: "700",
  },
  preguntaNum: {
    color: "#888888",
    fontSize: 14,
  },
  tarjeta: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 28,
    marginBottom: 16,
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
    marginTop: 16,
  },
  btnSiguienteTexto: {
    color: "#0D0D0D",
    fontSize: 16,
    fontWeight: "700",
  },
});
