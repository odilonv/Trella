class User {
    constructor(id, civility, firstName, lastName, dateOfBirth, countryOfBirth, cityOfBirth, email, emailVerified, phoneNumber, password, receiveOffers, depositLimit = 0, betLimit = 0, automaticWithdraw = 0, selfExclusion = false, selfExclusionDate = null, currency = "EUR", language = "FR", timezone = "UTC+1", theme = 0) {
        this.id = id;
        this.civility = civility;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.countryOfBirth = countryOfBirth;
        this.cityOfBirth = cityOfBirth;
        this.email = email;
        this.emailVerified = emailVerified;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.balance = 0;
        this.receiveOffers = receiveOffers;
        this.depositLimit = depositLimit;
        this.betLimit = betLimit;
        this.automaticWithdraw = automaticWithdraw;
        this.selfExclusion = selfExclusion;
        this.selfExclusionDate = selfExclusionDate;
        this.currency = currency;
        this.language = language;
        this.timezone = timezone;
        this.theme = theme;
    }

    static fromJson(json) {
        return new User(
            json.id, json.civility,
            json.firstName, json.lastName, json.dateOfBirth, json.countryOfBirth,
            json.cityOfBirth, json.email, json.emailVerified,
            json.phoneNumber, json.address, json.complementAddress, json.city,
            json.password, json.receiveOffers,
            json.depositLimit, json.betLimit, json.automaticWithdraw, json.selfExclusion,
            json.selfExclusionDate, json.currency, json.language, json.timezone, json.theme
        );
    }
}

export default User;