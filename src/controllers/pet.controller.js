import * as pet_service from '../services/pet.service.js';
import createHttpError from 'http-errors';
import responseHandler from '../handlers/res.handler.js';

export const registerPet = async (req, res, next) => {
    try {
        const user = req.user;
        const newPet = await pet_service.registerPet(req.body, user);
        return responseHandler(res, 201,"Mascota registrada con éxito", newPet);
    } catch (error) {
        next(createHttpError(error.code, error.message));
    }
};
