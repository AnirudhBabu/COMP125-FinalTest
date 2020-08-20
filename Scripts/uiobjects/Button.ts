/* Filename: Button.ts
   Author's name: Anirudh Babu
   Student no.: 301105250
   File description: Serves as the bluePrint for a button as well as a die image 
   (with slight tweaks)
*/
module UIObjects
{
    export class Button extends Core.GameObject
    {
        // constructor
        constructor(asset_name:string = "button", x: number = 0, y: number= 0, isCentered:boolean = false)
        {
            super(asset_name, x, y, isCentered);

            this.on("mouseover", this.MouseOver);
            this.on("mouseout", this.MouseOut);

            this.Start();
        }
        
        
        // PUBLIC METHODS
        MouseOver():void
        {
            this.alpha = 0.7;
        }

        MouseOut():void
        {
            this.alpha = 1.0;
        }

        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            this.name = "Button";
        }

        public Update(): void {
            
        }

        public Reset(): void {
            
        }
    }
}