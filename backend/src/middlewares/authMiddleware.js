//@ts-checks
import jwt from "jsonwebtoken";

/**
 * @typedef {import("express").Request & {user?: { id: string}}} AuthRequest
 * @property {Object} user
 * @property {string} user.id
 * @property {string} user.role
 */
/**
 * Middleware de autenticación JWT
 * Verifica el token Bearer en el header Authorization
 *
 * @param {AuthRequest}req - Objeto de solicitud de Express
 * @param {import("express").Response} res - Objeto de respuesta de Express
 * @param {import("express").NextFunction} next - Función next de Express
 */

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no definido");
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof verifyToken === "string") {
      return res.status(401).json({ error: "Token invalido" });
    }
    req.user = {
      id: verifyToken.id,
      //@ts-ignore
      role: verifyToken.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalido" });
  }
};

/**
 *
 * @param {string[]} allowedRoles
 */
export const roleMidd = (allowedRoles) => {
  /**
   * @param {AuthRequest}req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "No autenticado" });
    }
    //@ts-ignore
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "No autorizado" });
    }
    next();
  };
};
