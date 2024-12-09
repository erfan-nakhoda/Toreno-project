const { Router } = require("express");
const tourController = require("./tour.controller");
const {UserCheckLoginGuard} = require("../../common/guards/UserGuard.guard");
const AdminCheckGuard = require("../../common/guards/AdmingGuard.guard");

const router = Router();

router.get("/get", tourController.getTours);
router.post('/create',AdminCheckGuard, tourController.createTours);
router.put('/update/:tourName',AdminCheckGuard, tourController.UpdateTours);
router.post('/buy/:tourID', UserCheckLoginGuard,tourController.BuyTours);
router.get("/filter", tourController.filterTours);
router.delete('/delete/:tourID',AdminCheckGuard, tourController.deleteTour);

module.exports = {
    TourRoutes : router
}