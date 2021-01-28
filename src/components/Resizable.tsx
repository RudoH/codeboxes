import { ResizableBox } from 'react-resizable';
import './Resizable.css';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({
    direction,
    children,
}: React.PropsWithChildren<ResizableProps>) => {
    return (
        <ResizableBox
            maxConstraints={[Infinity, window.innerHeight * 0.9]}
            height={300}
            width={Infinity}
            resizeHandles={['s']}
        >
            {children}
        </ResizableBox>
    );
};

export default Resizable;
