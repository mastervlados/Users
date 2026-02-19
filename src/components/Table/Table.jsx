import './Table.css'
import SortIcon from '../ui/SortIcon';

export const Table = ({
    tableData,
    sortConfig,
    setSortConfig,
    setModalOpen,
    setUserID,
}) => {
    const fields = [
        { key: 'lastName', text: 'Фамилия', sortEnabled: true },
        { key: 'firstName', text: 'Имя', sortEnabled: true },
        { key: 'maidenName', text: 'Отчество', sortEnabled: true },
        { key: 'age', text: 'Возраст', sortEnabled: true },
        { key: 'gender', text: 'Пол', sortEnabled: true },
        { key: 'phone', text: 'Номер телефона', sortEnabled: true },
        { key: 'email', text: 'email', sortEnabled: false },
        { key: 'country', text: 'Страна', sortEnabled: false },
        { key: 'city', text: 'Город', sortEnabled: false },
    ]

    const handleSort = (key) => {
        setSortConfig(prevConfig => {
            if (prevConfig.key !== key) {
                return { key, direction: 'asc' };
            }
            
            switch (prevConfig.direction) {
            case null:
                return { key, direction: 'asc' };
            case 'asc':
                return { key, direction: 'desc' };
            case 'desc':
                return { key: null, direction: null };
            default:
                return { key: null, direction: null };
            }
        });
    }

    return (
        <table className="users-table">
            <thead>
                <tr>
                    {fields.map(field => {
                        if (field.sortEnabled) {
                            return (
                                <th key={field.key} className="table-heading">
                                    <button onClick={() => handleSort(field.key)} className="table-heading__button">
                                        <div className="table-heading__container">
                                            <span>{field.text}</span>
                                            <SortIcon sortState={sortConfig.key === field.key ? sortConfig.direction : null}/>
                                        </div>
                                    </button>
                                </th>
                            )
                        }
                        return <th key={field.key} className="table-heading">{field.text}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {tableData.map(user => (
                <tr key={user.id} className="table-record" onClick={() => {
                    setModalOpen(true)
                    setUserID(user.id)
                }}>
                    <td className="table-cell">{user.lastName}</td>
                    <td className="table-cell">{user.firstName}</td>
                    <td className="table-cell">{user.maidenName}</td>
                    <td className="table-cell">{user.age}</td>
                    <td className="table-cell">{user.gender}</td>
                    <td className="table-cell">{user.phone}</td>
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell">{user.address.country}</td>
                    <td className="table-cell">{user.address.city}</td>
                </tr>
                ))}   
            </tbody>
        </table>    
    )
}