var messages = [];

messages[0] = [
  { content: 'This is message for level 1!' },
  {
    content: 'This message should not display for level 1!',
    condition: function() { return false; },
    delay: 100
  },
  {
    content: 'This message SHOULD display for level 1!',
    condition: function() { return true; },
    delay: 200
  }
];
messages[1] = [
  { content: 'This is message for level 2!' },
  { content: 'This is another message for level 2!' }
];
