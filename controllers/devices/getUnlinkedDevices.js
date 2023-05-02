import Devices from "../../models/Sensor.js";


const getUnlinkedDevices = async (device_type) => {
    const devices = await Devices.findAll({
        where: {
            crop_id: null,
            device_type: device_type
        }
    });
    return devices;
}

export default getUnlinkedDevices;