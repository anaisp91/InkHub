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
    //Desestructuracion de body
    const { email, password, studioData } = req.body;

    //Validacion de campos obligatorios
    if (!email || !password || !studioData) {
      return res.status(400).json({ error: "Los campos son obligatorios" });
    }
    //Validacion de datos del estudio
    if (!studioData.name || !studioData.address || !studioData.phoneNum) {
      return res.status(400).json({ error: "Faltan datos del estudio" });
    }
    //Verificacion si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "El email ya esta registrado" });
    }
    //Hashear la constraseña
    const hashed = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
    );
    //Crear el ususario
    const user = await User.create({
      email,
      password: hashed,
      role: "studio",
    });
    //Crear el estudio asociado al usuario
    const studio = await Studio.create({
      user: user._id,
      name: studioData.name,
      address: studioData.address,
      phoneNum: studioData.phoneNum,
    });
    //Generar token JWT
    const token = createToken(user._id.toString());
    //Respuesta exitosa
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
    //Respuesta de eerror genérica
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const registerArtist = async (req, res) => {
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
      !artistData.studioId
    ) {
      return res
        .status(400)
        .json({ error: "Los datos del artista son obligatorios" });
    }

    const studio = await Studio.findById(artistData.studio);
    if (!studio) {
      return res.status(404).json({ error: "El estudio no existe" });
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

    const token = createToken(user._id.toString());

    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      artist: {
        id: artist._id,
        user: artist.user,
        studio: artistData.studio,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// /**
//  * @typedef {import("express").Request} Request
//  * @typedef {import("express").Response} Response
//  */
// /**
//  *
//  * @param {Request} req
//  * @param {Response} res
//  */
// // export const login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     if (!email || !password) {
// //       return res
// //         .status(400)
// //         .json({ error: "Email y constraseña son obligatorios" });
// //     }
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ error: "Credenciales invalidas" });
// //     }
// //     const passwordOk = await bcrypt.compare(password, user.password);
// //     if (!passwordOk) {
// //       return res.status(400).json({ error: "credenciales invalidas" });
// //     }
// //     //@ts-ignore
// //     const token = createToken(user._id);
// //     return res.status(200).json({
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //       },
// //       token,
// //     });
// //   } catch (err) {
// //     return res.status(500).json({ error: "Error en el servidor" });
// //   }
// // };

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
