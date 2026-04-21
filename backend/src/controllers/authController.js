import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";
import { createToken } from "../utils/createToken.js";

/**
 * @typedef {import("express").Request} Req
 * @typedef {import("express").Response} Res
 * @typedef {import("express").NextFunction} Next
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description: Crea un nuevo usuario(studio_admin)
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Los campos son obligatorios" });
    }

    const newUser = await User.findOne({ email });
    if (!email.includes("@")) {
      return res.status(400).json("Email invalido");
    }
    if (newUser) {
      return res.status(409).json({ error: "El email ya esta registrado" });
    }

    const hashed = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
    );
    const createUser = await User.create({
      name,
      email,
      password: hashed,
      role: "studio_admin",
    });
    const token = createToken(createUser.id);

    return res.status(201).json({
      user: {
        id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        role: createUser.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */
/**
 *
 * @param {Request} req
 * @param {Response} res
 */
export const login = async (req, res) => {
  try {
    /**
     * @type {string}
     */
    const email = req.body.email;
    /**
     * @type {string}
     */
    const password = req.body.password;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y constraseña son obligatorios" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Credenciales invalidas" });
    }
    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(400).json({ error: "credenciales invalidas" });
    }

    const token = createToken(user.id);
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
