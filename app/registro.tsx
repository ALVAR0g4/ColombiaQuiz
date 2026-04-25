import { useRouter } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function RegistroScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const registrar = async () => {
    if (!nombre || !email) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setCargando(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Error al registrar");
        setCargando(false);
        return;
      }
      router.push({
        pathname: "/game",
        params: { usuario_id: data.id, nombre: data.nombre },
      });
    } catch (e) {
      setError("No se pudo conectar con el servidor");
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Crear cuenta</Text>
        <Text style={styles.subtitulo}>
          Ingresa tus datos para guardar tu puntaje
        </Text>
      </View>

      <View style={styles.formulario}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu nombre completo"
          placeholderTextColor="#555555"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="tucorreo@gmail.com"
          placeholderTextColor="#555555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={registrar}
          disabled={cargando}
        >
          <Text style={styles.btnPrimaryTexto}>
            {cargando ? "Registrando..." : "Jugar ahora"}
          </Text>
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
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
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
    textAlign: "center",
  },
  formulario: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    color: "#888888",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  error: {
    color: "#FF4444",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },
  btnPrimary: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  btnPrimaryTexto: {
    color: "#0D0D0D",
    fontSize: 16,
    fontWeight: "700",
  },
});
