import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import { useSelector } from '../hooks/useTypedSelectors';
import './CodeCell.css';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }: CodeCellProps) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useSelector((state) => state.bundles[cell.id]);
    const combinedCode = useSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id) => data[id]);
        const codeArray = [
            `
            import _React from 'react';;
            import _ReactDOM from 'react-dom';
            const show = (value) => {
                const root = document.getElementById('root')
                if (typeof value === 'object') {
                    if (value.$$typeof && value.props) {
                        _ReactDOM.render(value, root)
                    } else root.innerHTML = JSON.stringify(value);
                } else root.innerHTML = value;
            }
        `,
        ];
        for (const c of orderedCells) {
            if (c.type === 'code') {
                codeArray.push(c.content);
            }
            if (c.id === cell.id) {
                break;
            }
        }
        return codeArray;
    });

    useEffect(() => {
        if (!bundle) {
            return createBundle(cell.id, combinedCode.join('\n'));
        }

        const bundleTimer = setTimeout(async () => {
            createBundle(cell.id, combinedCode.join('\n'));
        }, 1000);
        return () => clearTimeout(bundleTimer);
        // eslint-disable-next-line
    }, [combinedCode.join('\n'), cell.id, createBundle]);

    return (
        <div>
            <Resizable direction="vertical">
                <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
                    <Resizable direction="horizontal">
                        <CodeEditor
                            initialValue={cell.content}
                            onChange={(value) => updateCell(cell.id, value)}
                        />
                    </Resizable>
                    <div className="progress-wrapper">
                        {!bundle || bundle.loading ? (
                            <div className="progress-cover">
                                <progress className="progress is-small is-primary" max="100">
                                    Loading
                                </progress>
                            </div>
                        ) : (
                            <Preview code={bundle.code} errorStatus={bundle.err} />
                        )}
                    </div>
                </div>
            </Resizable>
        </div>
    );
};

export default CodeCell;
