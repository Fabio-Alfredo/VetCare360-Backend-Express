import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js"
import { ESPECIES , ESPECIES_VALUES} from "../utils/constants/species.constant.js";
import { SEX, SEX_VALUES } from "../utils/constants/sex.constant.js";

class Pet extends Model {
  static association(models) {
    Pet.belongsTo(models.User,
      {
        foreignKey: "userId"
      }),
      Pet.hasMany(models.Appointment, {
        foreignKey: "petId"
      }),
      Pet.hasMany(models.Vaccine, {
        foreignKey: "petId"
      }),
      Pet.hasMany(models.MedicalHistory, {
        foreignKey: "petId"
      })
  }
}

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
      isIn: [ESPECIES_VALUES]
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
    defaultValue: SEX.UNKNOWN,
    validate: {
      isIn: [SEX_VALUES]
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
    underscored: true,
    paranoid: true
  }
)


export default Pet;
