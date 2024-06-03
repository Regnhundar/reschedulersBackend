import { v4 } from "uuid";
import nedb from "nedb-promises";

const database = new nedb({ filename: "./data/users.db", autoload: true });

// @desc POST logga in användare
// @route /auth/login
export const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const authUser = await database.findOne({ username: username, password: password });

        if (authUser) {
            global.currentUser = authUser;
            res.status(200).json({ message: `Välkommen tillbaka ${username}!` })
        } else {
            const error = new Error("Antingen användarnamn eller lösenord är fel")
            error.status = 400
            throw (error);
        }
    } catch (error) {
        next(error);
    }

}

// @desc POST logga ut användaren.
// @route /auth/logout
export const logoutUser = (req, res, next) => {
    if (global.currentUser) {
        global.currentUser = null;
        res.status(200).json({ message: 'Lyckad utloggning' });
    } else {
        const error = new Error("Ingen användare inloggad!");
        error.status = 400;
        next(error)
    }

}

// @desc POST Registrera en ny användare.
// @route /auth/register
export const registerUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const user = await database.findOne({ username: username });
        const userMail = await database.findOne({ email: email });

        if (user) {
            const error = new Error(`Användarnamn upptaget. Prova ${username}1`)
            error.status = 409
            throw (error);
        }
        if (userMail) {
            const error = new Error(`Din email har redan registrerats av en användare.`)
            error.status = 409
            throw (error);
        }

        const newUser = {
            id: v4().slice(0, 8),
            username: username,
            password: password,
            email: email,
            orders: [],
            totalsum: 0
        }

        await database.insert(newUser);
        global.currentUser = newUser;

        const success = {
            success: true,
            message: `Välkommen till flocken ${username}!`,
            status: 201
        }

        return res.status(201).json(success);
    } catch (error) {
        next(error)
    }
}





export default database;