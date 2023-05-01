import Devices from "../../models/Sensor.js";

const getDeviceByCropAndType = async (crop_id, device_type) => {
    const devices = await Devices.findAll({
        where: {
            crop_id,
            device_type
        }
    });
    return devices;
}

export default getDeviceByCropAndType;