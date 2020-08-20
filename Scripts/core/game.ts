/* Filename: game.ts
   Author's name: Anirudh Babu
   Student no.: 301105250
   File Description: Responsible for managing the game
*/
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let assets: createjs.LoadQueue;

    let die1Label: UIObjects.Label;
    let die2Label: UIObjects.Label;
    let rollButton: UIObjects.Button;
    let die1Image: Core.GameObject;
    let die2Image: Core.GameObject;
    let background: Core.GameObject;
    let timeElapsed: number;

    let assetManifest = 
    [
        {id:"1", src:"./Assets/images/1.png"},
        {id:"2", src:"./Assets/images/2.png"},
        {id:"3", src:"./Assets/images/3.png"},
        {id:"4", src:"./Assets/images/4.png"},
        {id:"5", src:"./Assets/images/5.png"},
        {id:"6", src:"./Assets/images/6.png"},
        {id:"backButton", src:"./Assets/images/startButton.png"},
        {id:"background", src:"./Assets/images/woodenBackground.jpg"},
        {id:"blank", src:"./Assets/images/blank.png"},
        {id:"button", src:"./Assets/images/button.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"rollButton", src:"./Assets/images/rollButton.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"startOverButton", src:"./Assets/images/startOverButton.png"},
        {id:"rollSound", src:"./Assets/sounds/Rolling-Dice-A1-www.fesliyanstudios.com.mp3"}
    ];

    /**
     * This function delays the loading of components until all assets have been loaded
     */
    function Preload():void
    {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);

        createjs.Sound.registerSound({id:"rollDie", src:"Assets/sounds/Rolling-Dice-A1-www.fesliyanstudios.com.mp3"});
        createjs.Sound.on("fileload", (event)=>{
            // A sound has been preloaded.
            console.log("Preloaded:");
        });    
        
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config

        Main();
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

        // display items initialization
        background = new Core.GameObject("background", 0, 0, false);
        stage.addChild(background);

        die1Label = new UIObjects.Label("1", "24px", "Consolas", "#FFFFFF", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 30, true);
        stage.addChild(die1Label);

        die2Label = new UIObjects.Label("2", "24px", "Consolas", "#FFFFFF", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 30, true);
        stage.addChild(die2Label);

        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 150, true);
        stage.addChild(rollButton);

        die1Image = new Core.GameObject("1", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y - 85, true);
        stage.addChild(die1Image);

        die2Image = new Core.GameObject("2", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y - 85, true);
        stage.addChild(die2Image);

        //Rolling and updating the dice images and label occurs here
        rollButton.on("click", ()=>{
            console.log("roll button clicked");
            createjs.Sound.play("rollDie");

            createjs.Ticker.framerate = Config.Game.FPS;
            timeElapsed = parseInt(createjs.Ticker.getTime().toString());
            createjs.Ticker.addEventListener('tick', Animate);        
        });        
    }
    function Animate(){
        let randomRollA1 = parseInt(Util.Mathf.RandomRange(1, 6).toString()).toString();
        let randomRollA2 = parseInt(Util.Mathf.RandomRange(1, 6).toString()).toString();

        //repeated removal and recreation gives an animation effect
        stage.removeChild(die1Image);
        die1Image = new Core.GameObject(randomRollA1, Config.Game.CENTER_X - 150, Config.Game.CENTER_Y - 85, true);
        stage.addChild(die1Image);

        stage.removeChild(die1Label);
        die1Label = new UIObjects.Label(randomRollA1, "24px", "Consolas", "#FFFFFF", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 30, true);
        console.log(randomRollA1);
        stage.addChild(die1Label);

        stage.removeChild(die2Image);
        die2Image = new Core.GameObject(randomRollA2, Config.Game.CENTER_X + 150, Config.Game.CENTER_Y - 85, true);
        stage.addChild(die2Image);

        stage.removeChild(die2Label);
        die2Label = new UIObjects.Label(randomRollA2, "24px", "Consolas", "#FFFFFF", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 30, true);
        console.log(randomRollA2);
        stage.addChild(die2Label);
    
        stage.update();

        //When Ticker has been running for approximate duration of the sound,
        // the event listener that invokes this function is removed
        if(createjs.Ticker.getTime() - timeElapsed >= 2800){
            
            createjs.Ticker.removeEventListener('tick', Animate);
        }
    }
    window.addEventListener('load', Preload);


})();