import Devices from "../../models/Sensor.js";

const getDeviceByCrop = async (crop_id) => {
    const devices = await Devices.findAll({
        where: {
            crop_id
        }
    });
    return devices;
}

export default getDeviceByCrop;