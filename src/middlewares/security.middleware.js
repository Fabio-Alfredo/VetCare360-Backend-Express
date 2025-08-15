import createHttpError from "http-errors";
import { verify_token } from "../utils/security/jwt.security.js";
import { findUserAndRolesById } from "../services/user.service.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (
      !authorization ||
      !authorization.startsWith("Bearer ") ||
      !(authorization.length > 7)
    )
      return next(createHttpError(401, "No authorization token provided"));

    const token = authorization.substring(7);
    const decoded = verify_token(token);

    if (!decoded)
      return next(createHttpError(401, "Invalid authorization token"));

    const { user, rolesId } = await findUserAndRolesById(decoded.id);

    req.user = user;
    req.roles = rolesId;
    req.token = token;
    
    next();
  } catch (e) {
    next(createHttpError(401, e.message || "Unknown error"));
  }
};

export const authorizationMiddleware = (requiredRole = []) => {
  return async (req, res, next) => {
    if (
      !req.user ||
      !req.roles ||
      !requiredRole.some((r) => req.roles.includes(r))
    ) {
      return next(
        createHttpError(
          403,
          "You do not have permission to access this resource"
        )
      );
    }
    next();
  };
};
