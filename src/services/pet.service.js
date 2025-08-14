import * as pet_repository from '../repositories/pet.repository.js';
import { findUserById } from './user.service.js';
import { ValidationError } from 'sequelize';
import ServiceError from '../utils/errors/service.error.js';

export const registerPet = async(petData, authUser)=>{
    const t = await pet_repository.startTransaction();
    try{
        const user = await findUserById(authUser.id);
        const newPet = await pet_repository.createPet(petData);
        await newPet.setUser(user.id);

        await t.commit();
        return newPet;
    }catch(e){
        await t.rollback();
        if(e instanceof ValidationError){
            throw new ServiceError(
                400,
                e.errors.map((err) => err.message).join(", ")
            );
        }

        throw new ServiceError(
            e.code || 500,
            e.message || "Error interno del servidor"
        );
    }
}
