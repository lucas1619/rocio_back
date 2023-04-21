// user routes
import { Router } from "express";

import getDepartamentos from "../controllers/location/getDepartamentos.js";
import getProvincias from "../controllers/location/getProvincias.js";
import getDistritos from "../controllers/location/getDistritos.js";

const router = Router();

router.get('/departamentos', async (req, res) => {
    try {
        const departamentos = await getDepartamentos();
        res.json(departamentos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/provincias/:departamento', async (req, res) => {
    try {
        console.log(req.params.departamento);
        const provincias = await getProvincias(req.params.departamento);
        res.json(provincias);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/distritos/:departamento/:provincia', async (req, res) => {
    try {
        const distritos = await getDistritos(req.params.departamento, req.params.provincia);
        res.json(distritos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
