import React from 'react';
import { Route } from 'react-router-dom';

const Editor = React.lazy(() => import('features/editor'));

export class EditorModule {
  getRoutes() {
    return (
      <Route
        element={<Editor />}
        exact
        path="/list-editor"
        key="/list-editor"
      />
    );
  }
}
