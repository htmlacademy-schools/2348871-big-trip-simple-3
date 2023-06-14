import { generatePoints } from '../mocks/mock';

const POINT_COUNT = 3;

export default class TripModel {
  #points = [];

  constructor() {
    this.#points.push(...generatePoints(POINT_COUNT));
  }

  get points() {
    return this.#points;
  }
}
