import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Trainer = lazy(() => import('features/trainer'));

export class TrainerModule {
  getRoutes() {
    return <Route element={<Trainer />} exact path="/trainer" key="/trainer" />;
  }
}
