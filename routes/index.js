const router = require('express').Router();
const Users = require('../db').models.User;

router.get('/api/users', (req, res, next) => {
  Users.findAll({
    order: ['name'],
    include: { model: Users, as: 'manager' }
  })
  .then(users => {
    res.json(users);
  });
});

router.get('/api/managers', (req, res, next) => {
  Users.findAll({
    order: ['name'],
    where: { isManager: true },
    include: { model: Users, as: 'manages', attributes: ['name'] }
  })
  .then(users => {
    res.json(users);
  });
});

router.put('/api/users/:id', (req, res, next) => {
  const id = req.params.id;
  if (req.body.managerId && req.body.managerId !== 'null') {
    Promise.all([
      Users.findOne({ where: { id } }),
      Users.findOne({ where: { id: req.body.managerId * 1 } }),
    ])
    .then(twoUsers => {
      const [ user, manager ] = twoUsers;
      user.setManager(manager);
    })
    .then(res.send(`Manager Changed to ${req.body.managerId}`));
  }
  if (req.body.managerId === 'null') {
    Users.findOne({ where: { id } })
      .then(user => {
        user.manager_id = null;
        return user.save();
      })
      .then(res.send(`Manager Changed to Null`));
  }
  if (typeof req.body.isManager === 'boolean') {
    Users.findOne({ where: { id } })
      .then(user => {
        user.isManager = req.body.isManager;
        console.log(user);
        return user.save();
      })
      .then(() => res.send('Manager'));
  }
});

module.exports = router;
