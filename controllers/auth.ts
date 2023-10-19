import { Request, Response, json } from "express"
import Usuario, { IUser } from "../models/usuarios"
import bcryptjs from "bcryptjs"
import { ROLES } from "../helpers/constant"
import randomstring from "randomstring"
import { sendEmail } from "../nodemailer/mailer"
import { generarToken } from "../helpers/generarJWT"



export const register = async (req: Request, res: Response) => {
    const {nombre, email, password, rol}: IUser = req.body
    
    const usuario = new Usuario({nombre, email, password, rol})

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    const adminKey = req.headers["admin-key"];

    if(adminKey === process.env.KEYFORADMIN) {
        usuario.rol = ROLES.admin
    }

    const newCode = randomstring.generate(6);

    usuario.code = newCode;
    await usuario.save();
    await sendEmail(email, newCode);

    res.status(201).json ({
        usuario
    })

}

export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password} : IUser = req.body;
    try {
        const usuario = await Usuario.findOne({email});
        if(!usuario) {
            res.status(404).json ({
                msg:"No se encontro el email"
            });
            return
        }
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validarPassword){
            res.status(401).json({
            msg:"La contraseña es incorrecta"
        });
        return;
    }

        const token = await generarToken(usuario?.id);
        res.status(202).json ([
            usuario,
            token
        ]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"error en el servidor"
        })  
    }
}
export const verifyUser = async (req:Request, res: Response) => {
    const {email, code} = req.body;

    try {
        const usuario = await Usuario.findOne({email});
        if(!usuario) {
            res.status(404).json ({
                msg:"No se encontro el email"
            });
            return
        }
        if (usuario.verify) {
            res.status(400).json({
                msg:"El usuario ya etsa verificado"
            })
            return;
        }

        if(code !== usuario.code) {
            res.status(401).json({
                msg:"El codigo ingresado  no es valido"
            })
            return;
        };
        await Usuario.findOneAndUpdate(
            {email},
            {verify: true}
        );

        res.status(200).json({
            msg:"usuario verificado"
        });

    } catch (error) {
         console.log(error);
        res.status(500).json({
            msg:"error en el servidor"
        })  
    }
}