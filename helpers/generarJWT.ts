import jwt from "jsonwebtoken"


export const generarToken = (id:string = "") => {
    return new Promise((res, rej) => {
        const payload = {id};
        jwt.sign(
            payload,
            process.env.CLAVE as string,
            {
                expiresIn:"4h"
            },
            (err:Error | null, token:string | undefined) => {
                if(err){
                    console.log(err);
                    rej("No se puedo generar el token")
                }else {
                    res(token as string)
                }
            }
        )
    })


}