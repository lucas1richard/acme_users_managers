import $ from 'jquery';

export default ({ title, body }) => {
  const panel = $('<div class="panel panel-default"></div>');
  const heading = $('<div class="panel-heading"></div>');
  panel.title = $(`<h3 class="panel-title">${title || ''}</div>`);

  panel.body = $(`<div class="panel-body">${body || ''}</div>`);

  panel.append(heading);
  heading.append(panel.title);
  panel.append(panel.body);

  return panel;
};
