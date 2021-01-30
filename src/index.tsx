import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { render } from 'react-dom';
// import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';

const App = () => {
    return (
        <div>
            <TextEditor />
        </div>
    );
};

render(<App />, document.getElementById('root'));
