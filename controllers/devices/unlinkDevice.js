import Devices from "../../models/Sensor.js";

const unlinkDevice = async (id) => {
    const device = await Devices.update({
        crop_id: null
    }, {
        where: {
            id
        }
    });
    return device;
}

export default unlinkDevice;