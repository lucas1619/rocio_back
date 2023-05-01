import Devices from "../../models/Sensor.js";

const linkDevice = async (crop_id, device_id) => {
    const device = await Devices.update({
        crop_id
    }, {
        where: {
            id: device_id
        }
    });
    return device;
}

export default linkDevice;