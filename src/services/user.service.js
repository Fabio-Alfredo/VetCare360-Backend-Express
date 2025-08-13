import * as user_repository from '../repositories/user.repository.js';
import { ValidationError } from 'sequelize';
import ServiceError from '../utils/errors/service.error.js';

export const findUserById = async (id)=>{
    try{
        const user = await user_repository.findById(id);

        if(!user) throw new ServiceError(404, "Usuario no encontrado");
        
        return user;
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