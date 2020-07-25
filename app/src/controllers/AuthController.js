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
                if (error) {
                    console.error(error)
                    res.status(401).send(error)
                } else if (info) {
                    console.info(info.message)
                    res.status(403).send('Invalid credentials')
                } else if (user) {
                    req.logIn(user, (error) => {
                        const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET)
                        res.send({
                            auth: true,
                            token: token,
                            user: user,
                            message: 'User found and logged in'
                        }).status(200)
                    })
                } else {
                    res.status(403).send('Invalid credentials')
                }
            })(req, res)
        } catch (err) {
            console.error(err)
            res.sendStatus(400)
        }
    }
    
    async register(req, res) {
        try {
            const checkEmail = await User.query().where('email', req.body.email)
            if (checkEmail.length === 0) {
                const newUser = req.body
                const hashedPassword = await bcrypt.hash(newUser.password, BCRYPT_SALT_ROUNDS)
                newUser.password = hashedPassword
                // Capitalize fields
                newUser.first_name = this.capitalizeFirstLetter(newUser.first_name);
                newUser.last_name = this.capitalizeFirstLetter(newUser.last_name);

                const newUserAdded = await User.query().insert(newUser)
                // 201 created
                res.status(201).send({
                    userCreated: true,
                    message: "Success!"
                })
            }
            else {
                console.log("Email already registered")
                res.status(409).send("Email already registered")
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(400)
        }
    }
    
    async findUser(req, res) {
        try {
            passport.authenticate('jwt', { session: false }, (error, user, info) => {
                if (error) {
                    console.error(error)
                    res.status(401).send(error)
                }
                if (info) {
                    console.info(info.message)
                    res.status(401).send(info.message)
                }
                else {
                    // Found user, set values to return from db
                    user.auth = true
                    delete user.password
                    res.status(200).send(user)
                }
            })(req, res)
        } catch (err) {
            console.error(err)
            res.sendStatus(400)
        }
    }
    
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}


