var messages = [];

messages[0] = [
  { content: 'This is message for level 1!' },
  {
    content: 'This message is awaiting a reply',
    delay: 100,
    awaitReply: true
  },
  {
    content: 'This message SHOULD display for level 1!',
    delay: 200
  }
];

messages[1] = [
  { content: 'This is message for level 2!' },
  {
    content: 'This message only displays if you replied earlier!',
    condition: function(game) { return game.replyCount > 0; }
  }
];
