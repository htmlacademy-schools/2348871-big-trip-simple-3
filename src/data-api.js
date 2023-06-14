import dayjs from 'dayjs';
import {getRandomInt} from './util.js';


export const getDates = () => {
  const start = getRandomInt(1, 15);
  const end = getRandomInt(16, 31);
  return [dayjs().add(start, 'd'), dayjs().add(end, 'd')];
};

export const fullDate = (date) => date.format('YYYY-MM-DD HH:mm');

export const getTime = (date) => date.format('HH:mm');

export const getWithoutTime = (date) => date.format('YYYY-MM-DD');

export const shortDate = (date) => date.format('MMM D');

export const isPassed = (date) => date.isBefore(dayjs(), 'D') || date.isSame(dayjs(), 'D');
