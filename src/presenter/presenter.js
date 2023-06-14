import PointView from '../view/route-list-view.js';
import RedactionView from '../view/form-edit-view.js';
import SortingView from '../view/sort-view.js';
import TripEventsView from '../view/event-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render} from '../framework/render.js';

export default class Presenter {

  #pointsList = new TripEventsView();

  constructor(container, tripModel) {
    this.container = container;
    this.tripModel = tripModel;
  }

  init() {

    this.routePoints = this.tripModel.points;


    if (this.routePoints.length === 0) {
      render(new EmptyListView(), this.container);
    } else {
      render(new SortingView(), this.container);
      render(this.#pointsList, this.container);
      for (let i = 0; i < this.routePoints.length; i++) {
        this.#renderPoint(this.routePoints[i]);
      }
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView(point);
    const editPointComponent = new RedactionView(point);

    const replacePointWithForm = () => {
      this.#pointsList.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormWithPoint = () => {
      this.#pointsList.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const closeFormOnEscape = (evt) => {
      if(evt.keyCode === 27) {
        evt.preventDefault();
        replaceFormWithPoint();
        document.removeEventListener('keydown', closeFormOnEscape());
      }
    };

    pointComponent.setClickHandler (() => {
      replacePointWithForm();
      document.addEventListener('keydown', closeFormOnEscape);
    });

    editPointComponent.setSubmitHandler(() => {
      replaceFormWithPoint();
      document.removeEventListener('keydown', closeFormOnEscape);
    });

    editPointComponent.setClickHandler(() => {
      replaceFormWithPoint();
      document.removeEventListener('keydown', closeFormOnEscape);
    });

    render(pointComponent, this.#pointsList.element);
  }

}
