import { financialRepository } from "../repositories/financialRepository.js";
import { authentication } from "../utils/authenticationUtils.js";
import financialService from "../services/financialService.js";

export async function postFinancialEvents(req, res){
    try {
        const authorization = req.headers.authorization || "";

        const {token, user} = authentication(authorization);
    
        const { value, type } = req.body;
    
        if (!value || !type) {
            return res.sendStatus(422);
        }
    
        const financialTypes = ["INCOME", "OUTCOME"];
        if (!financialTypes.includes(type)) {
            return res.sendStatus(422);
        }
    
        if (value < 0) {
            return res.sendStatus(422);
        }
    
        await financialRepository.insertFinancial(user.id, value, type)
    
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getFinancialEvents(req, res){
    try {
        const authorization = req.headers.authorization || "";
        const {token, user} = authentication(authorization);
    
    const events = await financialRepository.getFinancial(user.id)
        res.send(events);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getFinancialEventsSum(req, res){
    try {
        const authorization = req.headers.authorization || "";
        const {token, user} = authentication(authorization);
    
        const sum = await financialService.financialCount(user.id);
    
        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}