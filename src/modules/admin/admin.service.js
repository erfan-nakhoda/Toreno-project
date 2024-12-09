const autoBind = require("auto-bind");
const { transactionModel } = require("../Users/user.model");
const { userModel } = require("../Users/user.model");
const createHttpError = require("http-errors");
const moment = require('jalali-moment');
class adminService {
    #transactionDb;
    #userDb;
    constructor() {
        autoBind(this);
        this.#transactionDb = transactionModel;
        this.#userDb = userModel;
    }
    async getAllUsers() {
        const users = await this.#userDb.find({}, {updatedAt : 0, __v : 0});
        return users;
    }
    async getAllTransactions() {
        const transactions = await this.#transactionDb.find({});
        return transactions;
    }
    async filterTransactions(filterObj) {
        let { date, ...rest } = filterObj;
        const OneDayAfterDate = moment(date).add(1, "day");

        let createdAt = { createdAt: { $gte: date, $lte: OneDayAfterDate } };
        if (!date) createdAt = null;

        const transactions = await this.#transactionDb.find(Object.assign(rest, createdAt));
        if (transactions.length == 0) throw new createHttpError.NotFound(".تراکنشی یافت نشد");
        return transactions;
    }
    async filterUsers(filterObj) {
        const { firstname, lastname, nationalCode,email, ...rest } = filterObj;
        let personalInfo = {
            "personalInfo.firstname": firstname,
            "personalInfo.lastname": lastname,
            "personalInfo.email" : email,
            "personalInfo.nationalCode": nationalCode
        }

        for (const item in personalInfo) {
            if (!personalInfo[item]) delete personalInfo[item];
        }
        const users = await this.#userDb.find(Object.assign(rest, personalInfo));
        if (users.length == 0) throw new createHttpError.NotFound(".کاربر مورد نظر یافت نشد")
        return users;
    }
}

module.exports = new adminService();