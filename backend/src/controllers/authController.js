import bcrypt from "bcryptjs";
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
    //@ts-ignore
    const token = createToken(createUser._id);

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
    const { email, password } = req.body;
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
    //@ts-ignore
    const token = createToken(user._id);
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
export const getProfile = async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};
