const {Router} = require("express");
const Curso = require('../models/Curso');

const cursoRoute = new Router();

cursoRoute.get('/cursos', async (req, res) => {
    let params = {}

    if (req.query.nome) {
        params = { ...params, nome: req.query.nome }
    }
    if (req.query.duracao_horas) {
        params = { ...params, duracao_horas: req.query.duracao_horas }
    }
    const cursos = await Curso.findAll({ where: params })
    res.json(cursos);
});

cursoRoute.post('/cursos', async (req, res) => {
    try {
        const nome = req.body.nome;
        const duracao_horas = parseInt(req.body.duracao_horas);

        if (!nome) {
            return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
        }
        if (!(duracao_horas >= 40 && duracao_horas <= 700)) {
            return res.status(400).json({ messagem: 'Campo duracao_horas obrigatório entre 40 e 700 Hs.' });
        }
        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas
        });
        res.status(201).json({ messagem: 'Curso criado com sucesso!', curso: curso });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }

});

cursoRoute.put('/cursos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome;
        const duracao_horas = parseInt(req.body.duracao_horas);
        const curso = await Curso.findByPk(id);

        if (!curso) {
            return res.status(404).json({ messagem: 'Curso não encontrado!' });
        }
        if (!nome) {
            return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
        }
        if (!(duracao_horas >= 40 && duracao_horas <= 700)) {
            return res.status(400).json({ messagem: 'Campo duracao_horas obrigatório entre 40 e 700 Hs.' });
        }
        curso.update(req.body);
        await curso.save();
        res.status(200).json({ messagem: 'Curso atualizado com sucesso!', curso: curso });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

cursoRoute.delete('/cursos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ messagem: 'Curso não encontrado!' });
        }
        await curso.destroy({ where: { id: id } });
        res.status(204).json({ messagem: 'Curso deletado com sucesso!' });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

module.exports = cursoRoute;