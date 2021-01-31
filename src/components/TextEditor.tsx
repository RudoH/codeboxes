import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { Cell } from '../state';
import './TextEditor.css';
import { useActions } from '../hooks/useActions';

interface TextEditorProps {
    cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }: TextEditorProps) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const { updateCell } = useActions();

    useEffect(() => {
        const clickListener = (event: MouseEvent) => {
            if (
                editorRef.current &&
                event.target &&
                editorRef.current.contains(event.target as Node)
            ) {
                return console.log('inside editor');
            }
            console.log('outside editor');
            setEditing(false);
        };
        document.addEventListener('click', clickListener, { capture: true });

        return () => {
            document.removeEventListener('click', clickListener, { capture: true });
        };
    }, []);

    return editing ? (
        <div className="text-editor" ref={editorRef}>
            <MDEditor value={cell.content} onChange={(val) => updateCell(cell.id, val || '')} />
        </div>
    ) : (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || 'Click to Edit'} />
            </div>
        </div>
    );
};

export default TextEditor;
