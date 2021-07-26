class Shape {
  // constructor -->  object setup
  constructor(position, rotation, hue, colors, scaling = 1) {
    // position = createVector(widht,height), rotation, hue = color
    this.position = position;
    this.rotation = rotation;
    this.hue = hue;
    this.colors = colors;
    this.scaling = scaling;
    this.cont = 0;
    this.ind = this.hue;
  }

  draw() {
    push();
    stroke(this.ind);
    strokeWeight(2);
    fill(this.hue);
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    scale(this.scaling, this.scaling);
    this.aspect();
    pop();
  }

  contains(mouse_X, mouse_Y) {    // selection
    if ((get(mouse_X,mouse_Y)[0] === this.colors.x) && (get(mouse_X,mouse_Y)[1] === this.colors.y) && ((get(mouse_X,mouse_Y)[2] === this.colors.z))) {
      return true;
    } else {
      return false;
    }
  }

  select(ind) {    // selection 'verification'
    if (ind === true) {
      this.cont += 1;
      this.ind = 0;
    }
    if ((this.cont != 1) && (ind === true)) {
      this.cont = 0;
      this.ind = this.hue;
    }
  }

  get indicador() {
    return this.ind;
  }

  set indicador(indicador){
    this.ind = indicador;
  }

  get scaling() {
    return this._scaling;
  }

  set scaling(scaling) {
    this._scaling = scaling;
  }

  get rotation() {
    return this._rotation;
  }

  set rotation(rotation) {
    this._rotation = rotation;
  }

  get position() {
    return this._position;
  }

  set position(position) {
    this.ind = 0;
    this._position = position;
  }

  get hue() {
    return this._hue;
  }

  set hue(hue) {
    this._hue = hue;
  }
}


class Quad extends Shape {
  constructor(position, rotation, hue, colors, edge, scaling = 1) {
    super(position, rotation, hue, colors, scaling);
    this.edge = edge;
    this.Yt = this.edge.x;
  }

  aspect() {  // define trapezoid and square
    if (this.edge.z < 0) { // square
      quad(this.edge.x, -this.edge.y, this.edge.y, this.edge.x, this.edge.x, this.edge.y, -this.edge.y, this.edge.x);
    } else {                // quad
      quad (-this.edge.y, this.Yt, -this.Yt, -this.edge.x, this.edge.y, -this.Yt, this.Yt, this.edge.x);
    }
  }

  reflect() {          // trapezoid reflect
    this.Yt = -this.Yt;
  }
}


class Triangle extends Shape {
  constructor(position, rotation, hue, colors, edge, scaling = 1) {
    super(position, rotation, hue, colors, scaling);
    this.edge = edge;
  }

  aspect() {    // define three size of triangles
    if ( this.edge.z === -1) {
      triangle (-this.edge.x, -this.edge.y, this.edge.x, 0, -this.edge.x, this.edge.y);
    }
    if (this.edge.z === 1) {
      triangle(this.edge.x, -this.edge.y, this.edge.x, this.edge.x, -this.edge.y, this.edge.x);
    }
    if (this.edge.z != -1 && this.edge.z != 1) {
      triangle(this.edge.x, -this.edge.y, this.edge.x, this.edge.y, -this.edge.z, 0);
    }
  }
}

var shapes = []; // shapes for the menu set up
var colors = []; // colors for random selection
let display = 'menu';
var poweto;
let levels = [];
let level = 0;
var roboto;
let song;

function preload(){
  levels[0] = loadImage('images/level1.png');
  levels[1] = loadImage('images/level2.png');
  levels[2] = loadImage('images/level3.png');
  levels[3] = loadImage('images/level4.png');
  levels[4] = loadImage('images/level5.png');
  levels[5] = loadImage('images/level6.png');
  song = loadSound("congrats.mp3");
  //roboto = loadFont('Roboto-Thin.ttf');
  //poweto = loadFont('Poweto.ttf');
}

