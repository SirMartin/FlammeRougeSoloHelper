
module FlammeRougeSolo.Models {

    export class Card {
        value: string;
        name: string;
        description: string;

        constructor(name: string, description: string, value: string)
        {
            this.value = value;
            this.name = name;
            this.description = description;
        }

        public static exhaustionCard = () : Card => {
            return new Models.Card("Exhaustion", "2", "2");
        }
    }
}