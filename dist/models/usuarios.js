"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constant_1 = require("../helpers/constant");
;
const UserSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El Mail es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    rol: {
        type: String,
        default: constant_1.ROLES.user
    },
    code: {
        type: String
    },
    verify: {
        type: Boolean,
        default: false
    }
});
UserSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password, _id, code } = _a, usuario = __rest(_a, ["__v", "password", "_id", "code"]);
    return usuario;
};
const Usuario = (0, mongoose_1.model)("Usuario", UserSchema);
exports.default = Usuario;
