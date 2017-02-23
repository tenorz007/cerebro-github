'use strict';

const icon = require('GitHub-Mark-64px.png');

const plugin = ({term, display, actions}) => {
  display({
    title: 'It works!',
    icon,
    subtitle: `You entered ${term}`
  })
};

module.exports = {
  fn: plugin,
  icon
}
