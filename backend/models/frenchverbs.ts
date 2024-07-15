import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const dbConfig = require(path.join(__dirname, '/../config/config.js'))[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
});

const FrenchVerbs = sequelize.define('FrenchVerbs', {
  verb: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  successes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

export default FrenchVerbs;
