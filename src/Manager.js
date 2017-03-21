// This returns a panel with title and body attributes
import panel from './construct/Panel';

export default ({ manager }) => {
  const elem = panel({ title: manager.name, body: '<em>manages...</em><br/>', panelType: 'primary'});
  const employees = manager.manages.map(employee => employee.name).join(', ');
  elem.body.append(employees);

  return elem;
};
