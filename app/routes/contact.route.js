const express = require("express");

const contacts = require("../controllers/contact.controller");

const router = express.Router();

router.route("/")
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.deleteAll)

router.route("/favorite")
    .get(contacts.findAllFavorite)

router.route("/:id")
    .get(contacts.findOne)
    .put(contacts.update)
    .delete(contacts.delete)

module.exports = router;

// {
//     "_id": "650ae0373407455baff6692c",
//     "address": "Soc Trang",
//     "email": "anhb2103533@student.ctu.edu.vn",
//     "name": "Huynh Anh Pham",
//     "phone": "0334683000",
//     "favorite": true
// }