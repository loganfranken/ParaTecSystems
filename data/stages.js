var stages = [

  // Day 1 (Basic mechanics w/o reverse)
  [
    /* Stage 0 */ 'S(10,25);E(90,25)',
    /* Stage 1 */ 'S(90,15);E(10,35)',
    /* Stage 2 */ 'S(10,35);E(90,15);C(50,25)',
    /* Stage 3 */ 'S(10,25);E(90,25);C(35,10);C(65,40)',
    /* Stage 4 */ 'S(10,25);E(90,25);C(25,40);C(75,10);B(45,10,10,30)',
    /* Stage 5 */ 'S(10,25);E(90,25);B(45,0,5,40);B(55,10,5,40)'
  ],

  // Day 2 (Introduce reverse mechanic, reply mechanic)
  [
    /* Stage 0 */ 'S(10,25);E(90,25)',
    /* Stage 1 */ 'S(10,25);E(10,75)',
    /* Stage 2 */ 'S(10,25);E(10,75);C(50,60)',
    /* Stage 3 */ 'S(10,25);E(10,75);C(25,15);C(75,85)',
    /* Stage 4 */ 'S(10,25);E(10,75);C(35,30);C(65,60)',
    /* Stage 5 */ 'S(10,25);E(10,75);C(35,30);C(65,60);C(50,80)'
  ],

  // Day 3 (Introduce scoring, chance for reply)
  [
    /* Stage 0 */ 'S(10,25);E(10,75)',
    /* Stage 1 */ 'S(10,25);E(10,75);C(30,10);C(30,90)',
    /* Stage 2 */ 'S(10,25);E(70,75);C(25,25);C(35,25);C(45,25);C(55,25);C(65,25)',
    /* Stage 3 */ 'S(10,25);E(90,25);B(30,60,40,25)',
    /* Stage 4 */ 'S(10,25);E(90,25);B(40,0,5,40);B(60,60,5,40)',
    /* Stage 5 */ 'S(10,25);E(90,25);B(0,50,100,20);B(0,80,30,20);B(70,80,30,20);B(35,65,30,25)',
  ],

  // Day 4 (Chance of reply)
  [
    /* Stage 0 */ 'S(10,25);E(90,85);C(90,40);C(90,60)',
    /* Stage 1 */ 'S(35,25);E(50,75);C(50,15);C(25,40);C(65,25);C(75,40);C(45,30);C(55,30)',
    /* Stage 2 */ 'S(10,25);E(90,25);B(30,0,5,30);B(65,20,5,30);B(55,70,15,10);B(30,70,15,10)',
    /* Stage 3 */ 'S(45,25);E(55,25);B(10,0,20,40);B(70,10,20,40);C(5,5);C(95,45)',
    /* Stage 4 */ 'S(55,25);E(55,80);C(10,10);C(90,90);C(20,80);C(70,30)',
    /* Stage 5 */ 'S(10,25);E(90,25);B(20,65,15,15);B(40,65,15,15);B(60,65,15,15);C(30,15);C(50,40);C(70,10)',
  ],

  // Day 5 (Results of the reply)
  [
    /* Stage 0 */ 'S(10,25);E(10,75)',
    /* Stage 1 */ 'S(10,25);E(90,25);C(50,25);B(25,65,10,20);B(65,65,10,20)',
    /* Stage 2 */ 'S(10,25);E(10,75);B(30,5,5,30);B(30,5,40,5);B(30,55,40,5);B(30,55,5,30);C(40,20);C(45,30);C(40,70);C(45,80)',
    /* Stage 3 */ 'S(90,15);E(90,75);B(70,0,5,20);B(70,30,5,20);B(35,50,5,10);B(35,70,5,30);B(50,0,5,35);B(50,45,5,5);B(55,50,5,40);B(75,50,5,20);B(75,80,5,20);B(30,0,5,10);B(30,20,5,30)',
    /* Stage 4 */ 'S(10,10);E(90,10);C(10,30);B(0,20,60,5);B(70,20,30,5);B(0,60,20,5);B(30,60,40,5);B(80,60,20,5);B(55,20,5,25)',
    /* Stage 5 */ 'S(10,15);E(10,35);C(10,75);B(25,0,10,15);B(25,20,10,10);B(25,35,10,15);B(40,0,10,15);B(40,20,10,10);B(40,35,10,15);B(55,0,10,15);B(55,20,10,10);B(55,35,10,15);B(70,0,10,15);B(70,20,10,10);B(70,35,10,15);B(65,70,10,15);B(50,55,10,15);B(25,70,20,15);'
  ]

];
