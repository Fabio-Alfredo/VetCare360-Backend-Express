import * as veterinarian_repository from '../repositories/veterinarian.repository.js';
import { findUserById } from './user.service.js';
import { findById } from '../services/rolse.service.js';
import { ValidationError } from 'sequelize';
import ServiceError from '../utils/errors/service.error.js';

export const createVeterinarian = async (veterinarianData)=>{
    const t = await veterinarian_repository.startTransaction();
    try{
        const user = await findUserById(veterinarianData.userId);
        const existingVet = await veterinarian_repository.findByUserId(user.id);
        
        if(existingVet) throw new ServiceError(409, "Ya existe un veterinario asociado a este usuario");

        const newVeterinarian = await veterinarian_repository.save(veterinarianData, t);
        await newVeterinarian.setUser(user.id, { transaction: t });
        let role = await findById("VET");
        await role.addUser(user.id, { transaction: t });

        await t.commit();
        return newVeterinarian;
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

export const findAllVeterinarians = async()=>{
    try{
        const veterinarians = await veterinarian_repository.findAll();
        return veterinarians;
    }catch(e){
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