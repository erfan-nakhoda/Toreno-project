const autoBind = require("auto-bind");
const userService = require("./user.service");
const UserMessages = require("../../common/Messages/User.messages");
const {UpdateValidation, UpdateCreditValidation} = require("./user.validator");

class UserController {
  #service;
    constructor() {
    autoBind(this);
    this.#service = userService;
  }

  async getProfile(req,res,next) {
    try {
        return res.status(200).send({
            user : await req.user,
            statusCode : res.statusCode
        })
    } catch (err) {
        next(err)
    }
  }

  async UpdateInfo(req,res,next) {
    try {
        const data = await UpdateValidation(req.body);
        
        const {id} = req.user;
        await this.#service.UpdateInfo(data,id);
        return res.status(200).send({
          message : UserMessages.SuccessUpdate,
          statusCode : res.statusCode
        })
    } catch (err) {
        next(err)
    }
  }
  async UpdateCreditInfo(req,res,next) {
    try {
      const updateDto = await UpdateCreditValidation(req.body);
      const user = req.user;
      await this.#service.UpdateCreditInfo(user,updateDto);
      return res.status(200).send({
        message : UserMessages.SuccessUpdate,
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