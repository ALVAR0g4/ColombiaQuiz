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
  | "musica"
  | "curiosidades";

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
    texto: "¿Cuando se escribio la ultima Constitucion de Colombia?",
    opciones: ["1886", "1948", "1991", "2000"],
    correcta: 2,
    categoria: "historia",
  },
  {
    texto:
      "¿Quien fue el presidente electo que goberno mas tiempo en Colombia?",
    opciones: [
      "Simon Bolivar",
      "Rafael Nunez",
      "Alvaro Uribe",
      "Marco Fidel Suarez",
    ],
    correcta: 1,
    categoria: "historia",
  },
  {
    texto:
      "¿En que ano las guerrillas declararon la guerra al gobierno colombiano?",
    opciones: ["1948", "1953", "1960", "1970"],
    correcta: 2,
    categoria: "historia",
  },
  {
    texto: "¿En que ano Gonzalo Jimenez de Quesada fundo lo que hoy es Bogota?",
    opciones: ["1499", "1525", "1539", "1550"],
    correcta: 2,
    categoria: "historia",
  },
  {
    texto: "¿Cuantos golpes de estado se han dado en Colombia?",
    opciones: ["5", "8", "10", "15"],
    correcta: 2,
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
    texto:
      "¿Como se llama la cordillera costera mas alta del mundo ubicada en Colombia?",
    opciones: [
      "Cordillera de los Andes",
      "Sierra Nevada de Santa Marta",
      "Serranía del Darién",
      "Cordillera Oriental",
    ],
    correcta: 1,
    categoria: "geografia",
  },
  {
    texto: "¿Cual es la cumbre mas alta de Colombia?",
    opciones: [
      "Nevado del Ruiz",
      "Pico Bolivar",
      "Pico Cristobal Colon",
      "Nevado del Huila",
    ],
    correcta: 2,
    categoria: "geografia",
  },
  {
    texto: "¿Cual es el lago mas grande de Colombia?",
    opciones: [
      "Lago de Tota",
      "Lago de Calima",
      "Ciénaga Grande",
      "Laguna de la Cocha",
    ],
    correcta: 0,
    categoria: "geografia",
  },
  {
    texto: "¿Que porcentaje de la selva amazonica se encuentra en Colombia?",
    opciones: ["5%", "10%", "15%", "20%"],
    correcta: 1,
    categoria: "geografia",
  },
  {
    texto: "¿Cuantos parques nacionales existen en Colombia?",
    opciones: ["42", "51", "59", "67"],
    correcta: 2,
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
    opciones: ["Futbol", "Ciclismo", "Tejo", "Boxeo"],
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
    texto:
      "¿Cual es la prenda de vestir mas representativa de Colombia ademas del sombrero?",
    opciones: ["Poncho o ruana", "Camisa de manta", "Liquiliqui", "Pollera"],
    correcta: 0,
    categoria: "cultura",
  },
  {
    texto: "¿Cuantos ritmos tradicionales tiene Colombia aproximadamente?",
    opciones: ["200", "500", "800", "1025"],
    correcta: 3,
    categoria: "cultura",
  },
  {
    texto:
      "¿Cual es el genero literario colombiano mas reconocido en el mundo?",
    opciones: [
      "Naturalismo",
      "Romanticismo",
      "Realismo magico",
      "Costumbrismo",
    ],
    correcta: 2,
    categoria: "cultura",
  },
  {
    texto: "¿En que ano fue la primera visita de un papa a Colombia?",
    opciones: ["1955", "1960", "1968", "1975"],
    correcta: 2,
    categoria: "cultura",
  },
  {
    texto: "¿Cuantos dias festivos tiene Colombia al ano?",
    opciones: ["12", "15", "18", "21"],
    correcta: 2,
    categoria: "cultura",
  },

  // Deportes
  {
    texto:
      "¿Cual es el deporte que mas campeonatos mundiales le ha dado a Colombia?",
    opciones: ["Futbol", "Ciclismo", "Boxeo", "Halterofilia"],
    correcta: 2,
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
    texto: "¿Cuantas medallas olimpicas tiene Colombia?",
    opciones: ["20", "28", "34", "40"],
    correcta: 2,
    categoria: "deportes",
  },
  {
    texto: "¿Cuantos campeones olimpicos tiene Colombia?",
    opciones: ["3", "5", "7", "9"],
    correcta: 1,
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
    texto:
      "¿En que ano un colombiano gana por primera vez la camisa arcoiris en ciclismo?",
    opciones: ["1998", "2000", "2002", "2005"],
    correcta: 2,
    categoria: "deportes",
  },
  {
    texto: "¿Cual es la capital del surf en Colombia?",
    opciones: ["Santa Marta", "Cartagena", "San Bernardo del Viento", "Nuqui"],
    correcta: 2,
    categoria: "deportes",
  },
  {
    texto: "¿Cuantos campeones mundiales de boxeo ha tenido Colombia?",
    opciones: ["20", "30", "44", "50"],
    correcta: 2,
    categoria: "deportes",
  },

  // Musica
  {
    texto: "¿De que region es originaria la cumbia colombiana?",
    opciones: ["Zona Andina", "Llanos Orientales", "Costa Caribe", "Pacifico"],
    correcta: 2,
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
  {
    texto: "¿En que ciudad se celebra el Festival de la Leyenda Vallenata?",
    opciones: ["Barranquilla", "Santa Marta", "Valledupar", "Monteria"],
    correcta: 2,
    categoria: "musica",
  },

  // Curiosidades
  {
    texto: "¿Hace cuantos anos vivio el primer humano encontrado en Colombia?",
    opciones: ["5.000", "10.000", "20.000", "50.000"],
    correcta: 2,
    categoria: "curiosidades",
  },
  {
    texto:
      "¿Cual ciudad de Colombia tiene mas rutas para ciclistas en Latinoamerica con 300km?",
    opciones: ["Medellin", "Cali", "Bogota", "Bucaramanga"],
    correcta: 2,
    categoria: "curiosidades",
  },
  {
    texto: "¿En que siglo llego el cafe a Colombia?",
    opciones: ["Siglo 16", "Siglo 17", "Siglo 18", "Siglo 19"],
    correcta: 2,
    categoria: "curiosidades",
  },
  {
    texto:
      "¿En honor a que leyenda fue bautizado el Aeropuerto Internacional El Dorado?",
    opciones: ["La Llorona", "El Dorado", "La Madremonte", "El Mohán"],
    correcta: 1,
    categoria: "curiosidades",
  },
  {
    texto: "¿Que puesto ocupa Colombia a nivel mundial en biodiversidad?",
    opciones: ["Primero", "Segundo", "Tercero", "Quinto"],
    correcta: 1,
    categoria: "curiosidades",
  },
  {
    texto: "¿Cuantos premios Nobel han sido otorgados a colombianos?",
    opciones: ["Uno", "Dos", "Tres", "Cuatro"],
    correcta: 1,
    categoria: "curiosidades",
  },
  {
    texto:
      "¿Por que las emisoras de radio deben tocar el himno a las 6am y 6pm en Colombia?",
    opciones: [
      "Es una tradicion cultural",
      "Es una ley de 1995 para incentivar el patriotismo",
      "Lo decidio la iglesia catolica",
      "Es un decreto de la alcaldia de Bogota",
    ],
    correcta: 1,
    categoria: "curiosidades",
  },
];

export const obtenerPorCategoria = (categoria: Categoria): Pregunta[] => {
  return preguntas.filter((p) => p.categoria === categoria);
};

export const obtenerAleatorias = (cantidad: number): Pregunta[] => {
  const mezcladas = [...preguntas].sort(() => Math.random() - 0.5);
  return mezcladas.slice(0, cantidad);
};
