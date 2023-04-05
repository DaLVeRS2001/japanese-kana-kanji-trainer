import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TrainerModule } from 'modules';
import { EditorModule } from 'modules';
import App from 'modules/App';
import 'shared/style/index.scss';
import { createRoutes } from './createRoutes';

export { TrainerModule, EditorModule } from 'modules';

const modules = [new TrainerModule(), new EditorModule()];

const childrens = createRoutes(modules);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App>{childrens}</App>
    </React.StrictMode>
  </BrowserRouter>
);
