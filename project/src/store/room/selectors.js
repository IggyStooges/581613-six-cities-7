import {NameSpace} from '../root-reducer';

export const getCurrentRoom = (state) => state[NameSpace.ROOM].currentRoom;
export const getNearbyOffers = (state) => state[NameSpace.ROOM].nearbyOffers;
export const getComments = (state) => state[NameSpace.ROOM].comments;
export const getCommentsError = (state) => state[NameSpace.ROOM].error;
