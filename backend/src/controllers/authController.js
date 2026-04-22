import bcrypt from "bcryptjs";
import { User } from "../models/UserModel.js";
import { createToken } from "../utils/createToken.js";
import { Studio } from "../models/StudioModel.js";
import { Artist } from "../models/ArtistModel.js";

/**
 * @typedef {Object} RegisterStudioBody
 * @property {string} email
 * @property {string} password
 * @property {Object} studioData
 * @property {string} studioData.name
 * @property {string} studioData.address
 * @property {string} studioData.phoneNum
 */

/**
 * @param {import("express").Request<{}, {}, RegisterStudioBody>} req
 * @param {import("express").Response} res
 */
export const registerStudio = async (req, res) => {
  try {
    const { email, password, studioData } = req.body;

    if (!email || !password || !studioData) {
      return res.status(400).json({ error: "Los campos son obligatorios" });
    }
    if (!studioData.name) {
      return res
        .status(400)
        .json({ error: "El nombre del estudio es obligatorio" });
    }
    if (!studioData.address) {
      return res.status(400).json({ error: "Los campos son obligatorios" });
    }
    if (!studioData.phoneNum) {
      return res.status(400).json({ error: "Los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "El email ya esta registrado" });
    }

    const studio = await Studio.create(studioData);
    if (!studio) {
      return res
        .status(400)
        .json({ error: "Ha ocurrido un error al crear el estudio" });
    }

    const hashed = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
    );
    const createUser = await User.create({
      email,
      password: hashed,
      role: "studio",
      studioId: studio._id,
    });

    // @ts-ignore
    const token = createToken(createUser._id);

    return res.status(201).json({
      user: {
        id: createUser._id,
        email: createUser.email,
        role: createUser.role,
        studioId: createUser.studioId,
      },
      studio: {
        id: studio._id,
        name: studio.name,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ error: "Error de servidor" });
  }
};

/**
 * @param {import("express").Request<{}, {}, RegisterArtistBody>} req
 * @param {import("express").Response} res
 */
const registerArtist = async (req, res) => {
  try {
    const { email, password, artistData } = req.body;
    if (!email || !password || !artistData) {
      return res.status(400).json({ error: "Los campos son obligatorios" });
    }
    if (
      !artistData.name ||
      !artistData.lastName ||
      !artistData.persId ||
      !artistData.phoneNum ||
      !artistData.SanNum ||
      !artistData.SanTitle ||
      !artistData.signature ||
      !artistData.studiId
    ) {
      return res.status(400).json({ error: "Los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "El email ya esta registrado" });
    }

    const artist = await Artist.create(artistData);
    if (!artist) {
      return res
        .status(400)
        .json({ error: "Ha ocurrido un error al crear el estudio" });
    }

    const hashed = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
    );

    const createUser = await User.create({
      email,
      password,
      role: "artist",
      artistId: artist._id,
    });

    const createToken = createToken(createUser._id);
  } catch (err) {}
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
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ error: "Email y constraseña son obligatorios" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Credenciales invalidas" });
//     }
//     const passwordOk = await bcrypt.compare(password, user.password);
//     if (!passwordOk) {
//       return res.status(400).json({ error: "credenciales invalidas" });
//     }
//     //@ts-ignore
//     const token = createToken(user._id);
//     return res.status(200).json({
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//       token,
//     });
//   } catch (err) {
//     return res.status(500).json({ error: "Error en el servidor" });
//   }
// };

// /**
//  *
//  * @param {Request} req
//  * @param {Response} res
//  */
// export const getProfile = async (req, res) => {
//   try {
//     // @ts-ignore
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }
//     return res.status(200).json(user);
//   } catch (err) {
//     return res.status(500).json({ error: "Error del servidor" });
//   }
// };
