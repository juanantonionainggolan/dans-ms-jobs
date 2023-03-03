import Users from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const Register = async (req,res) => {
    const {name, email, password, confPassword} = req.body;
    if (password !== confPassword) return response.status(400).json({ msg: "Password didn't match with Confirm Password"})
    const salt = await bcrypt.genSalt();
    const hashPassoword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            name, email, password:hashPassoword
        });

        res.json({ msg: "Successfully registered"})
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);

        if (!match) return res.status(400).json({ msg: "Wrong password"});

        const userId = user[0].id;
        const userName = user[0].name;
        const userEmail = user[0].email;
        const accessToken = jwt.sign({ userId, userName, userEmail}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s',
        })

        const refreshToken = jwt.sign({ userId, userName, userEmail}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        })

        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id:userId
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({ accessToken })
    } catch (error) {
        res.status(404).json({ msg: "Email not found" });
    }
}