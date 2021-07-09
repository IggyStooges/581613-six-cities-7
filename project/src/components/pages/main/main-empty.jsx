import React, { useState } from "react";
import PropTypes from "prop-types";
import OffersList from "../../common/offers-list/offers-list";
import Map from "../../common/map/map";
import getCurrentCityOffers from "../../../getCurrentCityOffers";
import { CityType, sortOptions } from "../../../const";
import { offerProp } from "../../app/app.prop";
import { connect } from "react-redux";
import { changeCity } from "../../../store/action";
import CitiesList from "./cities-list";
import Header from "../../common/header/header";
import SortOptions from "./sort-options";
import { getCurrentCity } from "../../../store/offers/selectors";

function MainEmpty() {
  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in Dusseldorf
          </p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
}

export default MainEmpty;
