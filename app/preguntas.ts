export type Pregunta = {
  texto: string;
  opciones: string[];
  correcta: number;
};

export const preguntas: Pregunta[] = [
  {
    texto: "¿Cual es la capital de Colombia?",
    opciones: ["Medellin", "Cali", "Bogota", "Cartagena"],
    correcta: 2,
  },
  {
    texto: "¿En que departamento esta ubicada Cartagena?",
    opciones: ["Atlantico", "Bolivar", "Cordoba", "Sucre"],
    correcta: 1,
  },
  {
    texto: "¿Cual es la moneda oficial de Colombia?",
    opciones: ["Sol", "Bolivar", "Peso", "Quetzal"],
    correcta: 2,
  },
  {
    texto: "¿Quien escribio Cien Anos de Soledad?",
    opciones: [
      "Jorge Isaacs",
      "Gabriel Garcia Marquez",
      "Tomas Gonzalez",
      "Hector Abad",
    ],
    correcta: 1,
  },
  {
    texto: "¿Cual es el rio mas largo de Colombia?",
    opciones: ["Rio Cauca", "Rio Magdalena", "Rio Atrato", "Rio Meta"],
    correcta: 1,
  },
  {
    texto: "¿En que ciudad se celebra la Feria de las Flores?",
    opciones: ["Bogota", "Cali", "Medellin", "Barranquilla"],
    correcta: 2,
  },
  {
    texto: "¿Cual es el deporte nacional de Colombia?",
    opciones: ["Futbol", "Ciclismo", "Tejo", "Ajedrez"],
    correcta: 2,
  },
  {
    texto: "¿Cuantos departamentos tiene Colombia?",
    opciones: ["28", "30", "32", "34"],
    correcta: 2,
  },
  {
    texto: "¿Cual es la flor nacional de Colombia?",
    opciones: ["Rosa", "Orquidea", "Girasol", "Lirio"],
    correcta: 1,
  },
  {
    texto: "¿En que ano se independizo Colombia de Espana?",
    opciones: ["1810", "1819", "1821", "1830"],
    correcta: 1,
  },
];
