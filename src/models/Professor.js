const {connection} = require('../database/connection');
const {DataTypes} = require('sequelize');

const Professor = connection.define('professores', {
    nome: {
        type: DataTypes.STRING,
    },
    data_nascimento: {
        type: DataTypes.DATE,
    },
});
module.exports = Professor;