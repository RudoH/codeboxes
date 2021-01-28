import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { render } from 'react-dom';
import { useState } from 'react';

import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import bundle from './bundler';

const App = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    };

    return (
        <div>
            <CodeEditor initialValue="hello" onChange={(value) => setInput(value)} />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    );
};

render(<App />, document.getElementById('root'));
