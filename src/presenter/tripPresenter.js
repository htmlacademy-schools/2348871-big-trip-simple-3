import SortingView from '../view/sort-view.js';
import TripEventsView from '../view/event-list-view.js';
import {render, remove} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './pointPresenter.js';
import { sortByDay, sortByPrice, updateItem } from '../util.js';
import { SortingType } from '../mocks/const.js';

export default class Presenter {

  #pointsListComponent = new TripEventsView();
  #emptyListComponent = new EmptyListView();
  sortingComponent = new SortingView();
  #container = null;
  #tripModel = null;
  #pointsList = [];
  #pointPresenter = new Map();
  #currentSortType = SortingType.DAY;

  constructor(container, tripModel) {
    this.#container = container;
    this.#tripModel = tripModel;
  }

  init() {

    this.#pointsList = this.#tripModel.points;
    this.#renderPage();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderEmptyList() {
    render(new this.#emptyListComponent, this.#container);
  }

  #renderSort() {
    this.sortingComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.sortingComponent, this.#container);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortPoints = (sortType) => {
    switch(sortType) {
      case SortingType.DAY:
        this.#pointsList.sort(sortByDay);
        break;
      case SortingType.PRICE:
        this.#pointsList.sort(sortByPrice);
        break;
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#updateSortMarkup();
    this.#clearPointList();
    this.#renderList();
  };

  #updateSortMarkup = () => {
    remove(this.sortingComponent);
    this.#renderSort();
  };

  #renderList = () => {
    render(this.#pointsListComponent, this.#container);
    for (let i = 0; i < this.#pointsList.length; i++) {
      this.#renderPoint(this.#pointsList[i]);
    }
  };


  #renderPage() {
    if(this.#pointsList.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort(this.#currentSortType);
    this.#renderList();
  }

}
