import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js"


class Pet extends Model { }

Pet.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: "Mascotica"
  },
  species: {
    type: DataTypes.STRING,
    validate: {
      isIn: [["Perro", "Gato", "Conejo"]]
    },
    allowNull: false
  },
  rasa: {
    type: DataTypes.STRING,
    defaultValue: "Desconocida",
    allowNull: false
  },
  sexo: {
    type: DataTypes.STRING,
    defaultValue: "Indefinido",
    validate: {
      isIn: [["Masculino", "Femenino", "Indefinido"]]
    },
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      isBefore: new Date().toISOString().split('T')[0]
    }
  },
},
  {
    sequelize,
    modelName: "Pet",
    tableName: "pets",
    timestamps: true,
    paranoid: true
  }
)


export default Pet;
