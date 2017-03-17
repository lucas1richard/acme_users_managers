const sequelize = require('./_conn');

const User = sequelize.import('./User');

User.belongsTo(User, { as: 'manager', foreignKey: 'manager_id' });
User.hasMany(User, { as: 'employee', foreignKey: 'manager_id' });

module.exports = sequelize;
