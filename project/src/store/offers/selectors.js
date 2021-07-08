import {NameSpace} from '../root-reducer';

export const getCurrentCity = (state) => state[NameSpace.OFFERS].city;
export const getOffers = (state) => state[NameSpace.OFFERS].offers;
export const getHoverCardIndex = (state) => state[NameSpace.OFFERS].hoverCardIndex;
export const getLoadedStatus = (state) => state[NameSpace.OFFERS].isDataLoaded;
