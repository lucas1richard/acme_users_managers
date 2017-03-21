import $ from 'jquery';

import managersList from './ManagersList';
import usersList from './UsersList';

const state = {
  users: [],
  managers: []
};

// Singleton for UI testing
const runMocha = () => {
  let executed = false;
  return () => {
    if (!executed) {
      mocha.run();
      executed = true;
    }
  };
};

const mochaRun = runMocha();

const requestData = () => {
  $.get('/api/users')
    .then(users => {
      state.users = users;
    })
    .then(() => $.get('/api/managers'))
    .then(managers => {
      state.managers = managers;
      renderUserList();
      renderManagerList();
    })
    .then(() => {
      // Test the UI once
      if (mocha) mochaRun();
    });
};

// Too lazy to re-type this below
const putContent = { method: 'PUT', contentType: 'application/json' };

// I was debating whether or not to put changeManager and promoteOrDemote within renderUserList,
// decided to leave them out because webpack will wrap them out of globals, and they could be
// reused elsewhere if needed
const changeManager = (user, managerId) => {
  $.ajax(Object.assign(
      {}, putContent, { url: `api/users/${user.id}`, data: JSON.stringify({ managerId }) }
  ))
  .then(() => requestData());
};

const promoteOrDemote = (user) => {
  $.ajax(Object.assign(
    {}, putContent, { url: `api/users/${user.id}`, data: JSON.stringify({ promoteOrDemote: true }) }
  ))
  .then(() => requestData());
};

const renderUserList = () => {
  usersList({ containerId: '#users', users: state.users, managers: state.managers, changeManager, promoteOrDemote });
};

const renderManagerList = () => {
  managersList({ containerId: '#managers', managers: state.managers });
};

requestData();

