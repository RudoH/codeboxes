import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import { useSelector } from '../hooks/useTypedSelectors';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }: CodeCellProps) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useSelector((state) => {
        return state.bundles[cell.id];
    });

    useEffect(() => {
        if (!bundle) {
            return createBundle(cell.id, cell.content);
        }

        const bundleTimer = setTimeout(async () => {
            createBundle(cell.id, cell.content);
        }, 1000);
        return () => clearTimeout(bundleTimer);
        // eslint-disable-next-line
    }, [cell.content, cell.id, createBundle]);

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
                    {bundle && <Preview code={bundle.code} errorStatus={bundle.err} />}
                </div>
            </Resizable>
        </div>
    );
};

export default CodeCell;
