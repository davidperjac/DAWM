const sequelize = require('../models/index').sequelize;
const initModels = require('../models/init-models');
const models = initModels(sequelize);

module.exports = models;
