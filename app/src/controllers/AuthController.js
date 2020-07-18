import User from '../models/UserModel'
import passport from 'passport'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const BCRYPT_SALT_ROUNDS = 10

export default class AuthController {
    async login(req, res) {
        try {
            passport.authenticate('local', (error, user, info) => {
                console.log(error, user, info);
                if (error) {
                    console.log(error)
                }
                if (info) {
                    console.log(info.message)
                    res.status(401)
                    res.send(info.message)
                }
                if (user) {
                    req.logIn(user, (error) => {
                        const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET)
                        res.send({
                            auth: true,
                            token: token,
                            user: user,
                            message: 'User found and logged in'
                        }).status(200)
                    })
                }
            })(req, res)
        } catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    }

    async register(req, res) {
        try {
            console.log(req.body)
            const checkEmail = await User.query().where('email', req.body.email)
            if (checkEmail.length === 0) {
                const hashedPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
                const newUser = req.body
                newUser.password = hashedPassword

                const newUserAdded = await User.query().insert(newUser)
                // 201 created
                res.status(201).send({
                    userCreated: true,
                    message: "Success!"
                })
            }
            else {
                console.log("Email already registered")
                res.status(409).send({
                    userCreated: false,
                    message: "Email already registered"
                })
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    }

    async findUser(req, res) {
        try {
            passport.authenticate('jwt', { session: false }, (error, user, info) => {
                if (error) {
                    console.log(error)
                }
                if (info) {
                    console.log(info.message)
                    res.status(401);
                    res.send(info.message)
                }
                else {
                    // Found user, set values to return from db
                    user.auth = true
                    delete user.password
                    res.status(200).send(user)
                }
            })(req, res)
        } catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    }
}


