const express = require('express')
const router = express.Router()

const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')

// Aquí los endpoints

//Crear
router.get("/new", (req, res, next) => {
    Park.find({})
        .then(parks => res.render("coasters/new-coaster", {
            parks
        }))
        .catch(err => {
            console.log("Hubo un error, ya no se que poner", err)
        });
});

router.post("/new", (req, res, next) => {

    const {
        name,
        description,
        inversions,
        length,
        active,
        park
    } = req.body

    Coaster.create({
            name,
            description,
            inversions,
            length,
            active,
            park,
        })
        .then(() => res.redirect("/coasters/new"))
        .catch(err => {
            console.log("Hubo un fallo creando newCoaster", err)
        });
})

router.get("/", (req, res, next) => {
    Coaster.find({}).populate("park")
        .then(coasters => res.render("coasters/coasters-index", {
            coasters
        }))
        .catch(err => {
            console.log("Hubo un erroooooor", err)
        });
});

router.get("/:id", (req, res, next) => {
    Coaster.findById(req.params.id).populate("park")
        .then(coaster => {
            res.render("coasters/coaster-details", {
                coaster
            })
        })
        .catch(err => console.log("hay un error en el listado", err))
});

module.exports = router