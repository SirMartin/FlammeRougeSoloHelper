var FlammeRougeSolo;
(function (FlammeRougeSolo) {
    var Models;
    (function (Models) {
        class Team {
            constructor(name, colour, type) {
                this.play = () => {
                    if (this.type() == FlammeRougeSolo.Enums.TeamType.Muscle) {
                        this.sprinteurPlayedCard(this.sprinteurCards().pop().description);
                        this.roleurPlayedCard(this.roleurCards().pop().description);
                    }
                    else {
                        this.bothPlayedCard(this.bothCards().pop().description);
                    }
                };
                this.name = ko.observable(name);
                this.colour = ko.observable(colour);
                this.selectedColour = ko.observable(FlammeRougeSolo.Enums.Colour[colour]);
                this.type = ko.observable(type);
                this.selectedType = ko.observable(FlammeRougeSolo.Enums.TeamType[type]);
                this.sprinteurCards = ko.observableArray([]);
                this.roleurCards = ko.observableArray([]);
                this.bothCards = ko.observableArray([]);
                this.sprinteurPlayedCard = ko.observable("-");
                this.roleurPlayedCard = ko.observable("-");
                this.bothPlayedCard = ko.observable("-");
                this.isMuscleTeam = ko.observable(type === FlammeRougeSolo.Enums.TeamType.Muscle);
            }
        }
        Models.Team = Team;
    })(Models = FlammeRougeSolo.Models || (FlammeRougeSolo.Models = {}));
})(FlammeRougeSolo || (FlammeRougeSolo = {}));
