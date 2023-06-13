import PointView from './view/route-list-view.js';
import RedactionView from './view/form-edit-view.js';
import CreationFormView from './view/form-create-view.js';
import SortingView from './view/sort-view.js';
import TripEventsView from './view/event-list-view.js';
import {render} from './render.js';

export default class Presenter {

  pointsList = new TripEventsView();

  constructor({container}) {
    this.container = container;
  }

  init() {

    render(new SortingView(), this.container);
    render(this.pointsList, this.container);
    render(new RedactionView(), this.pointsList.getElement());
    render(new CreationFormView(), this.pointsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointsList.getElement());
    }

  }

}
