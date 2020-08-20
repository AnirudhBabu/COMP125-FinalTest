"use strict";
/* Filename: game.ts
   Author's name: Anirudh Babu
   Student no.: 301105250
   File Description: Responsible for managing the game
*/
let Game = (function () {
    // variable declarations
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let die1Label;
    let die2Label;
    let rollButton;
    let die1Image;
    let die2Image;
    let assetManifest = [
        { id: "1", src: "./Assets/images/1.png" },
        { id: "2", src: "./Assets/images/2.png" },
        { id: "3", src: "./Assets/images/3.png" },
        { id: "4", src: "./Assets/images/4.png" },
        { id: "5", src: "./Assets/images/5.png" },
        { id: "6", src: "./Assets/images/6.png" },
        { id: "backButton", src: "./Assets/images/startButton.png" },
        { id: "background", src: "./Assets/images/background.png" },
        { id: "blank", src: "./Assets/images/blank.png" },
        { id: "button", src: "./Assets/images/button.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "rollButton", src: "./Assets/images/rollButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "startOverButton", src: "./Assets/images/startOverButton.png" }
    ];
    /**
     * This function delays the loading of components until all assets have been loaded
     */
    function Preload() {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
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
    function Update() {
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        // display items initialization
        die1Label = new UIObjects.Label("1", "24px", "Consolas", "#000000", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 30, true);
        stage.addChild(die1Label);
        die2Label = new UIObjects.Label("2", "24px", "Consolas", "#000000", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 30, true);
        stage.addChild(die2Label);
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 150, true);
        stage.addChild(rollButton);
        die1Image = new UIObjects.Button("1", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y - 85, true);
        stage.addChild(die1Image);
        die2Image = new UIObjects.Button("2", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y - 85, true);
        stage.addChild(die2Image);
        //disabling the mouseover event for the dice images by activating mouseout 
        //when mouseover occurs
        die1Image.on("mouseover", () => {
            let myOut = new Event("mouseout");
            die1Image.dispatchEvent(myOut);
        });
        die2Image.on("mouseover", () => {
            let myOut = new Event("mouseout");
            die2Image.dispatchEvent(myOut);
        });
        //Rolling and updating the dice images and label occurs here
        rollButton.on("click", () => {
            console.log("roll button clicked");
            //dice rolls
            let randomRoll1 = parseInt(Util.Mathf.RandomRange(1, 6).toString()).toString();
            let randomRoll2 = parseInt(Util.Mathf.RandomRange(1, 6).toString()).toString();
            //updating the stage
            stage.removeChild(die1Image);
            die1Image = new UIObjects.Button(randomRoll1, Config.Game.CENTER_X - 150, Config.Game.CENTER_Y - 85, true);
            stage.addChild(die1Image);
            stage.removeChild(die1Label);
            die1Label = new UIObjects.Label(randomRoll1, "24px", "Consolas", "#000000", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 30, true);
            stage.addChild(die1Label);
            stage.removeChild(die2Image);
            die2Image = new UIObjects.Button(randomRoll2, Config.Game.CENTER_X + 150, Config.Game.CENTER_Y - 85, true);
            stage.addChild(die2Image);
            stage.removeChild(die2Label);
            die2Label = new UIObjects.Label(randomRoll2, "24px", "Consolas", "#000000", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 30, true);
            stage.addChild(die2Label);
        });
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map