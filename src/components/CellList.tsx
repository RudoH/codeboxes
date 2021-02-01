import { Fragment } from 'react';
import { useSelector } from '../hooks/useTypedSelectors';
import { Cell } from '../state';
import AddCell from './AddCell';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
    const cells = useSelector(({ cells: { order, data } }) => {
        return order.map((id) => data[id]);
    });

    return (
        <div>
            <AddCell alwaysVisible={cells.length === 0} prevCellId={null} />
            {cells.map((cell: Cell) => (
                <Fragment key={cell.id}>
                    <CellListItem cell={cell} />
                    <AddCell prevCellId={cell.id} />
                </Fragment>
            ))}
        </div>
    );
};

export default CellList;
