import { useAppService } from '../../services/AppService'
import './Pagination.css'

export const Pagination = ({
    currentPage,
    setCurrentPage,
    currentLimitPerPage,
    totalCount
}) => {
    const numberOfFullPages = Math.trunc(totalCount / currentLimitPerPage)
    const numberOfPages = totalCount % currentLimitPerPage > 0 ? numberOfFullPages + 1 : numberOfFullPages
    const classNames = 'pagination__button'

    return (
        <div className="pagination">
            {Array.from({ length: numberOfPages }, (_, index) => (
                <button 
                    className={index === currentPage ? `${classNames} pagination__button_active` : classNames}
                    key={index}
                    onClick={() => setCurrentPage(index)}>
                    {index + 1}
                </button>
            ))}
        </div>
    )
}