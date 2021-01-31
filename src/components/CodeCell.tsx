import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }: CodeCellProps) => {
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const { updateCell } = useActions();

    useEffect(() => {
        const bundleTimer = setTimeout(async () => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 1000);
        return () => clearTimeout(bundleTimer);
    }, [cell.content]);

    return (
        <div>
            <Resizable direction="vertical">
                <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Resizable direction="horizontal">
                        <CodeEditor
                            initialValue={cell.content}
                            onChange={(value) => updateCell(cell.id, value)}
                        />
                    </Resizable>
                    <Preview code={code} errorStatus={err} />
                </div>
            </Resizable>
        </div>
    );
};

export default CodeCell;
