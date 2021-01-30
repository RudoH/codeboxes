import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import './TextEditor.css';

const TextEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);

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
        <div ref={editorRef}>
            <MDEditor />
        </div>
    ) : (
        <div onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={'# Header'} />
        </div>
    );
};

export default TextEditor;
