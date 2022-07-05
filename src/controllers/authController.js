import { authRepository } from "../repositories/authRepository.js";

export async function signUpController(req,res){
    try {
        const { name, email, password } = req.body;
        await authRepository.signUp(name, email, password)
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function signInController(req,res){
    try {
        const { email, password } = req.body;
        const token = await authRepository.signIn(email, password);
        res.send({
            token,
        });

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}