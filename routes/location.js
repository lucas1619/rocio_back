// user routes
import { Router } from "express";

import getDepartamentos from "../controllers/location/getDepartamentos.js";
import getProvincias from "../controllers/location/getProvincias.js";
import getDistritos from "../controllers/location/getDistritos.js";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Location
 *   description: API for managing Locations
 */

/**
 * @swagger
 * /location/departamentos:
 *   get:
 *     summary: Obtener lista de departamentos.
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/departamentos', async (req, res) => {
    try {
        const departamentos = await getDepartamentos();
        res.json(departamentos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /location/provincias/{departamento}:
 *   get:
 *     summary: Obtener lista de provincias de un departamento.
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: departamento
 *         required: true
 *         description: Nombre del departamento.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

router.get('/provincias/:departamento', async (req, res) => {
    try {
        console.log(req.params.departamento);
        const provincias = await getProvincias(req.params.departamento);
        res.json(provincias);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /location/distritos/{departamento}/{provincia}:
 *   get:
 *     summary: Obtener lista de distritos de un departamento y provincia.
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: departamento
 *         required: true
 *         description: Nombre del departamento.
 *         schema:
 *           type: string
 *       - in: path
 *         name: provincia
 *         required: true
 *         description: Nombre de la provincia.
 *         schema:
 *           type: string
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
 *                   ubigeo:
 *                     type: string
 *                   distrito:
 *                     type: string
 */

router.get('/distritos/:departamento/:provincia', async (req, res) => {
    try {
        const distritos = await getDistritos(req.params.departamento, req.params.provincia);
        res.json(distritos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
