// user routes
import { Router } from "express";
import create_user_schema from "../schemas/user/create_user_schema.js";
import login_schema from "../schemas/user/login_schema.js";
import edit_user_schema from "../schemas/user/edit_user_schema.js";
import edit from "../controllers/user/edit.js";
import login from "../controllers/user/login.js";
import register from "../controllers/user/register.js";

const router = Router();
/*
@swagger
tags:
    - name: User
        description: User endpoints
*/

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *
 */
router.post('/register', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        await create_user_schema.validateAsync({ name, username, password });
        const user = await register(name, username, password);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Inicia sesión en la aplicación.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        await login_schema.validateAsync({ username, password });
        const user = await login(username, password);
        if(!user) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /user/edit/{id}:
 *   put:
 *     summary: Edita un usuario existente.
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a editar.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 */

router.put('/edit/:id', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        await edit_user_schema.validateAsync({ name, username, password });
        const user = await edit(req.params.id, name, username, password);
        res.json(user[1][0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
