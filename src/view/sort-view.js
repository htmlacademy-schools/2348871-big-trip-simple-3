import AbstractView from '../framework/view/abstract-view.js';
import { SortingType } from '../mocks/const.js';
import { capitalize } from '../util.js';

const createItemTemplate = (sort, status) => `
<div class="trip-sort__item  trip-sort__item--${sort}">
<input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${status}>
<label class="trip-sort__btn" for="sort-${sort}">${capitalize(sort)}</label>
</div>`;

const createSortingTemplate = (activeSort) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
	${createItemTemplate(SortingType.DAY, activeSort === SortingType.DAY ? 'checked' : '')}
  ${createItemTemplate(SortingType.EVENT, 'disabled')}
  ${createItemTemplate(SortingType.TIME, 'disabled')}
  ${createItemTemplate(SortingType.PRICE, activeSort === SortingType.PRICE ? 'checked' : '')}
  ${createItemTemplate(SortingType.OFFERS, 'disabled')}
  </form>`
);

export default class SortingView extends AbstractView {

  #activeSort = SortingType.DAY;

  get template() {
    return createSortingTemplate(this.#activeSort);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this.#activeSort = evt.target.outerText.toLowerCase();
    this._callback.sortTypeChange(evt.target.outerText.toLowerCase());
  };

}


