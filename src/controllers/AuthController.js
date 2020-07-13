import User from '../models/UserModel'

export default class AuthController {
    async login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const user = await User.query()
                            .where('username', username)
                            .where('password', password)

            if(user.length > 0) { 
                res.json(user[0]) 
            } else {
                res.sendStatus(403)
            }
        } catch(err) {
            res.sendStatus(400)
        }
    }
}


