import Presenter from './presenter/presenter.js';
import FiltersView from './view/filter-view.js';
import TripModel from './model/tripModel.js';
import { generateFilter } from './mocks/mock.js';
import { render } from './framework/render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripModel = new TripModel();

const filters = generateFilter(tripModel.points);
render(new FiltersView(filters), filtersContainer);

const container = document.querySelector('.trip-events');
const tripPresenter = new Presenter(container, tripModel);

tripPresenter.init();