function setup() {
  //new --> creates a new instance of the object
  var cc = createCanvas (windowWidth, windowHeight);
  cc.style('display', 'block');    // doesn't allow to scroll inside the page
  createCanvas(windowWidth,windowHeight);
  background (255);
  angleMode(DEGREES);
  playground = new Quad(createVector(windowWidth/2.5, windowHeight/2.6), 0,110,createVector(110,110,110), createVector(0, 70, -1),0.3); // selector for the playground set up
  level_s = new Quad(createVector(windowWidth/2.5, windowHeight/2.1), 0,50,createVector(50,50,50 ), createVector(0, 70, -1),0.3);    // selector for the levels set up
  menu = new Quad(createVector(windowWidth - 50, windowHeight -40),0,20,createVector(20,20,20),createVector(0, 70, -1),0.3);      // selector for the menu set up
  next_level = new Quad(createVector(windowWidth - 50, windowHeight - 100),0,60,createVector(60,60,60),createVector(0, 70, -1),0.3);  // next level button
  previous_level = new Quad(createVector(windowWidth - 50, windowHeight - 160),0,80,createVector(80,80,80),createVector(0, 70, -1),0.3); // previous level buttos
  colors = ['#D48385','#E8EE99','#DCAED6','#A699D1', '#99B9D1','#99D1CA','#99D1AA'];
  for (let i = 0; i < 30; i++) {    // random shapes define
    if (i < random(0, 50)) {
      shapes[i] = new  Quad(createVector(random(0, windowWidth), random(0, windowHeight)), random(0, 180),random(colors),0,createVector(0, random(0, 100), -1));
    } else {
      shapes[i] = new  Triangle(createVector(random(0, windowWidth), random(0, windowHeight)), random(0, 180),random(colors),0,createVector(35, 105, 1));
    }
  }

  squareT = new Quad(createVector(windowWidth/16, windowHeight/10), 45, '#D48385',createVector(212, 131, 133), createVector(0, 70, -1));
  quadT = new Quad(createVector(windowWidth/16, windowHeight/1.22), 90, '#E8EE99',createVector(232, 238,153), createVector(35, 105, 1));
  triangleB1 = new Triangle(createVector(windowWidth/6.2, windowHeight/1.9), 180, '#DCAED6',createVector(220, 174, 214), createVector(70, 140, -1));
  triangleB2 = new Triangle(createVector(windowWidth/12, windowHeight/2.4), 0, '#A699D1',createVector(166, 153, 209), createVector(70, 140, -1));
  triangleM2 = new Triangle(createVector(windowWidth/5, windowHeight/10), -90, '#99B9D1',createVector(153, 185, 209), createVector(35, 105, 1));
  triangleS1 = new Triangle(createVector(windowWidth/8, windowHeight/3.5), 0, '#99D1CA',createVector(153, 209, 202), createVector(40, 70, 30));
  triangleS2 = new Triangle(createVector(windowWidth/7, windowHeight/1.22), 45, '#99D1AA',createVector(153,209, 170), createVector(40, 70, 30));
}

