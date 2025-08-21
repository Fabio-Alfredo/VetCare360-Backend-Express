import db from "../models/index.js";

export const startTransaction = async () => {
  const transaction = await db.sequelize.transaction();
  return transaction;
};

export const save = async (appointment, transaction) => {
  const newAppointment = await db.Appointment.create(appointment, {
    transaction,
  });
  return newAppointment;
};
