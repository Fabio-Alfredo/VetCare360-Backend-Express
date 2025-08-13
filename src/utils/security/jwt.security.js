import jwt from "jsonwebtoken";
import { currentConfig } from "../../configurations/common.configuration/config.js";


export const generate_token = (payload) => {
  const token = jwt.sign(
    payload,
    currentConfig.secretKeyJwt,
    {
      expiresIn: '1h'
    });

  return {
    token,
    type: 'Bearer'
  };
}


export const verify_token = (token) => {
  try {

    const decoded = jwt.verify(token, currentConfig.secretKeyJwt);
    return decoded;
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      throw new Error("El token ha expirado");
    } else if (e instanceof jwt.JsonWebTokenError) {
      throw new Error("Token invalido")
    } else {
      throw new Error("Error al validar el token");
    }
  }
}
