import {combineReducers} from 'redux';
import {room} from './room/room';
import {offers} from './offers/offers';
import {user} from './user/user';
import {favorites} from './favorites/favorites';

export const NameSpace = {
  ROOM: 'ROOM',
  OFFERS: 'OFFERS',
  USER: 'USER',
  FAVORITES: 'FAVORITES',
};

export default combineReducers({
  [NameSpace.ROOM]: room,
  [NameSpace.OFFERS]: offers,
  [NameSpace.USER]: user,
  [NameSpace.FAVORITES]: favorites,
});
