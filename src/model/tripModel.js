import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class TripModel extends Observable {
  #points = [];
  #destinations = null;
  #offers = null;
  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#destinations = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;

      this.#points = points.map(this.#adaptToClient);
      this._notify(UpdateType.INIT);

    } catch(err) {
      this.#points = [];
      this.#destinations = null;
      this.#offers = null;
      this._notify(UpdateType.ERROR);

      throw new Error(err);
    }
  }

  get points () {
    return this.#points;
  }

  get destinations () {
    return this.#destinations;
  }

  get offers () {
    return this.#offers;
  }

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  };

  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  };
}
