import Irrigation from "../../models/Irrigation.js";

const startIrrigation = async (cropId) => {
    const limaTimeZone = 'America/Lima';
    const currentDateTime = new Date().toLocaleString('en-US', {timeZone: limaTimeZone});
    const utcDateTime = new Date(currentDateTime).toUTCString();
    await Irrigation.create({
        crop_id: cropId,
        start_date: utcDateTime
    });
}

export default startIrrigation;