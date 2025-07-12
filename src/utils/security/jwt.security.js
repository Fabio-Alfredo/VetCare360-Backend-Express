import jwt from "jsonwebtoken";
import { currentConfig } from "../../configurations/common.configuration/config.js";
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken";

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
    const decoded = jwt.verify(token, secretOrPublicKey);
    return decoded;
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw new Error("El token ha expirado");
    } else if (e instanceof JsonWebTokenError) {
      throw new Error("Token invalido")
    } else {
      throw new Error("Error al validar el token");
    }
  }
}
