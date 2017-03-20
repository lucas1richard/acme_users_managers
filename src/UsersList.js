import $ from 'jquery';
import User from './User';

const usersList = ({ containerId, users, managers, changeManager, promoteOrDemote  }) => {
  const $container = $(containerId);
  $container.empty();
  users.forEach(user => $container.append(User({ user, managers, changeManager, promoteOrDemote })));
};

export default usersList;
