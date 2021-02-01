import './AddCell.css';
import { useActions } from '../hooks/useActions';

interface AddCellProps {
    alwaysVisible?: boolean;
    prevCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ alwaysVisible, prevCellId }: AddCellProps) => {
    const { insertCellAfter } = useActions();

    return (
        <div className={`add-cell ${alwaysVisible ? 'always-visible' : ''}`}>
            <div className="add-buttons">
                <button
                    className="button is-rounded is-secondary is-small"
                    onClick={() => insertCellAfter(prevCellId, 'code')}
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Code</span>
                </button>
                <button
                    className="button is-rounded is-secondary is-small"
                    onClick={() => insertCellAfter(prevCellId, 'text')}
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;
