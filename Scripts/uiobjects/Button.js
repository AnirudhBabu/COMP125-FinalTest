"use strict";
/* Filename: Button.ts
   Author's name: Anirudh Babu
   Student no.: 301105250
   File description: Serves as the bluePrint for a button as well as a die image
   (with slight tweaks)
*/
var UIObjects;
(function (UIObjects) {
    class Button extends Core.GameObject {
        // constructor
        constructor(asset_name = "button", x = 0, y = 0, isCentered = false) {
            super(asset_name, x, y, isCentered);
            this.on("mouseover", this.MouseOver);
            this.on("mouseout", this.MouseOut);
            this.Start();
        }
        // PUBLIC METHODS
        MouseOver() {
            this.alpha = 0.7;
        }
        MouseOut() {
            this.alpha = 1.0;
        }
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        Start() {
            this.name = "Button";
        }
        Update() {
        }
        Reset() {
        }
    }
    UIObjects.Button = Button;
})(UIObjects || (UIObjects = {}));
//# sourceMappingURL=Button.js.map