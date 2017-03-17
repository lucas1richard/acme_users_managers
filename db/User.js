module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    name: DataTypes.STRING
  },
  {
    classMethods: {
      getManagersEmployees() {
        return this.findAll({
          include: [
            { model: this, as: 'employee' }
          ]
        });
      },
      getEmployeesManagers() {
        return this.findAll({
          include: [
            { model: this, as: 'manager' }
          ]
        });
      }
    }
  });
};
