import $ from 'jquery';
import User from './User';

export default ({ containerId, users, managers, changeManager, promoteOrDemote  }) => {
  const $container = $(containerId);
  $container.empty();
  users.forEach(user => $container.append(User({ user, managers, changeManager, promoteOrDemote })));
};
