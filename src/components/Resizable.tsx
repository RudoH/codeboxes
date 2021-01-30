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
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: any;
        const resizeListener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setinnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) setWidth(window.innerWidth * 0.75);
            }, 100);
        };
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, [width]);

    let resizableProps: ResizableBoxProps;

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            maxConstraints: [innerWidth * 0.9, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            height: Infinity,
            width,
            resizeHandles: ['e'],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            },
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
