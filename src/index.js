import $ from 'jquery';

import managersList from './ManagersList';
import usersList from './UsersList';

const state = {
  users: [],
  managers: []
};

let mochaRun = runMocha();

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
      if (mocha) mochaRun();
    });
};

const putContent = { method: 'PUT', contentType: 'application/json' };

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

function runMocha() {
  let executed = false;
  return () => {
    if (!executed) {
      mocha.run();
      executed = true;
    }
  };
}

