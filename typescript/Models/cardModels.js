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
        Models.Card = Card;
    })(Models = FlammeRougeSolo.Models || (FlammeRougeSolo.Models = {}));
})(FlammeRougeSolo || (FlammeRougeSolo = {}));
