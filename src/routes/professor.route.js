const { Router } = require('express');
const Professor = require('../models/Professor');

const profeRoute = new Router();    

profeRoute.get('/professores', async (req, res) => {
    const params = {}
    if (req.query.nome) {
        params = { ...params, nome: req.query.nome }
    }
    const professores = await Professor.findAll({ where: params })
    res.status(200).json({ professores });
});

profeRoute.post('/professores', async (req, res) => {
    try {
        const { nome, data_nascimento } = req.body;
        if (!nome) {
            return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
        }
        if (!data_nascimento) {
            return res.status(400).json({ messagem: 'Campo data_nascimento obrigatório não preenchido!' });
        }
        const professor = await Professor.create({
            nome: nome,
            data_nascimento: data_nascimento
        });
        res.status(201).json({ messagem: 'Professor criado com sucesso!', professor: professor });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

profeRoute.put('/professores/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome;
        const data_nascimento = req.body.data_nascimento;
        const professor = await Professor.findByPk(id);

        if (!professor) {
            return res.status(404).json({ messagem: 'Professor não encontrado!' });
        }
        if (!nome) {
            return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
        }
        if (!data_nascimento) {
            return res.status(400).json({ messagem: 'Campo data_nascimento obrigatório não preenchido!' });
        }
        professor.update(req.body);
        await professor.save();
        res.status(200).json({ messagem: 'Professor atualizado com sucesso!', professor: professor });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

profeRoute.delete('/professores/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const professor = await Professor.findByPk(id);
        if (!professor) {
            return res.status(404).json({ messagem: 'Professor não encontrado!' });
        }
        await professor.destroy({ where: { id: id } });
        res.status(204).json({ messagem: 'Professor deletado com sucesso!' });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

module.exports = profeRoute;