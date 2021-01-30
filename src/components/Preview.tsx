import { useRef, useEffect } from 'react';
import './Preview.css';

interface PreviewProps {
    code: string;
    errorStatus: string;
}

const html = `
<html>
    <head>
    <style>html {background-color: white;</style></head>
    <body>
        <div id="root"></div>
        <script>
            const handleError = (err) => {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '<p>See your browser console for more info</p>' + '</div>'
                console.error(err);
            };

            window.addEventListener('error', (err) => {
                event.preventDefault();
                handleError(err.message);
            });

            window.addEventListener('message', (event) => {
                try {
                    eval(event.data);
                } catch (err) {
                    handleError(err);
                }
            }, false)
        </script>
    </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, errorStatus }: PreviewProps) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => iframe.current.contentWindow.postMessage(code, '*'), 25);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
            {errorStatus && <div className="preview-error">{errorStatus}</div>}
        </div>
    );
};

export default Preview;
