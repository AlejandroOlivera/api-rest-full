'use strict'

const User = require('../models/user')

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.save((err) => {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        return res.status(200).send({ message: 'El usuario a sido creado' })
    })

}

function signIn(req, res) {
    User.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: 'No existe el usuario' })

        req.user = user
        res.status(200).send({ message: 'Te has logueado correctamente' })
    })

}


module.exports = {
    signUp,
    signIn
}