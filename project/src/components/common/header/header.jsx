import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { connect } from 'react-redux';
import { logout } from '../../../store/api-actions';
import { authorizationStatusProp } from '../../app/app.prop';
import {getUserInfo, getAuthorizationStatus} from '../../../store/user/selectors';

function Header({ onLogout, authorizationStatus, user }) {
  const { MAIN, FAVORITES } = AppRoute;

  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.AUTH ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={FAVORITES}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img src={user.avatarUrl} alt="" />
                        </div>
                        <span className="header__user-name user__name">{user.login}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SIGN_IN}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  authorizationStatus: authorizationStatusProp.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUserInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  },
});

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);

