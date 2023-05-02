import Irrigation from "../../models/Irrigation.js";

const stopIrrigation = async (cropId) => {
    const limaTimeZone = 'America/Lima';
    const currentDateTime = new Date().toLocaleString('en-US', {timeZone: limaTimeZone});
    const utcDateTime = new Date(currentDateTime).toUTCString();
    console.log(utcDateTime);
    return Irrigation.update(
        {
            end_date: utcDateTime,
        },
        {
            where: {
                crop_id: cropId,
                end_date: null
            }
        }
    )
}

export default stopIrrigation;