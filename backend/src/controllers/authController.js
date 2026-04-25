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
 * Registra un nuevo estudio en la plataforma
 *
 * @route POST /api/studio/register
 * @access Public
 *
 * @param req - Objeto de solicitud HTTP
 * @param req.body - Cuerpo de la solicitud
 * @param req.body.email - Email del estudio (obligatorio)
 * @param req.body.password - Contraseña del estudio (obligatorio)
 * @param req.body.studioData - Datos del estudio (obligatorio)
 * @param req.body.studioData.name - Nombre del estudio (obligatorio)
 * @param req.body.studioData.address - Dirección del estudio (obligatorio)
 * @param req.body.studioData.phoneNum - Número de teléfono del estudio (obligatorio)
 * @param res - Objeto de respuesta HTTP
 *
 * @returns {Promise<Response>} Respuesta HTTP con el token de autenticación y los datos del usuario/estudio
 *
 * @description
 * Este endpoint realiza las siguientes operaciones:
 * 1. Valida que todos los campos requeridos estén presentes
 * 2. Verifica que el email no esté ya registrado
 * 3. Hashea la contraseña usando bcrypt
 * 4. Crea un usuario con rol "studio"
 * 5. Crea el registro del estudio vinculado al usuario
 * 6. Genera un token JWT
 * 7. Retorna el token y los datos del usuario/estudio
 * @throws {400} - Bad Request: Campos faltantes o datos inválidos
 * @throws {409} - Conflict: El email ya está registrado
 * @throws {500} - Internal Server Error: Error del servidor
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

    if (!studioData.name || !studioData.address || !studioData.phoneNum) {
      return res.status(400).json({ error: "Faltan datos del estudio" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "El email ya esta registrado" });
    }

    const hashed = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
    );

    const user = await User.create({
      email,
      password: hashed,
      role: "studio",
    });

    const studio = await Studio.create({
      user: user._id,
      name: studioData.name,
      address: studioData.address,
      phoneNum: studioData.phoneNum,
    });

    /** @type {{ _id: string; role: string }} */
    const userForToken = {
      _id: user._id.toString(),
      role: user.role,
    };
    const token = createToken(userForToken);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      studio: {
        id: studio._id,
        user: studio.user,
        name: studio.name,
        address: studio.address,
        phoneNum: studio.phoneNum,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

/**
 * @typedef {import("express").Request & { user?: { id: string; role: string } }} AuthRequest
 */
/**
 * @typedef {Object} RegisterArtistBody
 * @property {string} email
 * @property {string} password
 * @property {Object} artistData
 * @property {string} artistData.name
 * @property {string} artistData.lastName
 * @property {string} artistData.persId
 * @property {string} artistData.phoneNum
 * @property {string} artistData.SanNum
 * @property {string} artistData.SanTitle
 * @property {string} artistData.signature
 * @property {string} artistData.studio
 */
/**
 * @typedef {Object} Request
 * @property {Object} body
 * @property {string} body.email
 * @property {string} body.password
 * @property {Object} body.artistData
 * @property {string} body.artistData.name
 * @property {string} body.artistData.lastName
 * @property {string} body.artistData.persId
 * @property {string} body.artistData.phoneNum
 * @property {string} body.artistData.SanNum
 * @property {string} body.artistData.SanTitle
 * @property {string} body.artistData.signature
 * @property {string} body.artistData.studio
 * @property {Object} user
 * @property {string} user.id
 * @property {string} user.role
 */
/**
 * @typedef {Object} Response
 * @property {number} status
 * @property {function} json
 */
/**
 * @description
 * Este endpoint permite a un estudio registrar un nuevo artista
 * 1. Valida que todos los campos requeridos estén presentes
 * 2. Verifica que el email no esté ya registrado
 * 3. Hashea la contraseña usando bcrypt
 * 4. Crea un usuario con rol "artist"
 * 5. Crea el registro del artista vinculado al usuario
 * @returns {Promise<Response>} Respuesta HTTP con el token de autenticación y los datos del usuario/artista
 *
 * @throws {400} - Bad Request: Campos faltantes o datos inválidos
 * @throws {409} - Conflict: El email ya está registrado
 * @throws {500} - Internal Server Error: Error del servidor
 */
/**
 * @param {AuthRequest} req
 * @param {import("express").Request<{}, {}, RegisterArtistBody>} req
 * @param {import("express").Response} res
 */
export const registerArtist = async (req, res) => {
  try {
    const { email, password, artistData } = req.body;
    if (!email || !password || !artistData) {
      return res.status(400).json({ error: "Los campos son obligatorios" });
    }
    // @ts-ignore
    const studio = await Studio.findOne({ user: req.user.id });
    if (!studio) {
      return res.status(404).json({ error: "No autorizado" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "El email ya esta registrado" });
    }

    const hashed = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
    );

    const user = await User.create({
      email,
      password: hashed,
      role: "artist",
    });

    const artist = await Artist.create({
      user: user._id,
      name: artistData.name,
      lastName: artistData.lastName,
      persId: artistData.persId,
      phoneNum: artistData.phoneNum,
      SanNum: artistData.SanNum,
      studio: studio._id,
    });

    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      artist: {
        id: artist._id,
        user: artist.user,
        studio: studio._id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Los campos son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }
    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }

    const userForToken = {
      _id: user._id.toString(),
      role: user.role,
    };
    const token = createToken(userForToken);
    return res.status(200).json({
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

// // /**
// //  *
// //  * @param {Request} req
// //  * @param {Response} res
// //  */
// // export const getProfile = async (req, res) => {
// //   try {
// //     // @ts-ignore
// //     const user = await User.findById(req.user.id).select("-password");
// //     if (!user) {
// //       return res.status(404).json({ error: "Usuario no encontrado" });
// //     }
// //     return res.status(200).json(user);
// //   } catch (err) {
// //     return res.status(500).json({ error: "Error del servidor" });
// //   }
// // };
