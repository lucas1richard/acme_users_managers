module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    name: DataTypes.STRING,
    isManager: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
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
