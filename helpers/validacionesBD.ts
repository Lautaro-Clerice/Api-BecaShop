import Usuario, { IUser } from "../models/usuarios"
import { sendEmail } from "../nodemailer/mailer";

export const existeEmail = async (email:string):Promise<void> => {
    const existeEmail: IUser | null = await Usuario.findOne({email});

    if (existeEmail && existeEmail.verify) {
        throw new Error(`El corrreo ${email} ya esta en uso`)
    }
    if (existeEmail && !existeEmail.verify) {
        sendEmail(email, existeEmail.code as string)
        throw new Error(`El usuario ya esta registrado de envio nuevamente el codigo a ${email}`)
    }
} 