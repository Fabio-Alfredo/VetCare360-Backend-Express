import createHttpError from "http-errors";
import { verify_token } from "../utils/security/jwt.security.js";

export const authMiddleware = async(req, res, next)=>{
    try{
        const { authorization} = req.headers;
        if(!authorization || !authorization.startsWith("Bearer ") || !(authorization.length > 7))
            return next(createHttpError(401, "No authorization token provided"));

        const token = authorization.substring(7);
        const decoded = verify_token(token);

        if(!decoded)
            return next(createHttpError(401, "Invalid authorization token"));

        req.user = decoded;
        req.token = token;
        next();
    }catch(e){
        next(createHttpError(401, e.message || "Unknown error"));
    }
}