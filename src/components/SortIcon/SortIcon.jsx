import './SortIcon.css'

export const SortIcon = ({ sortState }) => {
    if (sortState === 'asc') return <span className="sort-icon">▲</span>
    if (sortState === 'desc') return <span className="sort-icon">▼</span>
    return <span className="sort-icon">◊</span>
}