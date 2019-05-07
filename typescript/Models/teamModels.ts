module FlammeRougeSolo.Models {

    export class Team {
        name: KnockoutObservable<string>;
        colour: KnockoutObservable<Enums.Colour>;
        selectedColour: KnockoutComputed<string>;
        type: KnockoutObservable<Enums.TeamType>;
        selectedType: KnockoutObservable<string>;

        helmetUrl: KnockoutComputed<string>;

        sprinteurCards: KnockoutObservableArray<Card>;
        roleurCards: KnockoutObservableArray<Card>;
        bothCards: KnockoutObservableArray<Card>;

        sprinteurPlayedCard: KnockoutObservable<string>;
        roleurPlayedCard: KnockoutObservable<string>;
        bothPlayedCard: KnockoutObservable<string>;

        sprinteurCardLog: KnockoutObservable<string>;
        roleurCardLog: KnockoutObservable<string>;
        bothCardLog: KnockoutObservable<string>;

        isMuscleTeam: KnockoutObservable<boolean>;

        useExhaustionCards: KnockoutObservable<boolean>;

        constructor(name: string, colour: Enums.Colour, type: Enums.TeamType) {
            this.name = ko.observable(name);
            this.colour = ko.observable(colour);
            this.type = ko.observable(type);
            this.selectedType = ko.observable(Enums.TeamType[type]);

            this.sprinteurCards = ko.observableArray([]);
            this.roleurCards = ko.observableArray([]);
            this.bothCards = ko.observableArray([]);

            this.sprinteurPlayedCard = ko.observable("-");
            this.roleurPlayedCard = ko.observable("-");
            this.bothPlayedCard = ko.observable("-");

            this.sprinteurCardLog = ko.observable("");
            this.roleurCardLog = ko.observable("");
            this.bothCardLog = ko.observable("");

            this.isMuscleTeam = ko.observable(type === Enums.TeamType.Muscle);

            this.selectedColour = ko.computed(() => {
                return Enums.Colour[this.colour()];
            });

            this.helmetUrl = ko.computed(() => {
                return `content/helmet-${this.selectedColour().toLowerCase()}.png`;
            });
        }

        play = () => {
            if (this.type() == Enums.TeamType.Muscle) {
                var sprinteurCard = null;
                if (this.sprinteurCards().length === 0){
                    // Return exhaustion card.
                    sprinteurCard = Models.Card.exhaustionCard();
                }else{
                    sprinteurCard = this.sprinteurCards().pop();
                }
                this.sprinteurPlayedCard(sprinteurCard.description);
                this.sprinteurCardLog(this.addLogCard(this.sprinteurCardLog(), sprinteurCard.name));
                
                var roleurCard = null;
                if (this.roleurCards().length === 0){
                    // Return exhaustion card.
                    roleurCard = Models.Card.exhaustionCard();
                }else{
                    roleurCard = this.roleurCards().pop();
                }
                this.roleurPlayedCard(roleurCard.description);
                this.roleurCardLog(this.addLogCard(this.roleurCardLog(), roleurCard.name));
            } else {
                var bothCard = null;
                if (this.bothCards().length === 0){
                    // Return exhaustion card.
                    bothCard = Models.Card.exhaustionCard();
                }else{
                    bothCard = this.bothCards().pop();
                }
                this.bothPlayedCard(bothCard.description);
                this.bothCardLog(this.addLogCard(this.bothCardLog(), bothCard.name));
            }
        }

        addLogCard = (log: string, cardName: string): string => {
            if (log === "") {
                log = cardName;
            } else {
                log = log + ", " + cardName;
            }

            return log;
        }
    }
}