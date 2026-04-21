import jwt from "jsonwebtoken";

/**
 * @typedef {import("express").Request & {user?: { id: string}}} AuthRequest
 */
/**
 * @param {AuthRequest} req
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET || "");
    if (typeof verifyToken === "string") {
      return res.status(401).json({ error: "Token invalido" });
    }
    req.user = { id: verifyToken.id };
    next();
  } catch (err) {
    next(err);
  }
};
