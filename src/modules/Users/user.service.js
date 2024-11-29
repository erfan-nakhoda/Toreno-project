const autoBind = require("auto-bind");
const UserMessages = require("../../common/Messages/User.messages");
const createHttpError = require('http-errors');
const { transactionModel } = require("./user.model");
const crypto = require('crypto');
const {userModel} = require("./user.model");


class UserService {
    #Db;
    constructor() {
        autoBind(this);
        this.#Db = userModel;
    }
    
    async UpdateInfo(userDto,id){
        if(userDto) {
            await this.#Db.updateOne({_id : id}, userDto);
            return true;            
        }
        throw new createHttpError.BadRequest(".لطفا اطلاعات مورد نظر را برای ویرایش پر کنید");
    }

    async deposit(amount, user){
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
            return true;
        }
        throw new createHttpError.BadRequest(UserMessages.amountIncorrect);
        
    }
}

module.exports = new UserService();