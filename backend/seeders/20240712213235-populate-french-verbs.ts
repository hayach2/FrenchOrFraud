'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      const filePath = path.join(__dirname, './verbs.txt');
      const data = fs.readFileSync(filePath, 'utf8');
      
      const verbs = data.split('\r\n').map(verb => ({ verb: verb, createdAt: new Date(), updatedAt: new Date() }));

      // Insert data into the FrenchVerbs table
      await queryInterface.bulkInsert('FrenchVerbs', verbs, {});

    } catch (error) {
      console.error('Validation errors:', error.errors);
    }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FrenchVerbs', null, {});
  }
};
