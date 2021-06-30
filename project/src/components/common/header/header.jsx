import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { connect } from 'react-redux';
import { logout } from '../../../store/api-actions';

function Header({ onLogout, authorizationStatus, login }) {
  const { AUTH: AUTH_STATUS } = AuthorizationStatus;
  const { SIGN_IN, MAIN, FAVORITES } = AppRoute;
  const history = useHistory();

  const handleLogout = () => {
    onLogout();
    history.push(SIGN_IN);
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
                authorizationStatus === AUTH_STATUS ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={FAVORITES}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{login}</span>
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
  authorizationStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  login: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  },
});

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);

