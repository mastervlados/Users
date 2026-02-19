import { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import Table from '../../components/Table'
import './TableModule.css'
import Spinner from '../../components/ui/Spinner'
import { useAppService } from '../../services/AppService'

export const TableModule = ({
    setModalOpen,
    setUserID,
}) => {
    const service = useAppService()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    })

    const [currentPage, setCurrentPage] = useState(0)
    const [currentLimitPerPage, setCurrentLimitPerPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    
    useEffect(() => {
        (async () => {
            const data = await service.loadUserData();
            setData(data.users)
            setCurrentLimitPerPage(data.limit);
            setPageCount(data.total)
            setLoading(false)
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            if (!isLoading) {
            const data = await service.getUserData(currentPage, currentLimitPerPage, sortConfig);
            setData(data.users)
            }
        })();
    }, [currentPage, sortConfig]);

    if (isLoading) {
        return (
            <div className="table-module-spinner-area">
                <Spinner/>
            </div>
        )
    }

    return (
        <>
            <Table
                tableData={data}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                setModalOpen={setModalOpen}
                setUserID={setUserID}/>
            <Pagination 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentLimitPerPage={currentLimitPerPage}
                totalCount={pageCount}/>
        </>
    )
}