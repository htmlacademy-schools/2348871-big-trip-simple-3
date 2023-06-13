import { generatePoint } from '../mocks/mock.js';

export default class TripModel {

  points = Array.from({length: 5}, generatePoint);

  getPoints = () => this.points;

}
