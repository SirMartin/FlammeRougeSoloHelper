var FlammeRougeSolo;
(function (FlammeRougeSolo) {
    var Models;
    (function (Models) {
        class Card {
            constructor(name, description, value) {
                this.value = value;
                this.name = name;
                this.description = description;
            }
        }
        Card.exhaustionCard = () => {
            return new Models.Card("Exhaustion", "2", "2");
        };
        Models.Card = Card;
    })(Models = FlammeRougeSolo.Models || (FlammeRougeSolo.Models = {}));
})(FlammeRougeSolo || (FlammeRougeSolo = {}));
