import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

class Veterinarian extends Model { }

Veterinarian.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  specialty: {
    type: DataTypes.STRING,
    defaultValue: "General",
    allowNull: false
  },
  tuition_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  available_schedule: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)\s([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    }
  }
},
  {
    sequelize,
    modelName: "Veterinarian",
    tableName: "veterinarians",
    timestamps: true,
    paranoid: true
  }
)

export default Veterinarian;
