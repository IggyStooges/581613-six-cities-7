import MockAdapter from "axios-mock-adapter";
import { createAPI } from "../api";
import { ActionType } from "./action";
import {
  checkAuth,
  fetchOffers,
  fetchCurrentRoom,
  fetchNearbyOffers,
  fetchComments,
  login,
  logout,
  fetchfFavoritesOffers,
} from "./api-actions";
import { APIRoute, AppRoute, AuthorizationStatus } from "../const";

let api = null;

describe("Async operations", () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it("should make a correct API call to GET /login", () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, { avatar_url: "url", email: "login" });

    return checkAuthLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.USER,
        payload: { avatarUrl: "url", login: "login" },
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: AuthorizationStatus.AUTH,
      });
    });
  });

  it("should make a correct API call to POST /login", () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = { login: "email@email.ru", password: "123456" };
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, { avatar_url: "url", email: "login" });

    return loginLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.USER,
        payload: { avatarUrl: "url", login: "login" },
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: AuthorizationStatus.AUTH,
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.REDIRECT_TO_ROUTE,
        payload: AppRoute.MAIN,
      });
    });
  });

  it("should make a correct API call to DELETE /logout", () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    Storage.prototype.removeItem = jest.fn();

    apiMock.onDelete(APIRoute.LOGOUT).reply(204, [{ fake: true }]);

    return logoutLoader(
      dispatch,
      jest.fn(() => {}),
      api
    ).then(() => {
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).nthCalledWith(1, {
        type: ActionType.LOGOUT,
      });
    });
  });

  it("should make a correct API call to GET /offers", () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkFetchOffers = fetchOffers();
    const offers = [
      {
        bedrooms: 3,
        city: {
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10,
          },
          name: "Amsterdam",
        },
        description:
          "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
        goods: [
          "Heating",
          "Kitchen",
          "Cable TV",
          "Washing machine",
          "Coffee machine",
          "Dishwasher",
        ],
        host: {
          avatar_url: "img/1.png",
          id: 3,
          is_pro: true,
          name: "Angelina",
        },
        id: 1,
        images: ["img/1.png", "img/2.png"],
        is_favorite: false,
        is_premium: false,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
        max_adults: 4,
        preview_image: "img/1.png",
        price: 120,
        rating: 4.8,
        title: "Beautiful & luxurious studio at great location",
        type: "apartment",
      },
    ];

    apiMock.onGet(APIRoute.OFFERS).reply(200, offers);

    return checkFetchOffers(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_OFFERS,
        payload: offers,
      });
    });
  });

  it("should make a correct API call to GET /favorites", () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkFetchFavoritesOffers = fetchfFavoritesOffers();
    const favoritesOffers = [
      {
        bedrooms: 3,
        city: {
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10,
          },
          name: "Amsterdam",
        },
        description:
          "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
        goods: [
          "Heating",
          "Kitchen",
          "Cable TV",
          "Washing machine",
          "Coffee machine",
          "Dishwasher",
        ],
        host: {
          avatar_url: "img/1.png",
          id: 3,
          is_pro: true,
          name: "Angelina",
        },
        id: 1,
        images: ["img/1.png", "img/2.png"],
        is_favorite: false,
        is_premium: false,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
        max_adults: 4,
        preview_image: "img/1.png",
        price: 120,
        rating: 4.8,
        title: "Beautiful & luxurious studio at great location",
        type: "apartment",
      },
    ];

    apiMock.onGet(APIRoute.FAVORITES).reply(200, favoritesOffers);

    return checkFetchFavoritesOffers(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_FAVORITES_OFFERS,
        payload: favoritesOffers,
      });
    });
  });

  it("should make a correct API call to GET /offer/id", () => {
    const apiMock = new MockAdapter(api);
    const id = 55;
    const dispatch = jest.fn();
    const checkFetchCurrentRoom = fetchCurrentRoom(id);
    const room = {
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10,
        },
        name: "Amsterdam",
      },
      description:
        "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
      goods: [
        "Heating",
        "Kitchen",
        "Cable TV",
        "Washing machine",
        "Coffee machine",
        "Dishwasher",
      ],
      host: {
        avatar_url: "img/1.png",
        id: 3,
        is_pro: true,
        name: "Angelina",
      },
      id,
      images: ["img/1.png", "img/2.png"],
      is_favorite: false,
      is_premium: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
      max_adults: 4,
      preview_image: "img/1.png",
      price: 120,
      rating: 4.8,
      title: "Beautiful & luxurious studio at great location",
      type: "apartment",
    };
    const comments = [
      {
        comment: "comment",
      },
    ];
    const notFoundUrl = "/404";

    apiMock
      .onGet(`${APIRoute.OFFERS}/${id}`)
      .reply(200, room)

    return checkFetchCurrentRoom(dispatch, () => {}, api)
      .then(
        () => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.GET_CURRENT_ROOM,
            payload: room,
          });
        },
        () => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.REDIRECT_TO_ROUTE,
            payload: notFoundUrl,
          });
        }
      )
  });

  it("should make a correct API call to GET /offer/id/nearby", () => {
    const apiMock = new MockAdapter(api);
    const id = 55;
    const dispatch = jest.fn();
    const checkFetchCurrentRoom = fetchNearbyOffers(id);
    const nearbyOffers = [
      {
        bedrooms: 3,
        city: {
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10,
          },
          name: "Amsterdam",
        },
        description:
          "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
        goods: [
          "Heating",
          "Kitchen",
          "Cable TV",
          "Washing machine",
          "Coffee machine",
          "Dishwasher",
        ],
        host: {
          avatar_url: "img/1.png",
          id: 3,
          is_pro: true,
          name: "Angelina",
        },
        id,
        images: ["img/1.png", "img/2.png"],
        is_favorite: false,
        is_premium: false,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
        max_adults: 4,
        preview_image: "img/1.png",
        price: 120,
        rating: 4.8,
        title: "Beautiful & luxurious studio at great location",
        type: "apartment",
      },
    ];

    apiMock
      .onGet(`${APIRoute.OFFERS}/${id}/nearby`)
      .reply(200, nearbyOffers)

    return checkFetchCurrentRoom(dispatch, () => {}, api)
      .then(
        () => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.GET_NEARBY_OFFERS,
            payload: nearbyOffers,
          });
        }
      )
  });

  it("should make a correct API call to GET /comments/id", () => {
    const apiMock = new MockAdapter(api);
    const id = 55;
    const dispatch = jest.fn();
    const checkFetchCurrentRoom = fetchComments(id);
    const comments = [
      {
        comment: "comment",
      },
    ];

    apiMock
      .onGet(`${APIRoute.COMMENTS}/${id}`)
      .reply(200, comments)

    return checkFetchCurrentRoom(dispatch, () => {}, api)
      .then(
        () => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.GET_COMMENTS,
            payload: comments,
          });
        }
      )
  });

});
