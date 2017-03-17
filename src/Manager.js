import $ from 'jquery';
import panel from './construct/Panel';

const Manager = ({ manager }) => {
  const elem = panel({ title: manager, body: '<em>manages...</em><br/>'});

  return elem;
};

export default Manager;
