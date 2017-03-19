import $ from 'jquery';
import panel from './construct/Panel';

const User = ({ user, managers, changeManager, promoteToManager, demoteFromManager  }) => {

  const elem = panel({ title: user.name });
  if (user.manages) elem.body.append($(`<h4>Manager</h4>`));

  let button;
  if (managers.filter(manager => manager.id === user.id).length) {
    button = $('<button class="btn btn-danger">Demote from Manager</button>');
    button.on('click', () => {
      demoteFromManager(user);
    });
  } else {
    button = $('<button class="btn btn-primary">Promote to Manager</button>');
    button.on('click', () => {
      console.log(user);
      promoteToManager(user);
    });
  }

  elem.body.append(button);
  elem.body.append('<div><label>Managed By</label></div>');

  const select = $('<select class="form-control"><option value=null>None</option></select>');
  const options = [];

  managers.forEach(manager => {
    if (user.manager && user.manager.id === manager.id) {
      options.push(`<option selected value=${manager.id}>${manager.name}</option>`);
    }
    else {
      options.push(`<option value=${manager.id}>${manager.name}</option>`);
    }
  });
  select.append(options.join(''));
  select.on('change', () => changeManager(user, select.val()));
  elem.append(select);

  return elem;
};

export default User;
