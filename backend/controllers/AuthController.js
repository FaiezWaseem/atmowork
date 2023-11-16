const UserModel = require('../models/UserModel')
const MemberShipModel = require('../models/MemberShipModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const stripe = require('stripe')(process.env.STRIPE_BK)
const { v4: uuidv4 } = require('uuid')


class AuthController {

    expiresIn30days = 2592000000;

    async register(req, res) {
        try {
            console.log(req.body)
            const isExist = await UserModel.findOne({ email: req?.body?.email });
            if (isExist) {
                res.json({ message: 'Email Already Exist', "success": false, })
            }
           
            const user = await UserModel.create(req.body);
            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            console.log(token)
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: 2592000000
            });
            res
                .status(201)
                .json({ message: "User signed in successfully", success: true, user });
        } catch (error) {
            res.status(404).json({ message: error.message, "success": false })
        }

    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.json({ message: 'All fields are required', success: false, })
            }
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.json({ message: 'Email Doesn`t Exists', success: false, })
            }
            const auth = await bcrypt.compare(password, user.password)
            if (!auth) {
                return res.json({ message: 'Incorrect password or email', success: false, })
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: 2592000000
            });
            res.status(201).json({ message: "User logged in successfully", success: true, user });
        } catch (error) {
            res.status(201).json({ message: "User login Failed " + error.message, success: false });
        }
    }
    async pay(req, res) {
        const plans = { 'Hobby': process.env.Hobby, 'Standard': process.env.Standard, 'Premium': process.env.Premium };
        const { plan, token, email } = req.body;
        console.log('pay wall requested')
        const vKey = uuidv4()
        return stripe.customers.create({
            email: token.email,
            source: token
        }).then(customer => {
            return stripe.charges.create({
                amount: plans[plan] * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email
            }, { idempotencyKey: vKey })
                .then(async (result) => {
                    console.log(result)
                    const start_date = new Date();
                    start_date.setMonth(start_date.getMonth() + 1);
                    const end_date = start_date;

                    const memberShip = await MemberShipModel.create({
                        start_date: new Date(),
                        end_date: end_date,
                        isPaid: result.paid,
                        amount: result.amount / 100,
                        plan: plan,
                        receipt_url: result.receipt_url,
                    })
                    const User = await UserModel.updateOne({ email: email }, {
                        $set: {
                            account_membership: plan,
                            membership_plan_id: memberShip._id
                        }
                    })

                    res.status(200).json({
                        status: result.status,
                        receipt_url: result.receipt_url,
                        paid: result.paid,
                        email: result.source.name,
                        amount: result.amount / 100,
                        User
                    })
                })
        }).catch(err => console.log(err))
    }
    async logOut(req, res) {
        try {
            res.clearCookie('token');
            res.json({ message: 'Logged Out', status: true })

        } catch (error) {
            res.json({ message: 'LogOut Failed', status: false })
        }
    }
}


module.exports = new AuthController()