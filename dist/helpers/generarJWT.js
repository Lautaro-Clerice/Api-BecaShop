"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarToken = (id = "") => {
    return new Promise((res, rej) => {
        const payload = { id };
        jsonwebtoken_1.default.sign(payload, process.env.CLAVE, {
            expiresIn: "4h"
        }, (err, token) => {
            if (err) {
                console.log(err);
                rej("No se puedo generar el token");
            }
            else {
                res(token);
            }
        });
    });
};
exports.generarToken = generarToken;
