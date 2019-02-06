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

        isMuscleTeam: KnockoutObservable<boolean>;

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
            
            this.isMuscleTeam = ko.observable(type === Enums.TeamType.Muscle);

            this.selectedColour = ko.computed(() => {
                return Enums.Colour[this.colour()];
            });

            this.helmetUrl = ko.computed(() => {
                return `content/helmet-${this.selectedColour().toLowerCase()}.png`;
            });
        }

        play = () : boolean => {
            if (this.type() == Enums.TeamType.Muscle) {
                this.sprinteurPlayedCard(this.sprinteurCards().pop().description);
                this.roleurPlayedCard(this.roleurCards().pop().description);

                return this.roleurCards().length === 0;
            } else {
                this.bothPlayedCard(this.bothCards().pop().description);

                return this.bothCards().length === 0;
            }
        }
    }
}