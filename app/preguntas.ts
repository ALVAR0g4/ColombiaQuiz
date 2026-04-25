export type Pregunta = {
  texto: string;
  opciones: string[];
  correcta: number;
  categoria: string;
};

export type Categoria =
  | "historia"
  | "geografia"
  | "cultura"
  | "deportes"
  | "musica";

export const preguntas: Pregunta[] = [
  // Historia
  {
    texto: "¿En que ano se independizo Colombia de Espana?",
    opciones: ["1810", "1819", "1821", "1830"],
    correcta: 1,
    categoria: "historia",
  },
  {
    texto: "¿Quien fue el primer presidente de Colombia?",
    opciones: [
      "Simon Bolivar",
      "Francisco de Paula Santander",
      "Antonio Narino",
      "Tomas Cipriano de Mosquera",
    ],
    correcta: 0,
    categoria: "historia",
  },
  {
    texto: "¿En que ano fue asesinado Jorge Eliecer Gaitan?",
    opciones: ["1945", "1946", "1948", "1950"],
    correcta: 2,
    categoria: "historia",
  },
  {
    texto:
      "¿Como se llamo el proceso de constitucion que dio origen a la carta magna de 1991?",
    opciones: [
      "Asamblea Nacional",
      "Asamblea Constituyente",
      "Congreso Constitucional",
      "Referendum Nacional",
    ],
    correcta: 1,
    categoria: "historia",
  },
  {
    texto:
      "¿Cual fue el primer nombre dado a Colombia como nacion independiente?",
    opciones: [
      "Gran Colombia",
      "Nueva Granada",
      "Colombia",
      "Republica de Cundinamarca",
    ],
    correcta: 1,
    categoria: "historia",
  },

  // Geografia
  {
    texto: "¿Cual es la capital de Colombia?",
    opciones: ["Medellin", "Cali", "Bogota", "Cartagena"],
    correcta: 2,
    categoria: "geografia",
  },
  {
    texto: "¿En que departamento esta ubicada Cartagena?",
    opciones: ["Atlantico", "Bolivar", "Cordoba", "Sucre"],
    correcta: 1,
    categoria: "geografia",
  },
  {
    texto: "¿Cual es el rio mas largo de Colombia?",
    opciones: ["Rio Cauca", "Rio Magdalena", "Rio Atrato", "Rio Meta"],
    correcta: 1,
    categoria: "geografia",
  },
  {
    texto: "¿Cuantos departamentos tiene Colombia?",
    opciones: ["28", "30", "32", "34"],
    correcta: 2,
    categoria: "geografia",
  },
  {
    texto: "¿Cual es el volcan activo mas alto de Colombia?",
    opciones: [
      "Volcan Galeras",
      "Nevado del Ruiz",
      "Volcan Cumbal",
      "Nevado del Huila",
    ],
    correcta: 1,
    categoria: "geografia",
  },

  // Cultura
  {
    texto: "¿Quien escribio Cien Anos de Soledad?",
    opciones: [
      "Jorge Isaacs",
      "Gabriel Garcia Marquez",
      "Tomas Gonzalez",
      "Hector Abad",
    ],
    correcta: 1,
    categoria: "cultura",
  },
  {
    texto: "¿Cual es el deporte nacional de Colombia?",
    opciones: ["Futbol", "Ciclismo", "Tejo", "Ajedrez"],
    correcta: 2,
    categoria: "cultura",
  },
  {
    texto: "¿Cual es la flor nacional de Colombia?",
    opciones: ["Rosa", "Orquidea", "Girasol", "Lirio"],
    correcta: 1,
    categoria: "cultura",
  },
  {
    texto: "¿Cual es la moneda oficial de Colombia?",
    opciones: ["Sol", "Bolivar", "Peso", "Quetzal"],
    correcta: 2,
    categoria: "cultura",
  },
  {
    texto: "¿En que ciudad se celebra la Feria de las Flores?",
    opciones: ["Bogota", "Cali", "Medellin", "Barranquilla"],
    correcta: 2,
    categoria: "cultura",
  },

  // Deportes
  {
    texto:
      "¿En que ano clasifico Colombia por primera vez a un Mundial de Futbol?",
    opciones: ["1958", "1962", "1970", "1990"],
    correcta: 1,
    categoria: "deportes",
  },
  {
    texto: "¿Quien es el maximo goleador historico de la seleccion Colombia?",
    opciones: [
      "Falcao Garcia",
      "Carlos Bacca",
      "Arnoldo Iguaran",
      "James Rodriguez",
    ],
    correcta: 0,
    categoria: "deportes",
  },
  {
    texto: "¿En que ano gano Colombia su primera medalla de oro olimpica?",
    opciones: ["1992", "1996", "2000", "2004"],
    correcta: 2,
    categoria: "deportes",
  },
  {
    texto: "¿Cual ciclista colombiano gano el Tour de Francia en 2019?",
    opciones: [
      "Nairo Quintana",
      "Rigoberto Uran",
      "Egan Bernal",
      "Miguel Angel Lopez",
    ],
    correcta: 2,
    categoria: "deportes",
  },
  {
    texto: "¿En que deporte se destaco Maria Isabel Urrutia?",
    opciones: ["Atletismo", "Natacion", "Halterofilia", "Ciclismo"],
    correcta: 2,
    categoria: "deportes",
  },

  // Musica
  {
    texto: "¿De que ciudad es originaria la cumbia colombiana?",
    opciones: ["Bogota", "Medellin", "Cartagena", "Costa Caribe"],
    correcta: 3,
    categoria: "musica",
  },
  {
    texto: "¿Cual artista colombiana es conocida como la Reina del Vallenato?",
    opciones: ["Shakira", "Fanny Lu", "Carlos Vives", "Adriana Lucia"],
    correcta: 3,
    categoria: "musica",
  },
  {
    texto: "¿De que departamento es originario el vallenato?",
    opciones: ["Bolivar", "Atlantico", "Cesar", "Magdalena"],
    correcta: 2,
    categoria: "musica",
  },
  {
    texto: "¿Cual instrumento es protagonista del vallenato?",
    opciones: ["Guitarra", "Acordeon", "Flauta", "Tambor"],
    correcta: 1,
    categoria: "musica",
  },
  {
    texto: "¿Shakira es originaria de cual ciudad colombiana?",
    opciones: ["Bogota", "Medellin", "Barranquilla", "Cartagena"],
    correcta: 2,
    categoria: "musica",
  },
];

export const obtenerPorCategoria = (categoria: Categoria): Pregunta[] => {
  return preguntas.filter((p) => p.categoria === categoria);
};

export const obtenerAleatorias = (cantidad: number): Pregunta[] => {
  const mezcladas = [...preguntas].sort(() => Math.random() - 0.5);
  return mezcladas.slice(0, cantidad);
};
