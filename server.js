"use strict";
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

let cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Verificar si las variables de entorno se cargaron correctamente
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


app.post("/send-email", async (req, res) => {
    const { nombre, apellido, email } = req.body;

    const numeroHomologacion = Math.floor(100000 + Math.random() * 900000); // Número aleatorio

    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: email,
        subject: "Código de Homologación",
        text: `Cordial saludo ${nombre} ${apellido},\n\nTu contraseña de ingreso a la sesión de homologaciones es: ${numeroHomologacion}`
    };
    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Correo enviado"});
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ error: "Error al enviar el correo" });
    }
});

app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
});
