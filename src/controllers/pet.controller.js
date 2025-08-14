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


export const findAllPets = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const pets = await pet_service.findAllPets(page, limit);
        return responseHandler(res, 200, "Mascotas encontradas con éxito", pets);
    } catch (e) {
        next(createHttpError(e.code, e.message));
    }
}