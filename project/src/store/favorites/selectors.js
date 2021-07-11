import {NameSpace} from '../root-reducer';

export const getFavoritesOffers = (state) => state[NameSpace.FAVORITES].favoritesList;
