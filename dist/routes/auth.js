"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const validacionesBD_1 = require("../helpers/validacionesBD");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("email").custom(validacionesBD_1.existeEmail),
    recolectarErrores_1.recolectarErrores
], auth_1.register);
router.post("/login", [
    (0, express_validator_1.check)("email", "El mail es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
], auth_1.login);
router.patch("/verify", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("code").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
], auth_1.verifyUser);
exports.default = router;
