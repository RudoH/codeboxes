import { useSelector } from '../hooks/use-typed-selector';
import { Cell } from '../state';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
    const cells = useSelector(({ cells: { order, data } }) => {
        return order.map((id) => data[id]);
    });

    return (
        <div>
            {cells.map((cell: Cell) => (
                <CellListItem key={cell.id} cell={cell} />
            ))}
        </div>
    );
};

export default CellList;
