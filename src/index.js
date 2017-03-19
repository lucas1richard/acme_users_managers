import $ from 'jquery';

import managersList from './ManagersList';
import usersList from './UsersList';

const state = {
  users: [],
  managers: []
};

const changeManager = (user, managerId) => {
  $.ajax({
    url: `api/users/${user.id}`,
    data: JSON.stringify({ managerId }),
    method: 'PUT',
    contentType: 'application/json'
  })
  .then(data => console.log(data))
  .then(() => requestData());
};

const promoteToManager = (user) => {
  $.ajax({
    url: `api/users/${user.id}`,
    data: JSON.stringify({ isManager: true }),
    method: 'PUT',
    contentType: 'application/json'
  })
  .then(data => console.log(data))
  .then(() => requestData());
};

const demoteFromManager = (user) => {
  $.ajax({
    url: `api/users/${user.id}`,
    data: JSON.stringify({ isManager: false }),
    method: 'PUT',
    contentType: 'application/json'
  })
  .then(data => console.log(data))
  .then(() => requestData());
};

const renderUserList = () => {
  usersList({ containerId: '#users', users: state.users, managers: state.managers, changeManager, promoteToManager, demoteFromManager });
};
const renderManagerList = () => {
  managersList({ containerId: '#managers', managers: state.managers });
};

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
    });
};

requestData();
