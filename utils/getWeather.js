import fetch from 'node-fetch';
const getWeather = async (latitude, longitude) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=relativehumidity_2m&current_weather=true&forecast_days=1&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();

    const time = data.current_weather.time;
    const indexOfTime = data.hourly.time.indexOf(time);
    const humidity = data.hourly.relativehumidity_2m[indexOfTime];
    return {
        temperature: data.current_weather.temperature,
        humidity: humidity
    };
};

export default getWeather;