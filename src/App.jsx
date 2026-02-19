import { useEffect, useState } from 'react'
import './App.css'
import { useAppService } from './services/AppService'
import Pagination from './components/Pagination'
import SortIcon from './components/SortIcon'
import Spinner from './components/Spinner'
import Modal from './components/Modal'
import UserProfile from './components/UserProfile'

function App() {
  const service = useAppService()
  const [currentPage, setCurrentPage] = useState(0)
  const [currentLimitPerPage, setCurrentLimitPerPage] = useState(0)
  const [data, setData] = useState()
  const [count, setCount] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  })
  const [isModalOpen, setModalOpen] = useState(false)
  const [pickedUserID, setUserID] = useState(0)

  useEffect(() => {
    (async () => {
      const data = await service.loadUserData();
      setData(data.users)
      setCurrentLimitPerPage(data.limit);
      setCount(data.total)
      setLoading(false)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if (!isLoading) {
        const data = await service.getUserData(currentPage, currentLimitPerPage, sortConfig);
        setData(data.users)
      }
    })();
  }, [currentPage, sortConfig])

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner/>
      </div>
    )
  }

  const handleClick = (key) => {
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
    <div className="table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th className="table-heading">
              <button onClick={() => handleClick('lastName')} className="table-heading__button">
                <div className="table-heading__container">
                  <span>Фамилия</span>
                  <SortIcon sortState={sortConfig.key === 'lastName' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th className="table-heading">
              <button onClick={() => handleClick('firstName')} className="table-heading__button">
                <div className="table-heading__container">
                  <span>Имя</span>
                  <SortIcon sortState={sortConfig.key === 'firstName' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th className="table-heading">
              <button onClick={() => handleClick('maidenName')} className="table-heading__button">
                <div className="table-heading__container">
                  <span>Отчество</span>
                  <SortIcon sortState={sortConfig.key === 'maidenName' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th className="table-heading">
              <button onClick={() => handleClick('age')} className="table-heading__button">
                <div className="table-heading__container">
                  <span>Возраст</span>
                  <SortIcon sortState={sortConfig.key === 'age' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th className="table-heading">
              <button onClick={() => handleClick('gender')} className="table-heading__button">
                <div className="table-heading__container">
                  <span>Пол</span>
                  <SortIcon sortState={sortConfig.key === 'gender' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th className="table-heading">
              <button onClick={() => handleClick('phone')} className="table-heading__button">
                <div className="table-heading__container">
                  <span>Номер телефона</span>
                  <SortIcon sortState={sortConfig.key === 'phone' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th className="table-heading">email</th>
            <th className="table-heading">Страна</th>
            <th className="table-heading">Город</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
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
      <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentLimitPerPage={currentLimitPerPage}
        totalCount={count}/>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <UserProfile userID={pickedUserID}/>
      </Modal>
    </div>
  )
}

export default App
