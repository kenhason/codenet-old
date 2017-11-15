var express = require('express')
var router = express.Router()
var UserController = require('../controllers/UserController')

router.get('/user', function(req, res, next) {
    UserController.find(req.query, function(err, results) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: err
            })
            return
        }
        res.json({
            confirmation: 'success',
            results: results
        })
    })
})

router.get('/user/:id', function(req, res, next) {
    var id = req.params.id

    UserController.findById(id, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: 'Not Found'
            })
            return
        }
        res.json({
            confirmation: 'success',
            result: result
        })
    })
})

router.get('/user/fid/:fid', function(req, res, next) {
    var fid = req.params.fid

    UserController.findByFid(fid, function(err, users) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: 'Not Found'
            })
            return
        }
        if (users.length == 0) {
            res.json({
                confirmation: 'fail',
                message: 'Not Found'
            })
            return
        }
        res.json({
            confirmation: 'success',
            result: users
        })
    })
})

router.post('/user', function(req, res, next) {
    UserController.create(req.body, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'fail', 
                message: err
            })
            return
        }
        res.json({
            confirmation: 'created',
            result: result
    
        })
    })
})

router.put('/user/:id', function(req, res, next) {
    var id = req.params.id
    UserController.update(id, req.body, function(err, user) {
        if (err) {
            res.json({
                confirmation: 'fail', 
                message: err
            })
            return
        }
        res.json({
            confirmation: 'updated',
            user: user
    
        })
    })
})

router.delete('/user/:id', function(req, res, next) {
    var id = req.params.id
    UserController.delete(id, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'fail', 
                message: err
            })
            return
        }
        res.json({
            confirmation: 'deleted',
            result: result
    
        })
    })
})

module.exports = router