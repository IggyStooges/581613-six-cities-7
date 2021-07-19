import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/header/header';

function ErrorPage() {
  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <div className='page__favorites-container container'>
          <h1>404. Sorry... Page Not Found.</h1>
          <Link to='/'>Вернуться на главную</Link>
        </div>
      </main>
    </div>
  );
}

export default ErrorPage;
