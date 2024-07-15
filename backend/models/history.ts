import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
const env = process.env.NODE_ENV || 'development';
const dbConfig = require(path.join(__dirname, '/../config/config.js'))[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
});

const History = sequelize.define('History', {
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'History'
});

export default History;
