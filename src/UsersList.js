import $ from 'jquery';
import User from './User';

const usersList = ({ containerId, users, managers, changeManager, promoteToManager, demoteFromManager  }) => {
  const $container = $(containerId);
  $container.empty();
  users.forEach(user => $container.append(User({ user, managers, changeManager, promoteToManager, demoteFromManager })));
};

export default usersList;
