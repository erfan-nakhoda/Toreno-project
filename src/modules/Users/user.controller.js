const autoBind = require("auto-bind");
const userService = require("./user.service");
const UserMessages = require("../../common/Messages/User.messages");
const UpdateValidation = require("./user.validator");

class UserController {
  #service;
    constructor() {
    autoBind(this);
    this.#service = userService;
  }

  async getProfile(req,res,next) {
    try {
        return res.status(200).send({
            user : await req.user.populate("transaction", {_id : 0,userID : 0, createdAt: 0 ,updatedAt: 0 ,__v : 0 }),
            statusCode : res.statusCode
        })
    } catch (err) {
        next(err)
    }
  }

  async UpdateInfo(req,res,next) {
    try {
        const data = await UpdateValidation(req.body);
        console.log(data);
        
        const {id} = req.user;
        await this.#service.UpdateInfo(data,id);
        return res.status(200).send({
          statusCode : res.statusCode
        })
    } catch (err) {
        next(err)
    }
  }

  async deposit(req,res,next) {
    try {
        const {amount} = req.body;
        await this.#service.deposit(amount, req.user);
        return res.status(200).send({
          message: UserMessages.SuccessDeposit,
          statusCode : res.statusCode
        })
    } catch (err) {
        next(err)
    }
  }


}

module.exports = new UserController();