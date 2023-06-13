import { getRandomInt } from '../util.js';
import {TYPES, CITIES, getArrayFromType, DESCRIPTION} from './const.js';
import { getDates } from '../data-api.js';

let i = 0;
let pointId = 0;
const destinations = [];

const createDestination = () => {
  const res = {
    id: ++i,
    name: CITIES[getRandomInt(0, CITIES.length - 1)],
    description: DESCRIPTION[getRandomInt(0, DESCRIPTION.length - 1)],
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'placeholder'
      }
    ]
  };
  destinations.push(res);
  return res;
};

export const getDestById = (id) => destinations.find((dest) => dest.id === id);

export const generatePoint = () => {
  const pointType = TYPES[getRandomInt(1, TYPES.length - 1)];
  const dates = getDates();
  const offersForType = getArrayFromType(pointType);
  const dest = createDestination();
  return {
    id: ++pointId,
    type: pointType,
    destination: dest.id,
    dateFrom: dates[0],
    dateTo: dates[1],
    price: getRandomInt(1, 1500),
    offers: offersForType.slice(getRandomInt(0, offersForType.length - 1))
  };
};
