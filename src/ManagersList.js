import $ from 'jquery';
import Manager from './Manager.js';

const managersList = ({ containerId, managers }) => {
  const $container = $(containerId);
  $container.empty();
  managers.forEach(manager => $container.append(Manager({ manager })));

};

export default managersList;
