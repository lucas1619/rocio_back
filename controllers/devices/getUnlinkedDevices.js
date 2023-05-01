import Devices from "../../models/Sensor.js";


const getUnlinkedDevices = async () => {
    const devices = await Devices.findAll({
        where: {
            crop_id: null
        }
    });
    return devices;
}

export default getUnlinkedDevices;