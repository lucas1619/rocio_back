import fetch from "node-fetch";

const crop_types = {
    'Arroz': 1,
    'Algodon': 2,
    'Canamo': 3,
    'Tomate': 4,
    'Seda': 5,
    'Rabanito': 6,
    'Helechos': 7,
    'Maiz': 8,
    'Lino': 9,
    'Rosas': 10,
    'Hortensias': 11,
    'Orquideas': 12
}

const soil_types = {
    'Arcilloso': 1,
    'Franco arenoso': 2,
    'Franco': 3,
    'Franco arcilloso': 4,
    'Arcilloso Arenoso': 5,
    'Arenoso': 6
}

const crop_phases = {
    'Maduracion': 1,
    'Ahijamiento': 2,
    'Germinacion': 3
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