import React, { Suspense } from 'react';
import block from 'bem-cn';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader/view/Loader';
import Notify from 'features/notify';

import './App.scss';

const b = block('App');

const App = ({ children }) => {
  return (
    <div className={b()}>
      <Notify />
      <Suspense fallback={<Loader />}>
        <Header />
        <main>{children}</main>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
