var FlammeRougeSolo;
(function (FlammeRougeSolo) {
    class Start {
        constructor() {
            const viewModel = new FlammeRougeSolo.Controllers.MainController();
            ko.applyBindings(viewModel);
        }
    }
    FlammeRougeSolo.Start = Start;
})(FlammeRougeSolo || (FlammeRougeSolo = {}));
