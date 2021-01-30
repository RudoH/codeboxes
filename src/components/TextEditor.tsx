import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import './TextEditor.css';

const TextEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState('# Header');

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
            <MDEditor value={value} onChange={(val) => setValue(val || '')} />
        </div>
    ) : (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    );
};

export default TextEditor;
