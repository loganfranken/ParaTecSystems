var messages = [];

messages[0] = [];

/* Day 1, Stage 0 */
messages[0][0] = [
  { speaker: 'Otto', content: "Good morning! First day, right?", delay: 10 },
  { speaker: 'Otto', content: "I'm Otto, I'll be training you", delay: 30 },
  { speaker: 'Otto', content: "Let's get started", delay: 30 },
  { speaker: 'Otto', content: "Draw a line from the start node to the end node", delay: 30 }
];

/* Day 1, Stage 1 */
messages[0][1] = [
  { speaker: 'Otto', content: "Great! You're a natural" },
];

/* Day 1, Stage 2 */
messages[0][2] = [
  { speaker: 'Otto', content: "Make sure your line goes through any connecting nodes too" },
];

/* Day 1, Stage 4 */
messages[0][4] = [
  { speaker: 'Otto', content: "And watch out for the blocks" },
];

/* Day 1, Stage 6 */
messages[0][6] = [
  { speaker: 'Otto', content: "Last one for today, see you tomorrow" },
];

messages[1] = [];

/* Day 2, Stage 0 */
messages[1][0] = [
  { speaker: 'Otto', content: "Alright, big day for you" },
  { speaker: 'Otto', content: "We're turning on your bottom screen", delay: 20 },
];

/* Day 2, Stage 1 */
messages[1][1] = [
  { speaker: 'Otto', content: "Don't worry, you got this" },
];

/* Day 2, Stage 3 */
messages[1][3] = [
  { speaker: 'Otto', content: "How are you?" },
  { speaker: 'Otto', content: "Hold 'Reply' to respond", delay: 10 },
  { speaker: 'Otto', content: "(If you want)", delay: 10, awaitReply: true, replyDelay: 100, replyMessage: { speaker: 'You', content: "Doing just fine" } },
  { speaker: 'Otto', content: "Hey, glad to hear it", delay: 10, condition: function(game) { return game.repliedToLastMessage; } },
  { speaker: 'Otto', content: "Alright, I'll leave you to it", delay: 10, condition: function(game) { return !game.repliedToLastMessage; } },
];

/*
messages[1] = [
  { content: 'This is message for level 2!' },
  {
    content: 'This message only displays if you replied earlier!',
    condition: function(game) { return game.replyCount > 0; }
  }
];
*/
