// just a placeholder for user controller

import User from '../models/UserModel'

export default class AuthController {
    // need create, edit, delete
    
    async create(req, res) {
        try {
            // const username = req.body.username;
            // const password = req.body.password;

            // const user = await User.query()
            //                 .where('username', username)
            //                 .where('password', password)

            // if(user.length > 0) { 
            //     res.json(user[0]) 
            // } else {
            //     res.sendStatus(403)
            // }
        } catch(err) {
            res.sendStatus(400)
        }
    }
    async edit(req, res) {
        try {
            // const username = req.body.username;
            // const password = req.body.password;

            // const user = await User.query()
            //                 .where('username', username)
            //                 .where('password', password)

            // if(user.length > 0) { 
            //     res.json(user[0]) 
            // } else {
            //     res.sendStatus(403)
            // }
        } catch(err) {
            res.sendStatus(400)
        }
    }
    async delete(req, res) {
        try {
            // const username = req.body.username;
            // const password = req.body.password;

            // const user = await User.query()
            //                 .where('username', username)
            //                 .where('password', password)

            // if(user.length > 0) { 
            //     res.json(user[0]) 
            // } else {
            //     res.sendStatus(403)
            // }
        } catch(err) {
            res.sendStatus(400)
        }
    }
}


