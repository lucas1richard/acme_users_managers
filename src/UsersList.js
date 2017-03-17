import $ from 'jquery';
import User from './User';

const usersList = ({ containerId, users }) => {
  const $container = $(containerId);
  $container.empty();
  users.forEach(user => $container.append(User({ user })));
};

export default usersList;
