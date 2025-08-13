import * as veterinarian_service from '../services/veterinarian.service.js';
import createHttpError from 'http-errors';
import responseHandler from '../handlers/res.handler.js';


export const registerVeterinarian = async (req, res, next)=>{
    try{
        const veterinarian = req.body;
        const newVeterinarian = await veterinarian_service.createVeterinarian(veterinarian);
        
        return responseHandler(res, 201, "Veterinario registrado con éxito", newVeterinarian);
    }catch(e){
        next(createHttpError(e.code, e.message));
    }
}