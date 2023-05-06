import React, { Suspense } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import block from 'bem-cn';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader/view/Loader';
import Notify from 'features/notify';

import './App.scss';

const b = block('App');

const App = ({ children }) => {
  const isAnyGameActive = useSelector(
    (state) => state.trainer.isAnyGameActive,
    shallowEqual
  );

  return (
    <div className={b({ isAnyGameActive })}>
      <Notify />
      <Suspense fallback={<Loader />}>
        {!isAnyGameActive && <Header />}
        <main>{children}</main>
        {!isAnyGameActive && <Footer />}
      </Suspense>
    </div>
  );
};

export default App;
