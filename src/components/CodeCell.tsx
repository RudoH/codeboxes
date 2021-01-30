/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler';
import Resizable from './Resizable';

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        const bundleTimer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setErr(output.err);
        }, 1000);
        return () => clearTimeout(bundleTimer);
    }, [input]);

    return (
        <div>
            <Resizable direction="vertical">
                <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Resizable direction="horizontal">
                        <CodeEditor
                            initialValue="// Insert your code here"
                            onChange={(value) => setInput(value)}
                        />
                    </Resizable>
                    <Preview code={code} errorStatus={err} />
                </div>
            </Resizable>
        </div>
    );
};

export default CodeCell;
