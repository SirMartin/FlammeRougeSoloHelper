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
                this.selectColour = (col, team) => {
                    const colour = FlammeRougeSolo.Enums.Colour[col];
                    // Check for the team that has the new selected colour if exists.
                    var filteredTeams = _.filter(this.botTeams(), (x) => {
                        return x.colour() === colour;
                    });
                    if (filteredTeams.length > 0) {
                        var oldTeam = filteredTeams[0];
                        oldTeam.colour(team.colour());
                    }
                    // Assign the colour to the new selected.
                    team.colour(colour);
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
                    for (var i = 0; i < amount; i++) {
                        cards.push(new FlammeRougeSolo.Models.Card(name, description, value));
                    }
                    return cards;
                };
                this.createDeck = (deckType) => {
                    var deck = [];
                    switch (deckType) {
                        case FlammeRougeSolo.Enums.DeckType.MuscleSprinteur:
                            // Sprinteur deck
                            deck = deck.concat(this.generateCard("2", "2", "2", 3));
                            deck = deck.concat(this.generateCard("3", "3", "3", 3));
                            deck = deck.concat(this.generateCard("4", "4", "4", 3));
                            deck = deck.concat(this.generateCard("5", "5", "5", 3));
                            deck = deck.concat(this.generateCard("9", "9", "9", 3));
                            // Muscle card
                            deck = deck.concat(this.generateCard("5", "5", "Muscle", 1));
                            break;
                        case FlammeRougeSolo.Enums.DeckType.MuscleRouleur:
                            // Rouleur deck
                            deck = deck.concat(this.generateCard("3", "3", "3", 3));
                            deck = deck.concat(this.generateCard("4", "4", "4", 3));
                            deck = deck.concat(this.generateCard("5", "5", "5", 3));
                            deck = deck.concat(this.generateCard("6", "6", "6", 3));
                            deck = deck.concat(this.generateCard("7", "7", "7", 3));
                            break;
                        case FlammeRougeSolo.Enums.DeckType.Peloton:
                            // Rouleur deck
                            deck = deck.concat(this.generateCard("3", "3", "3", 3));
                            deck = deck.concat(this.generateCard("4", "4", "4", 3));
                            deck = deck.concat(this.generateCard("5", "5", "5", 3));
                            deck = deck.concat(this.generateCard("6", "6", "6", 3));
                            deck = deck.concat(this.generateCard("7", "7", "7", 3));
                            // Attack cards
                            deck = deck.concat(this.generateCard("2/9", "Frontmost 2 - Backmost 9", "Attack!", 2));
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
                    this.isFirstCardPlayed(true);
                    this.turnNumber(this.turnNumber() + 1);
                    _.forEach(this.botTeams(), (team) => {
                        team.play();
                    });
                };
                this.resetGame = () => {
                    this.botTeams([]);
                    this.isGameInitialized(false);
                    this.isFirstCardPlayed(false);
                    this.turnNumber = ko.observable(0);
                };
                this.replayGame = () => {
                    this.isGameInitialized(false);
                    this.isFirstCardPlayed(false);
                    this.turnNumber = ko.observable(0);
                    this.botTeams().forEach(bot => {
                        bot.reset();
                    });
                    this.startGame();
                };
                this.isGameInitialized = ko.observable(false);
                this.botTeams = ko.observableArray();
                this.isFirstCardPlayed = ko.observable(false);
                this.showCardLogs = ko.observable(false);
                this.turnNumber = ko.observable(0);
                this.availableMuscleTeams = ko.computed(() => {
                    return this.botTeams().length < 6;
                });
                this.availablePelotonTeams = ko.computed(() => {
                    return this.botTeams().length < 6;
                });
                this.haveTeams = ko.computed(() => {
                    return this.botTeams().length > 0;
                });
                this.noMoreCards = ko.computed(() => {
                    if (this.botTeams().length > 0) {
                        if (this.botTeams()[0].isMuscleTeam()) {
                            return this.botTeams()[0].roleurCards.length > 0;
                        }
                        else {
                            return this.botTeams()[0].bothCards.length > 0;
                        }
                    }
                });
            }
        }
        Controllers.MainController = MainController;
    })(Controllers = FlammeRougeSolo.Controllers || (FlammeRougeSolo.Controllers = {}));
})(FlammeRougeSolo || (FlammeRougeSolo = {}));
