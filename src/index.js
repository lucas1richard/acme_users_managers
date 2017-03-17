import $ from 'jquery';

import managersList from './ManagersList';
import usersList from './UsersList';

$(document).ready(() => { // This seems like overkill when using defer, but shit happens, someone may be using a super outdated browser

  managersList({containerId: '#managers', managers: ['Bob', 'Darleen']});
  usersList({containerId: '#users', users: ['Bob', 'Darleen']});

});
