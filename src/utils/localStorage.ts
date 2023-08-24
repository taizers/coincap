import { portfolioValue } from '../constants';
import { IPortfolio } from '../models/IPortfolio';

export const setPortfolio = (portfolio: IPortfolio[]) => {
  localStorage.setItem(portfolioValue, JSON.stringify(portfolio));
};

export const getPortfolio = () => {
  const portfolio = localStorage.getItem(portfolioValue);

  if (portfolio?.length) {
    return JSON.parse(portfolio);
  }

  return [];
};

export const clearPortfolio = () => {
  return localStorage.removeItem(portfolioValue);
};
