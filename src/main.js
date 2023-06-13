import Presenter from './presenter/presenter.js';
import FiltersView from './view/filter-view.js';
import TripModel from './model/tripModel.js';
import { render } from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
render(new FiltersView(), filtersContainer);

const tripModel = new TripModel();
const container = document.querySelector('.trip-events');
const tripPresenter = new Presenter(container, tripModel);

tripPresenter.init();
