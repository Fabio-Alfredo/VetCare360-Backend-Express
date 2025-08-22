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

export const findAllByPetsAndStatusAndDate = async (petIds, status, minDate, maxDate) => {


  const appointments = await db.Appointment.findAll({
    where: {
      pet_id: petIds,
      status,
      date_time: {
        [db.Sequelize.Op.between]: [minDate, maxDate],
      },
    },
  });
  return appointments;
};