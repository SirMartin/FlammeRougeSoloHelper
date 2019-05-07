var FlammeRougeSolo;
(function (FlammeRougeSolo) {
    var Models;
    (function (Models) {
        class Team {
            constructor(name, colour, type) {
                this.play = () => {
                    if (this.type() == FlammeRougeSolo.Enums.TeamType.Muscle) {
                        var sprinteurCard = null;
                        if (this.sprinteurCards().length === 0) {
                            // Return exhaustion card.
                            sprinteurCard = new Models.Card("Exhaustion", "2", "2");
                        }
                        else {
                            sprinteurCard = this.sprinteurCards().pop();
                        }
                        this.sprinteurPlayedCard(sprinteurCard.description);
                        this.sprinteurCardLog(this.addLogCard(this.sprinteurCardLog(), sprinteurCard.name));
                        var roleurCard = null;
                        if (this.roleurCards().length === 0) {
                            // Return exhaustion card.
                            roleurCard = new Models.Card("Exhaustion", "2", "2");
                        }
                        else {
                            roleurCard = this.roleurCards().pop();
                        }
                        this.roleurPlayedCard(roleurCard.description);
                        this.roleurCardLog(this.addLogCard(this.roleurCardLog(), roleurCard.name));
                    }
                    else {
                        var bothCard = null;
                        if (this.bothCards().length === 0) {
                            // Return exhaustion card.
                            bothCard = new Models.Card("Exhaustion", "2", "2");
                        }
                        else {
                            bothCard = this.bothCards().pop();
                        }
                        this.bothPlayedCard(bothCard.description);
                        this.bothCardLog(this.addLogCard(this.bothCardLog(), bothCard.name));
                    }
                };
                this.addLogCard = (log, cardName) => {
                    if (log === "") {
                        log = cardName;
                    }
                    else {
                        log = log + ", " + cardName;
                    }
                    return log;
                };
                this.name = ko.observable(name);
                this.colour = ko.observable(colour);
                this.type = ko.observable(type);
                this.selectedType = ko.observable(FlammeRougeSolo.Enums.TeamType[type]);
                this.sprinteurCards = ko.observableArray([]);
                this.roleurCards = ko.observableArray([]);
                this.bothCards = ko.observableArray([]);
                this.sprinteurPlayedCard = ko.observable("-");
                this.roleurPlayedCard = ko.observable("-");
                this.bothPlayedCard = ko.observable("-");
                this.sprinteurCardLog = ko.observable("");
                this.roleurCardLog = ko.observable("");
                this.bothCardLog = ko.observable("");
                this.isMuscleTeam = ko.observable(type === FlammeRougeSolo.Enums.TeamType.Muscle);
                this.selectedColour = ko.computed(() => {
                    return FlammeRougeSolo.Enums.Colour[this.colour()];
                });
                this.helmetUrl = ko.computed(() => {
                    return `content/helmet-${this.selectedColour().toLowerCase()}.png`;
                });
            }
        }
        Models.Team = Team;
    })(Models = FlammeRougeSolo.Models || (FlammeRougeSolo.Models = {}));
})(FlammeRougeSolo || (FlammeRougeSolo = {}));
