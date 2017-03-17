import $ from 'jquery';

const User = ({ user }) => {
  let div = $(`<div class="panel panel-default"></div>`);
  let title = $(`<div class="panel-heading"><h3 class="panel-title">${user}</h3></div>`);
  let body = $(`<div class="panel-body"></div>`);

  div.append(title);
  div.append(body);

  return div;
};

export default User;
