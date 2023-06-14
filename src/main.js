import FilterFormView from './view/filter-view.js';
import TripPresenter from './presenter/tripPresenter.js';
import {render} from './framework/render.js';
import TripModel from './model/tripModel.js';
import { generateFilter } from './mocks/mock.js';

const tripEventsContainer = document.querySelector('.trip-events');
const filterFormContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new TripModel();
const tripPointsPresenter = new TripPresenter(tripEventsContainer, pointsModel);

const filters = generateFilter(pointsModel.points);

render(new FilterFormView(filters), filterFormContainer);
tripPointsPresenter.init();
