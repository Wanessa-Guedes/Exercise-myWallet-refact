import { Router } from "express";

import { getFinancialEvents, postFinancialEvents, getFinancialEventsSum } from "../controllers/financialController.js";

const financialRouter = Router();

financialRouter.post("/financial-events", getFinancialEvents);

financialRouter.get("/financial-events", postFinancialEvents);

financialRouter.get("/financial-events/sum", getFinancialEventsSum);

export default financialRouter;