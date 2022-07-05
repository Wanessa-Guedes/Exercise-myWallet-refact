import { financialRepository } from "../repositories/financialRepository.js";

async function financialCount(id){
    const events = await financialRepository.getSumFinancial(id)
    
    const sum = events.reduce(
        (total, event) =>
            event.type === "INCOME" ? total + event.value : total - event.value,
        0
        );

        return sum;
}

const financialService = {
    financialCount
};

export default financialService;