function draw() {

  if (display === "menu") {    // menu set up
    for (var i = 0; i < shapes.length; i++) {
      shapes[i].draw();
    }
    fill(0);
    textSize(160);
    textAlign(CENTER);
    //textFont(poweto);
    text("TANGRAM", windowWidth/2, windowHeight/3.5);
    textSize(70);
    text("playground", playground.position.x + 170, playground.position.y + 10);
    text("levels", level_s.position.x + 100, level_s.position.y + 20);
    textSize(20);
    playground.draw();
    level_s.draw();
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(windowWidth/2,windowHeight - 160,windowWidth-450,300);
    fill(0);
    textSize(35);
    //textFont(roboto);
    text("Controls:", windowWidth/2, windowHeight - 275);
    textSize(25);
    text("To select game mode just pressed the black button beside it", windowWidth/2, windowHeight - 235);
    text(" To select any figure press them", windowWidth/2, windowHeight - 205);
    text("Used the following keys to rotate the figures while their selected: ", windowWidth/2, windowHeight - 175);
    text("Left arrow -> rotate left / Up arrow -> reflect trapezoid / Right arrow -> rotate right ", windowWidth/2, windowHeight - 145);
    text(" To translate just drag the circle", windowWidth/2, windowHeight - 115);
    text("Other functions:", windowWidth/2, windowHeight - 85);
    text("- to save your figure press p", windowWidth/2, windowHeight - 55);
    text("- to set the figures to their original position press s", windowWidth/2, windowHeight - 25);
  }

  if (display === "playground") {    // playground mode set up
    background (255);
    menu.draw();
    textSize(20);
    text("Return to menu", menu.position.x - 100, menu.position.y + 7);
    squareT.draw();
    quadT.draw();
    triangleB1.draw();
    triangleB2.draw();
    triangleM2.draw();
    triangleS1.draw();
    triangleS2.draw();
  }
  if (display === ' '){
    background(255);
    menu.draw();
    text("Return to menu", menu.position.x - 100, menu.position.y + 7);
    text("Congrats! press 'r' plis!",windowWidth/2,windowHeight/2);
  }

  if (display === "levels"){    // levels mode set up
    background (255);
    switch (level){
      case 0:
        image(levels[0],windowWidth/2.6,windowHeight/9);
        break;
      case 1:
        image(levels[1],windowWidth/2.3,windowHeight/10);
        break;
      case 2:
        image(levels[2],windowWidth/2.2,windowHeight/40);
        break;
      case 3:
        image(levels[3],windowWidth/2.6,windowHeight/5);
        break;
      case 4:
        image(levels[4],windowWidth/2.2,windowHeight/6);
        break;
      case 5:
        image(levels[5],windowWidth/2.6,windowHeight/5);
        break;
      case 6:
        noLoop();
        sound();
    }
    menu.draw();
    next_level.draw();
    previous_level.draw();
    textSize(20);
    text("Return to menu", menu.position.x - 100, menu.position.y + 7);
    text("Next level", next_level.position.x - 70, next_level.position.y + 7);
    text("Previous level", previous_level.position.x - 90, previous_level.position.y + 7);
    squareT.draw();
    quadT.draw();
    triangleB1.draw();
    triangleB2.draw();
    triangleM2.draw();
    triangleS1.draw();
    triangleS2.draw();
  }
}

function sound(){
  song.play();
  display = ' ';
  loop();
}

function setShapes(){        // set shape to their original position and color
  squareT.position = createVector(windowWidth/16, windowHeight/10);
  squareT.rotation = 45;
  squareT.indicador = '#D48385';
  quadT.position = createVector(windowWidth/16, windowHeight/1.22);
  quadT.rotation = 90;
  quadT.indicador =  '#E8EE99';
  triangleB1.position = createVector(windowWidth/6.2, windowHeight/1.9);
  triangleB1.rotation = 180;
  triangleB1.indicador = '#DCAED6' ;
  triangleB2.position = createVector(windowWidth/12, windowHeight/2.4);
  triangleB2.rotation = 0;
  triangleB2.indicador = '#A699D1';
  triangleM2.position = createVector(windowWidth/5, windowHeight/10);
  triangleM2.rotation = -90;
  triangleM2.indicador = '#99B9D1';
  triangleS1.position = createVector(windowWidth/8, windowHeight/3.5);
  triangleS1.rotation = 0;
  triangleS1.indicador = '#99D1CA';
  triangleS2.position = createVector(windowWidth/7, windowHeight/1.22);
  triangleS2.rotation = 45;
  triangleS2.indicador = '#99D1AA';
}

