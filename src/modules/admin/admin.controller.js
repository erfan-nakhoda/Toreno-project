const autoBind = require("auto-bind");
const adminService = require("./admin.service");
const { filterTransactionValidation, filterUserValidation } = require("./admin.validator");

class adminController {
    #service;
    constructor(){
        autoBind(this)
        this.#service = adminService;
    }

    async getTransactions(req,res,next){
        try {
            const transactions = await this.#service.getAllTransactions();
            return res.status(200).send({
                data : transactions,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }
    async filterTransaction(req,res,next){
        try {
            const filterObj = await filterTransactionValidation(req.body);
            
            const transactions = await this.#service.filterTransactions(filterObj);
            console.log(transactions);
            
            return res.status(200).send({
                data : transactions,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }
    async getAllUsers(req,res,next){
        try {
            const users = await this.#service.getAllUsers();
            return res.status(200).send({
                data : users,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }
    async filterUsers(req,res,next){
        try {
            const filterObj = await filterUserValidation(req.body);
            const users = await this.#service.filterUsers(filterObj);
            return res.status(200).send({
                data : users,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new adminController();