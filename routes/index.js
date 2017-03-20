const router = require('express').Router();
const Users = require('../db').models.User;

router.get('/api/users', (req, res, next) => {
  Users.getEmployees().then(users => res.json(users));
});

router.get('/api/managers', (req, res, next) => {
  Users.getManagers().then(users => res.json(users));
});

router.put('/api/users/:id', (req, res, next) => {
  const id = req.params.id;

  // Change manager
  if (req.body.managerId && req.body.managerId !== 'null') {
    Users.changeManager(id, req.body.managerId)
      .then(() => res.send(`Manager Changed to ${req.body.managerId}`));
  }

  // Managed by no one
  if (req.body.managerId === 'null') {
    Users.goRogue(id).then(() => res.send(`Manager Changed to Null`));
  }

  // Promote or demote manager
  if (typeof req.body.promoteOrDemote === 'boolean') {
    Users.promoteOrDemote(id)
      .then(() => res.send('Manager'));
  }
});

module.exports = router;
