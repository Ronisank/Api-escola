const { Router } = require('express');
const alunoRoute = require('./aluno.route');
const cursoRoute = require('./curso.route');
const profeRoute = require('./professor.route');
const loginRoute = require('./login.route');

const routes = new Router();

routes.use('/', alunoRoute);
routes.use('/', cursoRoute);
routes.use('/', profeRoute);
routes.use('/', loginRoute);


module.exports = routes;
