class Country {

    constructor(id, name, flag) {
        this.id = id;
        this.name = name;
        this.flag = flag;
    }

    static fromJson(json) {
        return new Country(json.id, json.name, json.flag);
    }
}

export default Country;