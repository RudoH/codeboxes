import { useRef, useEffect } from 'react';

interface PreviewProps {
    code: string;
}

const html = `
<html>
    <head></head>
    <body>
        <div id="root"></div>
        <script>
            window.addEventListener('message', (event) => {
                try {
                    eval(event.data);
                } catch (err) {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '<p>See your browser console for more info</p>' + '</div>'
                    console.err(err);
                }
            }, false)
        </script>
    </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }: PreviewProps) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => iframe.current.contentWindow.postMessage(code, '*'), 25);
    }, [code]);

    console.log('code', code);

    return <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />;
};

export default Preview;
