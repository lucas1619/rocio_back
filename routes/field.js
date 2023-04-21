import { Router } from "express";

import getWeather from "../utils/getWeather.js";

import createField from "../controllers/field/create_field.js";
import getFields from "../controllers/field/get_fields.js";
import getField from "../controllers/field/get_field.js";

import create_field_schema from "../schemas/field/create_field_schema.js";

const router = Router();

/*
@swagger
tags:
    - name: Field
        description: Field endpoints
*/

/**
 * @swagger
 * /field/:
 *   post:
 *     summary: Crear un nuevo campo.
 *     tags: [Field]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - area
 *               - user_id
 *               - location_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del campo.
 *               area:
 *                 type: number
 *                 description: Área del campo en metros cuadrados.
 *               user_id:
 *                 type: integer
 *                 description: ID del usuario propietario del campo.
 *               location_id:
 *                 type: integer
 *                 description: ID de la ubicación del campo.
 *     responses:
 *       200:
 *         description: Campo creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del campo creado.
 *                 name:
 *                   type: string
 *                   description: Nombre del campo.
 *                 area:
 *                   type: number
 *                   description: Área del campo en metros cuadrados.
 *                 user_id:
 *                   type: integer
 *                   description: ID del usuario propietario del campo.
 *                 location_id:
 *                   type: integer
 *                   description: ID de la ubicación del campo.
 *       400:
 *         description: Error en la validación de los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error descriptivo.
 */

router.post('/', async (req, res) => {
    try {
        const { name, area, user_id, location_id } = req.body;
        await create_field_schema.validateAsync({ name, area, user_id, location_id });
        const field = await createField(name, area, user_id, location_id);
        res.json(field);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /field/:user_id/all:
 *   get:
 *     summary: Obtener todos los campos de un usuario.
 *     tags: [Field]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID del usuario propietario de los campos.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del campo.
 *                   name:
 *                     type: string
 *                     description: Nombre del campo.
 *                   area:
 *                     type: number
 *                     description: Área del campo en metros cuadrados.
 *                   user_id:
 *                     type: integer
 *                     description: ID del usuario propietario del campo.
 *                   location_id:
 *                     type: integer
 *                     description: ID de la ubicación del campo.
 *       400:
 *         description: Error al obtener los campos del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error descriptivo.
 */


router.get('/:user_id/all', async (req, res) => {
    try {
        const fields = await getFields(req.params.user_id);
        res.json(fields);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /field/{field_id}:
 *   get:
 *     summary: Obtener información de un campo.
 *     tags: [Field]
 *     parameters:
 *       - in: path
 *         name: field_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del campo a obtener.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Field'
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: El ID del campo debe ser un número entero.
 *       404:
 *         description: Campo no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Campo no encontrado con el ID proporcionado.
 */


router.get('/:field_id', async (req, res) => {
    try {
        const field = await getField(req.params.field_id);
        if(!field) throw new Error('Campo no encontrado con el ID proporcionado');
        const { latitude, longitude } = field.dataValues.location;
        const weather = await getWeather(latitude, longitude);
        field.dataValues.weather = weather;
        res.json(field);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;