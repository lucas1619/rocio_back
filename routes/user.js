// user routes
import { Router } from "express";
/*
SCHEMAS
*/
import create_user_schema from "../schemas/user/create_user_schema.js";
import login_schema from "../schemas/user/login_schema.js";
import edit_user_schema from "../schemas/user/edit_user_schema.js";
/*
controllers
*/
import edit from "../controllers/user/edit.js";
import login from "../controllers/user/login.js";
import register from "../controllers/user/register.js";

const router = Router();

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
