import PointView from '../view/route-list-view.js';
import RedactionView from '../view/form-edit-view.js';
import CreationFormView from '../view/form-create-view.js';
import SortingView from '../view/sort-view.js';
import TripEventsView from '../view/event-list-view.js';
import {render} from '../render.js';

export default class Presenter {

  pointsList = new TripEventsView();

  constructor(container, tripModel) {
    this.container = container;
    this.tripModel = tripModel;
  }

  init() {

    this.routePoints = this.tripModel.getPoints();

    render(new SortingView(), this.container);
    render(this.pointsList, this.container);
    render(new RedactionView(this.routePoints[0]), this.pointsList.getElement());
    render(new CreationFormView(this.routePoints[0]), this.pointsList.getElement());

    for (let i = 1; i < 5; i++) {
      render(new PointView(this.routePoints[i]), this.pointsList.getElement());
    }

  }

}
