import $ from 'jquery';
import panel from './construct/Panel';

const Manager = ({ manager }) => {
  const elem = panel({ title: manager.name, body: '<em>manages...</em><br/>'});
  const employees = manager.manages.map(employee => employee.name).join(', ');
  elem.body.append(employees);

  return elem;
};

export default Manager;
