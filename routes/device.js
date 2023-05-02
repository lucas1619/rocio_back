import { Router } from "express";
import getDeviceByCrop from "../controllers/devices/getDeviceByCrop.js";
import getUnlinkedDevices from "../controllers/devices/getUnlinkedDevices.js";
import linkDevice from "../controllers/devices/linkDevice.js";
import getDeviceByCropAndType from "../controllers/devices/getDeviceByCropAndType.js";
import createDevice from "../controllers/devices/createDevice.js";
import unlinkDevice from "../controllers/devices/unlinkDevice.js";


const router = Router();

router.get("/getDeviceByCrop/:crop_id", async (req, res) => {
    try {
        const crop_id = req.params.crop_id;
        const devices = await getDeviceByCrop(crop_id);
        res.json(devices);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/getUnlinkedDevices/:device_type", async (req, res) => {
    try {
        const device_type = req.params.device_type;
        const devices = await getUnlinkedDevices(device_type);
        res.json(devices);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post("/linkDevice", async (req, res) => {
    try {
        const crop_id = req.body.crop_id;
        const device_id = req.body.device_id;
        const device = await linkDevice(crop_id, device_id);
        res.json(device);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/getDeviceByCropAndType/:crop_id/:device_type", async (req, res) => {
    try {
        const crop_id = req.params.crop_id;
        const device_type = req.params.device_type;
        const devices = await getDeviceByCropAndType(crop_id, device_type);
        res.json(devices);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post("/createDevice", async (req, res) => {
    try {
        const device_type = req.body.device_type;
        const device_name = req.body.device_name;
        const device = await createDevice(device_name, device_type);
        res.json(device);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post("/unlinkDevice", async (req, res) => {
    try {
        const device_id = req.body.device_id;
        const device = await unlinkDevice(device_id);
        res.json(device);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

export default router;