import './Table.css'
import SortIcon from '../ui/SortIcon';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useState } from 'react';

export const Table = ({
    tableData,
    sortConfig,
    setSortConfig,
    setModalOpen,
    setUserID,
}) => {
    const [colWidths, setColWidths] = useState([150, 150, 150, 100, 100, 200, 300, 150, 150])

    const onResize = (index, { size }) => {
        setColWidths(prev => {
            const newWidths = [...prev]
            newWidths[index] = Math.max(50, size.width)
            return newWidths
        });
    };

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
                return { key, direction: 'asc' }
            }
            
            switch (prevConfig.direction) {
            case null:
                return { key, direction: 'asc' }
            case 'asc':
                return { key, direction: 'desc' }
            case 'desc':
                return { key: null, direction: null }
            default:
                return { key: null, direction: null }
            }
        });
    }

    return (
        <table className="users-table">
            <thead>
                <tr>
                    {fields.map((field, index) => {
                        if (field.sortEnabled) {
                            return (
                                <Resizable
                                    width={colWidths[index]}
                                    height={0}
                                    onResize={(e, data) => onResize(index, data)}
                                    draggableOpts={{ enableUserSelectHack: false }}
                                    minConstraints={[50, 50]}>
                                    <th key={field.key} className="table-heading" style={{ width: colWidths[index] }}>
                                        <button onClick={() => handleSort(field.key)} className="table-heading__button">
                                            <div className="table-heading__container">
                                                <span>{field.text}</span>
                                                <SortIcon sortState={sortConfig.key === field.key ? sortConfig.direction : null}/>
                                            </div>
                                        </button>
                                    </th>
                                </Resizable>
                            )
                        }
                        return (
                            <Resizable
                                width={colWidths[index]}
                                height={0}
                                onResize={(e, data) => onResize(index, data)}
                                draggableOpts={{ enableUserSelectHack: false }}
                                minConstraints={[50, 50]}>
                                <th key={field.key} className="table-heading" style={{ width: colWidths[index] }}>
                                    {field.text}
                                </th>
                            </Resizable>
                        )
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