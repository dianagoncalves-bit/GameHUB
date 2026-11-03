import { Router } from "express";
import * as jogadoresController from "../controllers/jogadoresControllers.js"; 
import validarId from "../middleware/validarid.js";

const router = Router();


router.get("/jogadores", jogadoresController.listar);
router.get("/jogadores/:id", validarId, jogadoresController.buscarPorId);
router.post("/jogadores", jogadoresController.criar);
router.put("/jogadores/:id", validarId, jogadoresController.atualizar);
router.delete("/jogadores/:id", validarId, jogadoresController.excluir);

export default router;