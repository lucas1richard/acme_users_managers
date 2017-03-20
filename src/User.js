import $ from 'jquery';
import panel from './construct/Panel';

const User = ({ user, managers, changeManager, promoteOrDemote  }) => {

  const elem = panel({ title: user.name });
  elem.body.append(promoteDemoteButton());
  elem.body.append('<div><label>Managed By</label></div>');
  elem.body.append(managerSelect());

  return elem;

  function promoteDemoteButton() {
    let $button;
    if (user.isManager) {
      $button = $('<button class="btn btn-danger">Demote from Manager</button>');
    } else {
      $button = $('<button class="btn btn-primary">Promote to Manager</button>');
    }
    $button.on('click', () => promoteOrDemote(user));
    return $button;
  }

  function managerSelect() {
    const $select = $('<select class="form-control"><option value=null>None</option></select>');
    const options = [];
    managers.forEach(manager => {
      if (user.manager && user.manager.id === manager.id) {
        options.push(`<option selected value=${manager.id}>${manager.name}</option>`);
      }
      else {
        options.push(`<option value=${manager.id}>${manager.name}</option>`);
      }
    });
    $select.append(options.join(''));
    $select.on('change', () => changeManager(user, $select.val()));
    return $select;
  }
};

export default User;
