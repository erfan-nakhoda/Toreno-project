const { Router } = require("express");
const adminController = require("./admin.controller");
const AdminCheckGuard = require('../../common/guards/AdmingGuard.guard');
const router = Router();
router.get('/get-transactions', AdminCheckGuard, adminController.getTransactions);
router.post('/filter-transaction', AdminCheckGuard,adminController.filterTransaction);
router.get('/get-users', AdminCheckGuard, adminController.getAllUsers);
router.post('/filter-users', AdminCheckGuard, adminController.filterUsers);
module.exports = {
    AdminRoutes : router
}