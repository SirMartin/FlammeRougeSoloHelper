var FlammeRougeSolo;
(function (FlammeRougeSolo) {
    var Controllers;
    (function (Controllers) {
        class MainController {
            constructor() {
                this.addMuscleTeam = () => {
                    // Add new muscle team.
                    const newColour = this.getUnusedColour();
                    this.botTeams.push(new FlammeRougeSolo.Models.Team(FlammeRougeSolo.Enums.Colour[newColour].toString(), newColour, FlammeRougeSolo.Enums.TeamType.Muscle));
                };
                this.addPelotonTeam = () => {
                    // Add new peloton team.
                    const newColour = this.getUnusedColour();
                    this.botTeams.push(new FlammeRougeSolo.Models.Team(FlammeRougeSolo.Enums.Colour[newColour].toString(), newColour, FlammeRougeSolo.Enums.TeamType.Peloton));
                };
                this.removeTeam = (team) => {
                    // Remove the latest one.
                    this.botTeams.remove(team);
                };
                this.getAvailableColours = (myColour = null) => {
                    let usedColours = _.map(this.botTeams(), (x) => {
                        return x.colour();
                    });
                    const colourArray = Object.keys(FlammeRougeSolo.Enums.Colour).filter(k => typeof FlammeRougeSolo.Enums.Colour[k] === "number");
                    let freeColours = [];
                    for (const c in colourArray) {
                        if (usedColours.indexOf(FlammeRougeSolo.Enums.Colour[FlammeRougeSolo.Enums.Colour[c]]) === -1) {
                            freeColours.push(FlammeRougeSolo.Enums.Colour[FlammeRougeSolo.Enums.Colour[c]]);
                        }
                    }
                    // Add my colour
                    if (myColour !== null) {
                        freeColours.push(FlammeRougeSolo.Enums.Colour[myColour]);
                    }
                    return freeColours;
                };
                this.getUnusedColour = () => {
                    const freeColours = this.getAvailableColours();
                    return freeColours[0];
                };
                this.getSelectColours = (myColour) => {
                    let colours = [];
                    const freeColours = this.getAvailableColours(myColour);
                    for (let i = 0; i < freeColours.length; i++) {
                        const c = freeColours[i];
                        colours.push(FlammeRougeSolo.Enums.Colour[c].toString());
                    }
                    return colours;
                };
                this.getSelectTeamTypes = () => {
                    let colours = [];
                    for (const c in Object.keys(FlammeRougeSolo.Enums.TeamType).filter(k => typeof FlammeRougeSolo.Enums.TeamType[k] === "number")) {
                        colours.push(FlammeRougeSolo.Enums.TeamType[c].toString());
                    }
                    return colours;
                };
                this.generateCard = (value, description, name, amount) => {
                    var cards = [];
                    for (var i = 0; i < amount - 1; i++) {
                        cards.push(new FlammeRougeSolo.Models.Card(name, description, value));
                    }
                    return cards;
                };
                this.createDeck = (deckType) => {
                    var deck = [];
                    switch (deckType) {
                        case FlammeRougeSolo.Enums.DeckType.MuscleSprinteur:
                            // Sprinteur deck
                            deck = deck.concat(this.generateCard("2", "Move 2 the sprinteur", "2", 3));
                            deck = deck.concat(this.generateCard("3", "Move 3 the sprinteur", "3", 3));
                            deck = deck.concat(this.generateCard("4", "Move 4 the sprinteur", "4", 3));
                            deck = deck.concat(this.generateCard("5", "Move 5 the sprinteur", "5", 3));
                            deck = deck.concat(this.generateCard("9", "Move 9 the sprinteur", "9", 3));
                            // Muscle card
                            deck = deck.concat(this.generateCard("2/9", "Move 5 the sprinteur", "Muscle", 1));
                            break;
                        case FlammeRougeSolo.Enums.DeckType.MuscleRouleur:
                            // Rouleur deck
                            deck = deck.concat(this.generateCard("3", "Move 3 the rouleur", "3", 3));
                            deck = deck.concat(this.generateCard("4", "Move 4 the rouleur", "4", 3));
                            deck = deck.concat(this.generateCard("5", "Move 5 the rouleur", "5", 3));
                            deck = deck.concat(this.generateCard("6", "Move 6 the rouleur", "6", 3));
                            deck = deck.concat(this.generateCard("7", "Move 7 the rouleur", "7", 3));
                            break;
                        case FlammeRougeSolo.Enums.DeckType.Peloton:
                            // Rouleur deck
                            deck = deck.concat(this.generateCard("3", "Move 3 both", "3", 3));
                            deck = deck = deck.concat(this.generateCard("4", "Move 4 both", "4", 3));
                            deck = deck.concat(this.generateCard("5", "Move 5 both", "5", 3));
                            deck = deck.concat(this.generateCard("6", "Move 6 both", "6", 3));
                            deck = deck.concat(this.generateCard("7", "Move 7 both", "7", 3));
                            // Attack cards
                            deck = deck.concat(this.generateCard("2/9", "Move the frontmost 2 and 9 the backmost", "Attack!", 2));
                            break;
                    }
                    return this.shuffle(deck);
                };
                this.startGame = () => {
                    this.isGameInitialized(true);
                    // Create the decks.
                    _.forEach(this.botTeams(), (team) => {
                        if (team.isMuscleTeam()) {
                            team.sprinteurCards(this.createDeck(FlammeRougeSolo.Enums.DeckType.MuscleSprinteur));
                            team.roleurCards(this.createDeck(FlammeRougeSolo.Enums.DeckType.MuscleRouleur));
                        }
                        else {
                            team.bothCards(this.createDeck(FlammeRougeSolo.Enums.DeckType.Peloton));
                        }
                    });
                };
                this.shuffle = (array) => {
                    var currentIndex = array.length, temporaryValue, randomIndex;
                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {
                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                };
                this.playCard = () => {
                    _.forEach(this.botTeams(), (team) => {
                        team.play();
                    });
                };
                this.isGameInitialized = ko.observable(false);
                this.botTeams = ko.observableArray();
                this.availableMuscleTeams = ko.computed(() => {
                    return this.botTeams().filter(x => x.isMuscleTeam()).length < 4;
                });
                this.availablePelotonTeams = ko.computed(() => {
                    return this.botTeams().filter(x => !x.isMuscleTeam()).length === 0;
                });
            }
        }
        Controllers.MainController = MainController;
    })(Controllers = FlammeRougeSolo.Controllers || (FlammeRougeSolo.Controllers = {}));
})(FlammeRougeSolo || (FlammeRougeSolo = {}));
