import Devices from "../../models/Sensor.js";

const createDevice = async (name, device_type) => {
    const device = await Devices.create({
        name,
        device_type
    });
    return device;
}

export default createDevice;