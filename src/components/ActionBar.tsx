import { useActions } from '../hooks/useActions';

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }: ActionBarProps) => {
    const { moveCell, deleteCell } = useActions();
    return (
        <div>
            <button onClick={() => moveCell(id, 'up')}>/\</button>
            <button onClick={() => moveCell(id, 'down')}>\/</button>
            <button onClick={() => deleteCell(id)}>X</button>
        </div>
    );
};

export default ActionBar;