function mouseClicked(){
  if (next_level.contains(mouseX,mouseY)){  // levels selection
    if (level < 6){
      level += 1;
    }
    clear();
    setShapes();
  }
  if (previous_level.contains(mouseX,mouseY)){  // levels selection
    if (level > 0){
      level -= 1;
    }
    clear();
    setShapes();
  }
  if (menu.contains(mouseX,mouseY)){ // menu
    display = "menu";
    clear();
    setShapes();
  }
  if (playground.contains(mouseX,mouseY)){    // selection play mode playground
    clear();
    display = "playground";
    setShapes();
  }
  if (level_s.contains(mouseX,mouseY)){     // selection play mode playground
    clear();
    level = 0;
    display = "levels";
    setShapes();
  }

  // select squareT
  if ((squareT.contains(mouseX, mouseY)) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    squareT.select(squareT.contains(mouseX, mouseY));
  }
  // select quadT
  if ((quadT.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    quadT.select(quadT.contains(mouseX, mouseY));
  }
  // select triangleB1
  if ((triangleB1.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    triangleB1.select(triangleB1.contains(mouseX, mouseY));
  }
  // select triangleB2
  if ((triangleB2.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    triangleB2.select(triangleB2.contains(mouseX, mouseY));
  }
  // select triangleM2
  if ((triangleM2.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    triangleM2.select(triangleM2.contains(mouseX, mouseY));
  }
  // select triangleS1
  if ((triangleS1.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS2.indicador != 0)) {
    triangleS1.select(triangleS1.contains(mouseX, mouseY));
  }
  // select triangleS2
  if ((triangleS2.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0)) {
    triangleS2.select(triangleS2.contains(mouseX, mouseY));
  }
}

function mouseDragged() {    // dragged
  // drag squareT
  if ((squareT.contains(mouseX, mouseY)) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    squareT.position = createVector(mouseX, mouseY);
  }
  // drag quadT
  if ((quadT.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    quadT.position = createVector(mouseX, mouseY);
  }
  // drag triangleB1
  if ((triangleB1.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    triangleB1.position = createVector(mouseX, mouseY);
  }
  // drag triangleB2
  if ((triangleB2.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    triangleB2.position = createVector(mouseX, mouseY);
  }
  // drag triangleM2
  if ((triangleM2.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleS1.indicador != 0) && (triangleS2.indicador != 0)) {
    triangleM2.position = createVector(mouseX, mouseY);
  }
  // drag triangleS1
  if ((triangleS1.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS2.indicador != 0)) {
    triangleS1.position = createVector(mouseX, mouseY);
  }
  // drag triangleS2
  if ((triangleS2.contains(mouseX, mouseY)) && (squareT.indicador != 0) && (quadT.indicador != 0) && (triangleB1.indicador != 0) && (triangleB2.indicador != 0) && (triangleM2.indicador != 0) && (triangleS1.indicador != 0)) {
    triangleS2.position = createVector(mouseX, mouseY);
  }
}

function keyPressed() {     // rotation
  if ((keyCode === RIGHT_ARROW)) {    // rotation - right
    if (squareT.indicador === 0 ) {
      squareT.rotation += 5;
    }
    if (quadT.indicador === 0) {
      quadT.rotation += 5;
    }
    if (triangleB1.indicador === 0) {
      triangleB1.rotation += 5;
    }
    if (triangleB2.indicador === 0) {
      triangleB2.rotation += 5;
    }
    if (triangleS2.indicador === 0) {
      triangleS2.rotation += 5;
    }
    if (triangleS1.indicador === 0) {
      triangleS1.rotation += 5;
    }
    if (triangleM2.indicador === 0) {
      triangleM2.rotation += 5;
    }
  }
  if ((keyCode === LEFT_ARROW)) {      // rotation - left
    if (squareT.indicador === 0 ) {
      squareT.rotation -= 5;
    }
    if (quadT.indicador === 0) {
      quadT.rotation -= 5;
    }
    if (triangleB1.indicador === 0) {
      triangleB1.rotation -= 5;
    }
    if (triangleB2.indicador === 0) {
      triangleB2.rotation -= 5;
    }
    if (triangleS2.indicador === 0) {
      triangleS2.rotation -= 5;
    }
    if (triangleS1.indicador === 0) {
      triangleS1.rotation -= 5;
    }
    if (triangleM2.indicador === 0) {
      triangleM2.rotation -= 5;
    }
  }
  if (keyCode === UP_ARROW) {    // reflection for the trapezoid
    if (quadT.indicador === 0) {
      quadT.reflect();
    }
  }

  if (key === 'p' || key === 'P'){
    saveCanvas('TangramOOP.jpg');
  }

  if (key === 's' || key == 'S'){
    setShapes();
  }
}
