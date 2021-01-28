import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { render } from 'react-dom';
import CodeCell from './components/CodeCell';

const App = () => {
    return (
        <div>
            <CodeCell />
        </div>
    );
};

render(<App />, document.getElementById('root'));
