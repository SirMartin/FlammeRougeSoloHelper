module FlammeRougeSolo.Models {

    export class Select {
        text: KnockoutObservable<string>;
        value: KnockoutObservable<number>;

        constructor(text: string, value: number) {
            this.text = ko.observable(text);
            this.value = ko.observable(value);
        }
    }
}