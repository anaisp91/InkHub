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

  return res.status(err.status).json({ error: err.message });
};
