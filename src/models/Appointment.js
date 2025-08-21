import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";
import { APPOINTMENT_STATUS_VALUES, APPOINTMENT_STATUS } from "../utils/constants/appointmentStatus.constant.js";

class Appointment extends Model {
  static association(models) {
    Appointment.belongsTo(models.Pet, {
      foreignKey: "petId"
    }),
      Appointment.belongsTo(models.Veterinarian, {
        foreignKey: "veterinarianId"
      })
  }
}

Appointment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date_time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString().split('T')[0]
    }
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: APPOINTMENT_STATUS.PENDING,
    validate: {
      isIn: [APPOINTMENT_STATUS_VALUES]
    }
  },
  notes: {
    type: DataTypes.STRING
  },
  estimated_duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1
    }
  }
}, {
  sequelize,
  modelName: "Appointment",
  tableName: "appointments",
  underscored: true,
  timestamps: true,
  paranoid: true
}
)

export default Appointment;
