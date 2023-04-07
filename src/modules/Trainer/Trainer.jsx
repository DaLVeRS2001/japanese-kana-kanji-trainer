import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Trainer = lazy(() => import('features/trainer'));
const PopUpBalloonsGame = lazy(() =>
  import('features/trainer/view/Games').then((module) => ({
    default: module.PopUpBalloonsGame,
  }))
);

export class TrainerModule {
  getRoutes() {
    return [
      <Route element={<Trainer />} exact path="/trainer" key="/trainer" />,
      <Route
        element={<PopUpBalloonsGame />}
        exact
        path="/trainer/pop-up-balloons"
        key="/trainer/pop-up-balloons"
      />,
    ];
  }
}
