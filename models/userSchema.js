import Joi from "joi";

//Schema som används av joiHandler vid regestrering av användare.
const userSchema = Joi.object({
    username: Joi.string()
        .alphanum().message("Endast bokstäver och siffror är tillåtna.")
        .min(3).message("Ditt användarnamn måste innehålla minst 3 tecken")
        .max(15).message("Ditt användarnamn får högst innehålla 15 tecken")
        .required(),
    password: Joi.string()
        .min(5).message("Ditt lösenord får minst vara 5 tecken långt.")
        .max(15).message("Ditt lösenord får högst vara 15 tecken långt.")
        .pattern(new RegExp('^(?=.*[A-Ö])(?=.*[0-9])')).message('Lösenorder måste innehålla minst en siffra och en stor bokstav.')
        .required(),
    email: Joi.string()
        .email().message("Du måste ange en giltig email-adress.")
        .required()
});

export default userSchema;