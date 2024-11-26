const autoBind = require("auto-bind");

class UserController {
  #service;
    constructor() {
    autoBind(this);
  }

  getProfile(req,res,next) {
    try {
        
    } catch (err) {
        next(err)
    }
  }

  UpdateInfo(req,res,next) {
    try {
        
    } catch (err) {
        next(err)
    }
  }

  deposit(req,res,next) {
    try {
        
    } catch (err) {
        next(err)
    }
  }


}
