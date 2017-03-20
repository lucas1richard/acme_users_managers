const { expect } = require('chai');
const db = require('../db');

describe('User model', () => {
  beforeEach(done => {
    db.seed()
      .then(() => done());
  });

  it('gets managers', done => {
    db.models.User.getManagers()
      .then(managers => {
        expect(managers.length).to.equal(2);
      })
      .then(done)
      .catch(done);
  });

  it('gets employees', done => {
    db.models.User.getEmployees()
      .then(employees => {
        expect(employees.length).to.equal(4);
      })
      .then(done)
      .catch(done);
  });

  it('removes a manager', done => {
    db.models.User.findOne({ where: { manager_id: {$ne: null}} })
      .then(employee => employee.goRogue())
      .then(employee => {
        expect(employee.manager_id).to.not.be.ok;
      })
      .then(done)
      .catch(done);
  });

  it('promotes an employee to a manager', done => {
    db.models.User.findOne({ where: { isManager: false } })
      .then(employee => employee.promoteOrDemote())
      .then(employee => {
        expect(employee.isManager).to.be.ok;
      })
      .then(done)
      .catch(done);
  });

  it('demotes a manager to an employee', done => {
    db.models.User.findOne({ where: { isManager: true } })
      .then(manager => manager.promoteOrDemote())
      .then(manager => {
        expect(manager.isManager).to.not.be.ok;
      })
      .then(done)
      .catch(done);
  });

});
