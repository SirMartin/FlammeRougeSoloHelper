module FlammeRougeSolo.Controllers {
    export class MainController {
        availableMuscleTeams: KnockoutComputed<boolean>;
        availablePelotonTeams: KnockoutComputed<boolean>;
        noMoreCards: KnockoutComputed<boolean>;

        turnNumber: KnockoutObservable<number>;

        botTeams: KnockoutObservableArray<Models.Team>;

        isGameInitialized: KnockoutObservable<boolean>;
        isFirstCardPlayed: KnockoutObservable<boolean>;
        isGameFinished: KnockoutObservable<boolean>;

        haveTeams: KnockoutComputed<boolean>;


        constructor() {
            this.isGameInitialized = ko.observable(false);
            this.botTeams = ko.observableArray();
            this.isFirstCardPlayed = ko.observable(false);
            this.isGameFinished = ko.observable(false);
            this.turnNumber = ko.observable(0);

            this.availableMuscleTeams = ko.computed(() => {
                return this.botTeams().filter(x => x.isMuscleTeam()).length < 4;
            });

            this.availablePelotonTeams = ko.computed(() => {
                return this.botTeams().filter(x => !x.isMuscleTeam()).length === 0;
            });

            this.haveTeams = ko.computed(() => {
                return this.botTeams().length > 0;
            });

            this.noMoreCards = ko.computed(() => {
                if (this.botTeams().length > 0) {
                    if (this.botTeams()[0].isMuscleTeam()) {
                        return this.botTeams()[0].roleurCards.length > 0;
                    } else {
                        return this.botTeams()[0].bothCards.length > 0;
                    }
                }
            });
        }

        addMuscleTeam = () => {
            // Add new muscle team.
            const newColour: Enums.Colour = this.getUnusedColour();
            this.botTeams.push(new Models.Team(Enums.Colour[newColour].toString(), newColour, Enums.TeamType.Muscle));
        }

        addPelotonTeam = () => {
            // Add new peloton team.
            const newColour: Enums.Colour = this.getUnusedColour();
            this.botTeams.push(new Models.Team(Enums.Colour[newColour].toString(), newColour, Enums.TeamType.Peloton));
        }

        removeTeam = (team: Models.Team) => {
            // Remove the latest one.
            this.botTeams.remove(team);
        }

        getAvailableColours = (myColour = null): Enums.Colour[] => {
            let usedColours = _.map(this.botTeams(), (x: Models.Team) => {
                return x.colour();
            }) as Enums.Colour[];

            const colourArray = Object.keys(Enums.Colour).filter(k => typeof Enums.Colour[k as any] === "number");

            let freeColours = [];
            for (const c in colourArray) {
                if (usedColours.indexOf(Enums.Colour[Enums.Colour[c]]) === -1) {
                    freeColours.push(Enums.Colour[Enums.Colour[c]]);
                }
            }

            // Add my colour
            if (myColour !== null) {
                freeColours.push(Enums.Colour[myColour]);
            }

            return freeColours;
        }

        getUnusedColour = (): Enums.Colour => {
            const freeColours = this.getAvailableColours();
            return freeColours[0];
        }

        getSelectColours = (myColour) => {
            let colours = [];
            const freeColours = this.getAvailableColours(myColour);
            for (let i = 0; i < freeColours.length; i++) {
                const c = freeColours[i];
                colours.push(Enums.Colour[c].toString());
            }

            return colours;
        }

        getSelectTeamTypes = () => {
            let colours = [];
            for (const c in Object.keys(Enums.TeamType).filter(k => typeof Enums.TeamType[k as any] === "number")) {
                colours.push(Enums.TeamType[c].toString());
            }

            return colours;
        }

        generateCard = (value: string, description: string, name: string, amount: number): Models.Card[] => {
            var cards = [];
            for (var i = 0; i < amount - 1; i++) {
                cards.push(new Models.Card(name, description, value));
            }

            return cards;
        }

        createDeck = (deckType: Enums.DeckType): Models.Card[] => {
            var deck: Models.Card[] = [];
            switch (deckType) {
                case Enums.DeckType.MuscleSprinteur:
                    // Sprinteur deck
                    deck = deck.concat(this.generateCard("2", "Move 2 the sprinteur", "2", 3));
                    deck = deck.concat(this.generateCard("3", "Move 3 the sprinteur", "3", 3));
                    deck = deck.concat(this.generateCard("4", "Move 4 the sprinteur", "4", 3));
                    deck = deck.concat(this.generateCard("5", "Move 5 the sprinteur", "5", 3));
                    deck = deck.concat(this.generateCard("9", "Move 9 the sprinteur", "9", 3));
                    // Muscle card
                    deck = deck.concat(this.generateCard("2/9", "Move 5 the sprinteur", "Muscle", 1));
                    break;
                case Enums.DeckType.MuscleRouleur:
                    // Rouleur deck
                    deck = deck.concat(this.generateCard("3", "Move 3 the rouleur", "3", 3));
                    deck = deck.concat(this.generateCard("4", "Move 4 the rouleur", "4", 3));
                    deck = deck.concat(this.generateCard("5", "Move 5 the rouleur", "5", 3));
                    deck = deck.concat(this.generateCard("6", "Move 6 the rouleur", "6", 3));
                    deck = deck.concat(this.generateCard("7", "Move 7 the rouleur", "7", 3));
                    break;
                case Enums.DeckType.Peloton:
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
        }

        startGame = () => {
            this.isGameInitialized(true);

            // Create the decks.
            _.forEach(this.botTeams(), (team) => {
                if (team.isMuscleTeam()) {
                    team.sprinteurCards(this.createDeck(Enums.DeckType.MuscleSprinteur));
                    team.roleurCards(this.createDeck(Enums.DeckType.MuscleRouleur));
                } else {
                    team.bothCards(this.createDeck(Enums.DeckType.Peloton));
                }
            });
        }

        shuffle = (array: Models.Card[]) => {
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
        }

        playCard = () => {
            this.isFirstCardPlayed(true);

            this.turnNumber(this.turnNumber() + 1);

            _.forEach(this.botTeams(), (team) => {
                if (team.play()){
                    // If returns TRUE. Mark like the game is finished.
                    this.isGameFinished(true);
                }
            });
        }

        resetGame = () => {
            this.botTeams([]);
            this.isGameInitialized(false);
            this.isFirstCardPlayed(false);
            this.isGameFinished(false);
            this.turnNumber = ko.observable(0);
        }
    }
}