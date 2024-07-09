import DatabaseConnection from './DatabaseConnection.js';

class Country {

    static tableName = "country";

    constructor(id, name, flag) {
        this.id = id;
        this.name = name;
        this.flas = flag;
    }

    static fromDatabaseRow(row) {
        return new Country(row.id, row.name, row.flag);
    }

    static async getAll() {
        const connection = await DatabaseConnection.getInstance();
        let countries = await connection.execute(`SELECT * FROM ${this.tableName}`);
        let countriesArray = [];
        for (let country of countries[0]) {
            countriesArray.push(Country.fromDatabaseRow(country))
        }
        return countriesArray;
    }
}

export default Country;