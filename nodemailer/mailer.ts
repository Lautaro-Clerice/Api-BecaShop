import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: "clericelautaro@gmail.com",
        pass: "eipedkcblobnfupr"
    },
    from: "clericelautaro@gmail.com"
});


export const sendEmail = async (to:string, code:string): Promise<void> => {

    const mailOption = {
        from: "'BecaShop' clericelautaro@gmail.com",
        to,
        subject: 'codigo de verificacion BecaShop',
        text:  `
        Este es tu codigo de verificacion

        El codigo es ${code}
        `
    }

    try {
        await transporter.sendMail(mailOption)
        console.log("correo enviado");
        
    } catch (error) {
        console.error("Error al enviar el corrreo electronico", error);
    }
}