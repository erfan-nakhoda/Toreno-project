const autoBind = require("auto-bind");
const tourService = require("./tour.service");
const Joi = require("joi");
const { TourCreateValidation, TourUpdateValidation, TourPassengerInfoValidation, TourFilterValidation } = require("./tour.validator");
const tourMessages = require("../../common/Messages/Tour.messages");

class TourController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = tourService
    }

    async getTours(req,res,next) {
        try {
            const tours = await this.#service.getTours();
            
            res.status(200).send({
                message : tours,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }

    async createTours(req,res,next) {
        try {           
            const createDto = await TourCreateValidation(req.body);            
            await this.#service.createTours(createDto);
            return res.status(201).send({
                message : tourMessages.createdSuccessfully,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }
    async UpdateTours(req,res,next) {
        try {
            const updateDto = await TourUpdateValidation(req.body);
            const {tourName} = req.params 
            await this.#service.UpdateTours(tourName,updateDto);
            return res.status(200).send({
                message : tourMessages.UpdateSuccess,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }

    async BuyTours(req,res,next) {
        try {
            const passengerInfo = await TourPassengerInfoValidation(req.body);
            const {tourID} = req.params;
            
            const user = req.user;
            await this.#service.BuyTours(tourID, user, passengerInfo);
            return res.status(200).send({
                message : tourMessages.SuccessBuy,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }

    async filterTours(req,res,next) {
        try {
             const filterObj = await TourFilterValidation(req.query);
             
             const tours = await this.#service.filterTours(filterObj);
             return res.status(200).send({
                data : tours,
                statusCode : res.statusCode
             })
        } catch (err) {
            next(err)
        }
    }

    async deleteTour(req,res,next) {
        try {
            const {tourID} = req.params;
            await this.#service.deleteTour(tourID);
            return res.status(200).send({
                message : tourMessages.SuccessDelete,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new TourController();