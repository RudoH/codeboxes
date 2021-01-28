import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';
import './Resizable.css';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({
    direction,
    children,
}: React.PropsWithChildren<ResizableProps>) => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setinnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const resizeListener = () => {
            setInnerHeight(window.innerHeight);
            setinnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    let resizableProps: ResizableBoxProps;

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            maxConstraints: [innerWidth * 0.9, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            height: Infinity,
            width: window.innerWidth * 0.75,
            resizeHandles: ['e'],
        };
    } else {
        resizableProps = {
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 50],
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
        };
    }

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
