import Irrigation from "../../models/Irrigation.js";

const stopIrrigation = async (cropId) => {
    const limaTimeZone = 'America/Lima';
    const currentDateTime = new Date().toLocaleString('en-US', {timeZone: limaTimeZone});
    const utcDateTime = new Date(currentDateTime).toUTCString();
    const irrigations = await Irrigation.findAll({
        where: {
            crop_id: cropId,
            end_time: null
        }
    });

    for(let i = 0; i < irrigations.length; i++) {
        irrigations[i].end_time = utcDateTime;
        await irrigations[i].save();
    }
}

export default stopIrrigation;