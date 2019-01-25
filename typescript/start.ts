module FlammeRougeSolo {
    export class Start {
      constructor() {
        const viewModel = new Controllers.MainController();
        ko.applyBindings(viewModel);
      }
    }
  }