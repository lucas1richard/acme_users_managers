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

      // I was struggling to decide whether the methods below should be classMethods or instanceMethods,
      // but as instanceMethods they seem to just add complexity by just changing the function names
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
          .then(user => user.goRogue());
      },
      promoteOrDemote(id) {
        return this.findOne({ where: { id } })
          .then(user => {
            return user.promoteOrDemote();
          });
      }
    },
    instanceMethods: {
      goRogue() {
        return this.setManager(null);
      },
      promoteOrDemote() {
        this.isManager = !this.isManager;
        return this.save()
          .then(() => {
            // This is not done in a hook because I don't want it to fire every time a User gets updated,
            // only when a user is demoted
            if (!this.isManager) {
              return sequelize.models.user.update({ manager_id: null }, { where: {manager_id: this.id} });
            }
            return this;
          });
      }
    }
  });
};
