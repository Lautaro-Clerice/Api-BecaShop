import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import {check} from "express-validator"
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { existeEmail } from "../helpers/validacionesBD";

const router = Router()

router.post(
    "/register",
    [
        check ("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check ("email").custom(existeEmail),
        recolectarErrores

    ],
    register
)

router.post(
    "/login",
    [
check("email", "El mail es obligatorio").isEmail(),
check("password", "La contraseña es obligatoria").not().isEmpty(),
recolectarErrores
    ],
    login
)

router.patch (
    "/verify",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("code").not().isEmpty(),
        recolectarErrores 
    ],
    verifyUser
)
export default router;