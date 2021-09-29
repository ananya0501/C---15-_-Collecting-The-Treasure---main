// creating the variables

var path, pathImg;
var boy,boyImg;
var cash, cashImg, cash_Group;
var diamonds, diamondsImg, diamonds_Group;
var jewelry, jewelryImg, jewelry_Group;
var sword, swordImg, sword_group;
var edges;
var gameOver, gameOverImg;
var treasureCollection = 0;

// Game States

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  // loading the animation for boy & images for path, cash, diamond, jewelry, sword & game over.
  
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  pathImg = loadImage("Road.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup()
{
  // creating the canvas
  createCanvas(400,600);

  // making the edge sprites
  edges = createEdgeSprites();

  // creating the path sprite
  path = createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;

  // creating the boy sprite
  boy = createSprite(70,580,20,20);
  boy.addAnimation("Running",boyImg);
  boy.scale=0.15;
  boy.debug=false;
  boy.setCollider('circle',0,0,700);
 
  // creating the game over sprite
  gameOver = createSprite(200,300,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;

  // creating the cash, diamonds, jewelry & sword groups

  cash_Group = new Group();
  diamonds_Group = new Group();
  jewelry_Group = new Group();
  sword_Group = new Group();
}

function draw() 
{
  // making the play and end game states

  if(gameState === PLAY)
  {
    // making the boy move
    boy.x = World.mouseX;
  
    // colliding the boy with the edges
    boy.collide(edges);
  
    // resetting the path
    if(path.y > 400 )
    {
      path.y = height/2;
    }
  
    // calling the functions for cash, diamonds, jewelry & sword

    createCash();
    createDiamonds();
    createjewelry();
    createSword();

    // destroying the cash, diamonds & jewelry groups and increasing the score when the boy touches them

    if (cash_Group.isTouching(boy)) 
    {
      cash_Group.destroyEach();
      treasureCollection = treasureCollection+50;
    }

    else if (diamonds_Group.isTouching(boy))
    {
      diamonds_Group.destroyEach();
      treasureCollection = treasureCollection+100;
    }

    else if(jewelry_Group.isTouching(boy)) 
    {
      jewelry_Group.destroyEach();
      treasureCollection= treasureCollection + 150;
    }  

    else if(sword_Group.isTouching(boy)) 
    {
      gameState = END;
    }
  }  
      
  if(gameState === END)
  {
    //boy.addAnimation("SahilRunning",gameOver);
    //boy.x = 200;
    //boy.y = 300;
    //boy.scale = 0.15;
    
    //making the boy invisible
    boy.visible = false; 
    
    // making the velocity 0 for the path
    path.velocityY = 0;

    // letting the game over sprite visible
    gameOver.visible = true;
        
    // destroying the cash, diamonds, jewelry & sword groups once the game is over
        
    cash_Group.destroyEach();
    diamonds_Group.destroyEach();
    jewelry_Group.destroyEach();
    sword_Group.destroyEach();

        
    // setting the velocity 0 for cash, diamonds, jewelry & sword groups

    cash_Group.setVelocityYEach(0);
    diamonds_Group.setVelocityYEach(0);
    jewelry_Group.setVelocityYEach(0);
    sword_Group.setVelocityYEach(0);
  }
  
  drawSprites();

  // displaying the score
  textSize(20);
  fill("yellow");
  text("Treasure: "+ treasureCollection,10,30);
}


// creating the function for spawning treasures

function createCash()
{
  if (World.frameCount % 200 == 0) 
  {
    cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;

    // adding the sprite "cash" to the group
    cash_Group.add(cash);
  }
}

function createDiamonds() 
{
  if (World.frameCount % 320 == 0) 
  {
    diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;

    // adding the sprite "diamonds" to the group
    diamonds_Group.add(diamonds);
  }
}

function createjewelry() 
{
  if (World.frameCount % 410 == 0) 
  {
    jewelry = createSprite(Math.round(random(50, 350),40, 10, 10));
    jewelry.addImage(jewelryImg);
    jewelry.scale=0.13;
    jewelry.velocityY = 3;
    jewelry.lifetime = 150;

    // adding the sprite "jewelry" to the group
    jewelry_Group.add(jewelry);
  }
}

function createSword()
{
  if (World.frameCount % 530 == 0) 
  {
    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;

    // adding the sprite "sword" to the group
    sword_Group.add(sword);
  }
}