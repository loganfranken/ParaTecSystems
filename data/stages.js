var stages = [

  // 26 stages left to make
  // A stage w/ blocks going one direction on one side and going the other direction on the other
  // A stage w/ blocks on one side and connect nodes on the other
  // A stage w/ evenly spaced blocks across the entire playing field

  // Day 1 (Basic mechanics w/o reverse)
  [
    /* Stage 0 */ 'S(10,25);E(90,25);B(40,0,5,40);B(60,60,5,40)',
    /* Stage 0 */ 'S(10,25);E(90,25)',
    /* Stage 1 */ 'S(90,15);E(10,35)',
    /* Stage 2 */ 'S(10,35);E(90,15);C(50,25)',
    /* Stage 3 */ 'S(10,25);E(90,25);C(35,10);C(65,40)',
    /* Stage 4 */ 'S(10,25);E(90,25);C(25,40);C(75,10);B(45,10,10,30)',
    /* Stage 5 */ 'S(10,25);E(90,25);B(45,0,5,40);B(55,10,5,40)',
    /* Stage 6 */ 'S(45,25);E(55,25);B(10,0,20,40);B(70,10,20,40);C(5,5);C(95,45)',
  ],

  // Day 2 (Introduce reverse mechanic, reply mechanic)
  [
    /* Stage 0 */ 'S(10,25);E(90,25)',
    /* Stage 1 */ 'S(10,25);E(10,75)',
    /* Stage 2 */ 'S(10,25);E(10,75);C(50,60)',
    /* Stage 3 */ 'S(10,25);E(10,75);C(25,15);C(75,85)',
    /* Stage 4 */ 'S(10,25);E(10,75);C(35,30);C(65,60)',
    /* Stage 5 */ 'S(10,25);E(10,75);C(35,30);C(65,60);C(50,80)',
    /* Stage 6 */ 'S(55,25);E(55,80);C(10,10);C(90,90);C(20,80);C(70,30)',
  ],

  // Day 3 (Introduce scoring)
  // Chance for reply
  [
    /* Stage 0 */ 'S(10,25);E(10,75)',
    /* Stage 1 */ 'S(10,25);E(10,75);C(30,10);C(30,90)',
    /* Stage 2 */ 'S(10,25);E(70,75);C(25,25);C(35,25);C(45,25);C(55,25);C(65,25)',
    /* Stage 3 */ 'S(10,25);E(90,25);B(40,0,5,40);B(60,60,5,40)',
    /* Stage 4 */ 'S(10,25);E(90,25);B(0,50,100,20);B(0,80,30,20);B(70,80,30,20);B(35,65,30,25)',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],

  // Day 4
  // Chance for reply
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],

  // Day 5
  // Results of reply
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]

];
