import React from 'react';
import { Route } from 'react-router-dom';

const Trainer = React.lazy(() => import('features/trainer'));

export class TrainerModule {
  getRoutes() {
    return <Route element={<Trainer />} exact path="/trainer" key="/trainer" />;
  }
}
