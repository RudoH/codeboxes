import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/CellList';
import './index.css';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <CellList />
            </div>
        </Provider>
    );
};

render(<App />, document.getElementById('root'));
