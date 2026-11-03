import * as jogoModel from "../models/jogosModel.js";
import { textoValido, inteiroPositivo } from "../utils/validacoes.js";

// GET /jogos
export function listar(req, res, next) {
    jogoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

// GET /jogos/:id
export function buscarPorId(req, res, next) {
    jogoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Jogo não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

// POST /jogos
export function criar(req, res, next) {
    const { titulo, ano_lancamento, estudio_id } = req.body ?? {};
    
    // Validações específicas dos jogos retiradas do seu código original
    if (!textoValido(titulo, 150) || !inteiroPositivo(ano_lancamento)
        || ano_lancamento > 9999 || !inteiroPositivo(estudio_id)) {
        return res.status(400).json({
            erro: "Informe titulo (até 150 caracteres), ano_lancamento de 1 a 9999 e estudio_id inteiro positivo"
        });
    }
    
    const dados = { titulo: titulo.trim(), ano_lancamento, estudio_id };

    jogoModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Jogo cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

// PUT /jogos/:id
export function atualizar(req, res, next) {
    const { titulo, ano_lancamento, estudio_id } = req.body ?? {};
    
    if (!textoValido(titulo, 150) || !inteiroPositivo(ano_lancamento)
        || ano_lancamento > 9999 || !inteiroPositivo(estudio_id)) {
        return res.status(400).json({
            erro: "Informe titulo (até 150 caracteres), ano_lancamento de 1 a 9999 e estudio_id inteiro positivo"
        });
    }
    
    const dados = { titulo: titulo.trim(), ano_lancamento, estudio_id };

    // Consulta didática para confirmar que o registro existe antes de editar
    jogoModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Jogo não encontrado" });
        }
        
        // Passa o ID da requisição e os novos dados para a atualização ocorrer perfeitamente
        jogoModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Jogo atualizado com sucesso" });
        });
    });
}

// DELETE /jogos/:id
export function excluir(req, res, next) {
    jogoModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Jogo não encontrado" });
        }
        return res.status(200).json({ mensagem: "Jogo excluído com sucesso" });
    });
}