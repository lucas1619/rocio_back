import { Router } from "express";

import getIrrigation from "../controllers/irrigation/get_irrigation.js";
import getIrrigationByCrop from "../controllers/irrigation/get_irrigation_by_crop.js";

import get_irrigation_schema from "../schemas/irrigation/get_irrigation_schema.js";
import get_irrigation_report_schema from "../schemas/irrigation/get_irrigation_report_schema.js";

const router = Router();

router.get('/report/crop/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { month, year, day } = req.query;
        const { error } = get_irrigation_report_schema.validate({ month, year, day });
        if (error) {
            throw new Error(error);
        }
        const irrigation = await getIrrigation(year, month, day, id);

        // agrupar por dia (lunes, martes, miercoles, etc)

        const days = [
            {irrigation: 0, traditional:0}, //lunes 
            {irrigation: 0, traditional:646}, //martes - t
            {irrigation: 0, traditional:634}, //miercoles - t
            {irrigation: 0, traditional:0}, //jueves
            {irrigation: 0, traditional:655}, //viernes - t
            {irrigation: 0, traditional:0}, //sabado - t
            {irrigation: 0, traditional:0}  //domingo
        ];
        for (let i = 0; i < irrigation.length; i++) {
            const irrigationElement = irrigation[i].dataValues;
            const start_date = new Date(irrigationElement.start_date);
            const end_date = new Date(irrigationElement.end_date);
            const duration = (end_date - start_date) / 1000 / 60;
            irrigationElement.duration = duration;
            irrigationElement.water_consumption = duration * 1400 / 60;
            const day = start_date.getDay();

            days[day - 1].irrigation += irrigationElement.water_consumption;

        }
        
        res.json(days);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/crop/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { month, year } = req.query;
        const { error } = get_irrigation_schema.validate({ month, year });
        if (error) {
            throw new Error(error);
        }
        const irrigation = await getIrrigationByCrop(month, year, id);

        for (let i = 0; i < irrigation.length; i++) {
            const irrigationElement = irrigation[i].dataValues;
            const start_date = new Date(irrigationElement.start_date);
            const end_date = new Date(irrigationElement.end_date);
            const duration = (end_date - start_date) / 1000 / 60;
            irrigationElement.duration = duration;
        }

        res.json(irrigation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



export default router;