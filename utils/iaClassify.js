import fetch from "node-fetch";

const crop_types = {
    'Ornamentales': 1,
    'Alimentarios': 2,
    'Textiles': 3
}

const soil_types = {
    'Arcilloso': 1,
    'Franco': 2,
    'Arenoso': 3
}

const crop_phases = {
    'Germinacion': 1,
    'Ahijamiento': 2,
    'Maduracion': 3
}

const classifyIrrigationFrequency = async (crop_type, soil_type, crop_phase) => {
    console.log({
        crop_type: crop_types[crop_type],
        soil_type: soil_types[soil_type],
        crop_phase: crop_phases[crop_phase]
    })
    const url = 'https://rvqlp8v64j.execute-api.us-west-2.amazonaws.com/rocio-ia'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            crop_type: crop_types[crop_type],
            soil_type: soil_types[soil_type],
            crop_phase: crop_phases[crop_phase]
        })
    });
    const data = await response.json();
    console.log(data)
    return data.result;
};

export default classifyIrrigationFrequency;