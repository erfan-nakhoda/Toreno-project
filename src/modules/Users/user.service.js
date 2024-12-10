const autoBind = require("auto-bind");
const UserMessages = require("../../common/Messages/User.messages");
const createHttpError = require('http-errors');
const { transactionModel } = require("./user.model");
const crypto = require('crypto');
const {userModel} = require("./user.model");
const tourMessages = require("../../common/Messages/Tour.messages");


class UserService {
    #Db;
    constructor() {
        autoBind(this);
        this.#Db = userModel;
    }
    
    async UpdateInfo(userDto,id){
        console.log(userDto);
        
        if(Object.keys(userDto).length) {
            await this.#Db.updateOne({_id : id}, {personalInfo :userDto});
            return true;            
        }
        throw new createHttpError.BadRequest(".لطفا اطلاعات مورد نظر را برای ویرایش پر کنید");
    }
    async UpdateCreditInfo(user,updateDto) {
        if(updateDto){
             await this.#Db.updateOne({_id : user.id}, {creditsInfo : updateDto});
             return true
        }
        throw new createHttpError.BadRequest(".لطفا اطلاعات مورد نظر را برای ویرایش پر کنید")
    }
    async deposit(amount, user){      
        if(user.creditsInfo?.creditNumber){
        if(typeof +amount == "number" && amount > 0) {
            user.walletValue += +amount;
            const orderID = crypto.randomInt(100000, 999999);
            const transaction = await transactionModel.create({
                price : amount,
                Name : "واریز",
                orderID,
                userID : user.id
            })
            console.log(transaction);
            
            user.transaction.push(transaction.id);
            await user.save();
            return true;}
            throw new createHttpError.BadRequest(UserMessages.amountIncorrect);
            
        }
        throw new createHttpError.BadRequest(UserMessages.CreditDataMiss);
        
        
    }
}

module.exports = new UserService();