import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { TrainerModule } from 'modules';
import { EditorModule } from 'modules';
import App from 'modules/App';
import { createRoutes } from './createRoutes';
import buildStore from './configureStore';
import 'shared/style/index.scss';

export { TrainerModule, EditorModule } from 'modules';

const modules = [new TrainerModule(), new EditorModule()];

const childrens = createRoutes(modules);

const store = buildStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>{childrens}</App>
    </BrowserRouter>
  </Provider>
);
