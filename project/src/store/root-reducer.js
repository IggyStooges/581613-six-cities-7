import {combineReducers} from 'redux';
import {room} from './room/room';
import {offers} from './offers/offers';
import {user} from './user/user';

export const NameSpace = {
  ROOM: 'ROOM',
  OFFERS: 'OFFERS',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.ROOM]: room,
  [NameSpace.OFFERS]: offers,
  [NameSpace.USER]: user,
});
