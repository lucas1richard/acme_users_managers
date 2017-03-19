const sequelize = require('./_conn');

const User = sequelize.import('./User');

User.belongsTo(User, { as: 'manager', foreignKey: 'manager_id' });
User.hasMany(User, { as: 'manages', foreignKey: 'manager_id' });

const seed = () => {
  sequelize.sync({ force: true })
    .then(() => User.bulkCreate([
      { name: 'Bob', manager_id: null, isManager: true },
      { name: 'Deborah', manager_id: 1, isManager: true },
      { name: 'Henry', manager_id: 1 },
      { name: 'Nancy', manager_id: 1 },
    ]));
};

module.exports = {
  seed,
  models: {
    User
  }
};
