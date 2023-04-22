import { Router } from "express";

import classifyIrrigationFrequency from "../utils/iaClassify.js";

import createCrop from "../controllers/crop/create_crop.js";
import getCrop from "../controllers/crop/get_crop.js";
import getAllCrops from "../controllers/crop/get_all_crops.js";

import create_crop_schema from "../schemas/crop/create_crop_schema.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Crop
 *   description: API for managing crops
 */

/**
 * @swagger
 * /crop/:
 *   post:
 *     summary: Create a new crop
 *     tags: [Crop]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               crop_type:
 *                 type: integer
 *               soil_type:
 *                 type: integer
 *               growth_stage:
 *                 type: integer
 *               field_id:
 *                 type: integer
 *             example:
 *               name: Wheat crop
 *               crop_type: 1
 *               soil_type: 2
 *               growth_stage: 3
 *               field_id: 4
 *     responses:
 *       200:
 *         description: Crop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 crop_type:
 *                   type: integer
 *                 soil_type:
 *                   type: integer
 *                 growth_stage:
 *                   type: integer
 *                 field_id:
 *                   type: integer
 *               example:
 *                 id: 1
 *                 name: Wheat crop
 *                 crop_type: 1
 *                 soil_type: 2
 *                 growth_stage: 3
 *                 field_id: 4
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid input data"
 */

router.post('/', async (req, res) => {
    try {
        const { name, crop_type, soil_type, growth_stage, field_id } = req.body;
        await create_crop_schema.validateAsync({ name, crop_type, soil_type, growth_stage, field_id });
        const irrigation_frequency = await classifyIrrigationFrequency(crop_type, soil_type, growth_stage);
        console.log(irrigation_frequency);
        const crop = await createCrop(name, crop_type, soil_type, growth_stage, irrigation_frequency, field_id);
        res.json(crop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /crop/{id}:
 *   get:
 *     summary: Get information about a single crop..
 *     tags: [Crop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the crop to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A crop object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 crop_type:
 *                   type: string
 *                 soil_type:
 *                   type: string
 *                 growth_stage:
 *                   type: string
 *                 field_id:
 *                   type: integer
 *
 */

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const crop = await getCrop(id);
        res.json(crop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /crop/{fieldId}/all:
 *   get:
 *     summary: Get all crops in a field.
 *     tags: [Crop]
 *     parameters:
 *       - in: path
 *         name: fieldId
 *         required: true
 *         description: The ID of the field containing the crops to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An array of crop objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   crop_type:
 *                     type: string
 *                   soil_type:
 *                     type: string
 *                   growth_stage:
 *                     type: string
 *                   field_id:
 *                     type: integer
 */

router.get('/:fieldId/all', async (req, res) => {
    try {
        const crops = await getAllCrops(req.params.fieldId);
        res.json(crops);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;