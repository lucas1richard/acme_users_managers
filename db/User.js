module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    name: DataTypes.STRING,
    isManager: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    classMethods: {
      getManagers() {
        return this.findAll({
          order: ['name'],
          where: { isManager: true },
          include: { model: this, as: 'manages', attributes: ['name'] }
        });
      },
      getEmployees() {
        return this.findAll({
          order: ['name'],
          include: { model: this, as: 'manager' }
        });
      },
      changeManager(id, managerId) {
        return Promise.all([
          this.findOne({ where: { id } }),
          this.findOne({ where: { id: managerId * 1 } }),
        ])
        .then(twoUsers => {
          const [ user, manager ] = twoUsers;
          return user.setManager(manager);
        });
      },
      goRogue(id) {
        return this.findOne({ where: { id } })
          .then(user => user.setManager(null));
      },
      promoteOrDemote(id, isMgr) {
        return this.findOne({ where: { id } })
          .then(user => {
            user.isManager = isMgr;
            return user.save();
          });
      }
    }
  });
};
