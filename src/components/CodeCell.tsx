/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler';
import Resizable from './Resizable';

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    };
    console.log(onClick);

    return (
        <div>
            <Resizable direction="vertical">
                <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Resizable direction="horizontal">
                        <CodeEditor initialValue="hello" onChange={(value) => setInput(value)} />
                    </Resizable>
                    <Preview code={code} />
                </div>
            </Resizable>
        </div>
    );
};

export default CodeCell;
