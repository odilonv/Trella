import Country from "../../models/Country";

async function getAllCountries() {
    const response = await fetch('http://localhost:5000/api/data/countries');
    const data = await response.json();
    return parseArray(data);
}

function parseArray(data) {
    let countries = [];
    for (let i = 0; i < data.length; i++) {
        if (Country.fromJson(data[i]) != null)
            countries.push(Country.fromJson(data[i]));
    }
    return countries;
}

export { getAllCountries };