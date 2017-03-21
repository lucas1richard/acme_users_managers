import $ from 'jquery';

export default ({ title, body, panelType }) => {
  const panel = $(`<div class="panel panel-${panelType || 'default'}"></div>`);
  const heading = $('<div class="panel-heading"></div>');
  panel.title = $(`<h3 class="panel-title">${title || ''}</div>`);

  panel.body = $(`<div class="panel-body">${body || ''}</div>`);

  panel.append(heading);
  heading.append(panel.title);
  panel.append(panel.body);

  return panel;
};

// This maybe could have been done better with something like... panel.body = panel.filter('.panel-body')
// but I couldn't get it to work. My attempt is below, and panel.body and panel.title below returns an empty jQuery array

// export default ({ title, body, panelType }) => {
//   const panel = $(`
//     <div class="panel panel-${ panelType || 'default' }">
//       <div class="panel-heading">
//         <h3 class="panel-title">${ title || '' }</h3>
//       </div>
//       <div class="panel-body">
//         ${ body || '' }
//       </div>
//     </div>
//   `);

//   panel.title = panel.filter('.panel-title');
//   panel.body = panel.filter('.panel-body');
//   return panel;
// };
