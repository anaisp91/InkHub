//@ts-check

/**
 * @typedef {import("express").Request} Req
 */
/**
 * @typedef {import("express").Response} Res
 */
/**
 * @typedef {import("express").NextFunction} Next
 */
/**
 * @typedef {Object} Errores
 * @property {number} status
 * @property {string} message
 */
/**
 * @param {Errores} err
 * @param {Req} req
 * @param {Res} res
 * @param {Next} next
 */
export const errorsGes = (err, req, res, next) => {
  if (!err.status) {
    return res.status(500).json({ error: "Error imterno del servidor" });
  }

  if (err.status === 404) {
    return res.status(404).json({ error: "No encontrado" });
  }

  if (err.status === 400) {
    return res.status(400).json({ error: "Peticion incorrecta" });
  }

  if (err.status === 401) {
    return res.status(401).json({ error: "No autenticado" });
  }
  if (err.status === 403) {
    return res.status(403).json({ error: "Prohibido" });
  }
  if (err.status === 409) {
    return res.status(409).json({ error: "Conflicto" });
  }

  return res.status(err.status).json({ error: err.message });
};
