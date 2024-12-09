const autoBind = require("auto-bind");
const tourModel = require("./tour.model");
const createHttpError = require("http-errors");
const tourMessages = require("../../common/Messages/Tour.messages");
const moment = require("jalali-moment");
const { transactionModel } = require("../Users/user.model")
const { isValidObjectId } = require("mongoose");
const { randomInt } = require("crypto")

class TourService {
    #Db;
    #transactionDb;
    constructor() {
        autoBind(this);
        this.#Db = tourModel;
        this.#transactionDb = transactionModel;
    }

    async getTours() {
        const now = moment().utc().startOf("day").toISOString(false);
        
        const tours = await this.#Db.find({ "tourTime.departingTime": { $gte: now } }, { __v: 0 });

        return tours;
    }
    async createTours(createDto) {
        const existTour = await this.#Db.findOne({ tourName: createDto.tourName });
        if (existTour) throw new createHttpError.Conflict(tourMessages.conflictName);
        let objToInsert = {
            tourTime: {
                departingTime: new Date(createDto.departingTime),
                arrivalTime: new Date(createDto.arrivalTime)
            }
        }
        delete createDto.departingTime, createDto.arrivalTime;
        const tour = await this.#Db.create(Object.assign(createDto, objToInsert, { tourID: randomInt(100000000, 999999999) }));
        return tour;
    }
    async UpdateTours(tourName, updateDto) {
        if (updateDto.tourName) {
            const existTour = await this.#Db.findOne({ tourName: updateDto.tourName });
            if (existTour) throw new createHttpError.Conflict(tourMessages.conflictName);
        }
        let tourTime = {
            tourTime: {
                departingTime: updateDto.departingTime,
                arrivalTime: updateDto.arrivalTime
            }
        }
        if (!tourTime.tourTime.departingTime) delete tourTime.tourTime.departingTime;
        if (!tourTime.tourTime.arrivalTime) delete tourTime.tourTime.arrivalTime;
        if (!tourTime.tourTime.departingTime && !tourTime.tourTime.arrivalTime) tourTime = {};
        if (!await this.#Db.findOne({ tourName })) throw new createHttpError.BadRequest(tourMessages.notExist)
        await this.#Db.updateOne({ tourName }, Object.assign(updateDto, tourTime));
        return true;
    }
    async BuyTours(tourID, user, passengerInfo) {
        console.log(user);
        
        let tour = await this.#Db.findOne({ tourID: tourID });
        if (!tour) throw new createHttpError.NotFound(tourMessages.NotFound);
        if (!(user.walletValue >= tour.price)) throw new createHttpError.NotAcceptable(tourMessages.NotEnoughBalance);
        if (tour.capacity == 0) throw new createHttpError.NotAcceptable(tourMessages.NotEnoughCapacity);
        user.myTours = {passengerInfo, tourInfo : tour.id}
        const transaction = await this.#transactionDb.create({
            Name: `${tour.tourName} ثبت نام`,
            price: tour.price,
            userID: user.id,
            orderID: randomInt(100000, 999999)
        })
        user.walletValue -= tour.price;
        if (user.myTours.tourInfo == tour.id) user.myTours.passengerInfo.push(passengerInfo);
        else user.myTours = {
            passengerInfo,
            tourInfo: tour.id
        }
        user.transaction.push(transaction);
        await user.save();
        tour.capacity -= 1;
        await tour.save();

        return true;
    }
    async filterTours(filterObj) {
        let tours = [];
        if(filterObj.departingTime) {
            let {departingTime, ...rest} = filterObj;
            
            tours = await this.#Db.find(Object.assign({"tourTime.departingTime" : departingTime}, rest, {capacity : {$gte : 1}}))
            
            if(tours.length == 0) throw new createHttpError.NotFound(tourMessages.NotFound);
            return tours;
        }
         tours = await this.#Db.find(filterObj);
        
        
        if(tours.length == 0) throw new createHttpError.NotFound(tourMessages.NotFound);
        return tours;
    }

    async deleteTour(tourID) {
        if(tourID){
            const tour = await this.#Db.findOneAndDelete({tourID});
            if(!tour) throw new createHttpError.NotFound(tourMessages.NotFound);
            return true 
        }
    }
}

module.exports = new TourService()