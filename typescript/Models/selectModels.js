var FlammeRougeSolo;
(function (FlammeRougeSolo) {
    var Models;
    (function (Models) {
        class Select {
            constructor(text, value) {
                this.text = ko.observable(text);
                this.value = ko.observable(value);
            }
        }
        Models.Select = Select;
    })(Models = FlammeRougeSolo.Models || (FlammeRougeSolo.Models = {}));
})(FlammeRougeSolo || (FlammeRougeSolo = {}));
