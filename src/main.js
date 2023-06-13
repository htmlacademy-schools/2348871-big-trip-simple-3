import Presenter from './presenter.js';
import FiltersView from './view/filter-view.js';
import { render } from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
render(new FiltersView(), filtersContainer);

const container = document.querySelector('.trip-events');
const tripPresenter = new Presenter({container: container});

tripPresenter.init();
