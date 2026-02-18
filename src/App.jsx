import { useEffect, useState } from 'react'
import './App.css'
import { useAppService } from './services/AppService'
import Pagination from './components/Pagination'
import SortIcon from './components/SortIcon'

function App() {
  const service = useAppService()
  const [currentPage, setCurrentPage] = useState(0)
  const [currentLimitPerPage, setCurrentLimitPerPage] = useState(0)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  })

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
    return
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
            <th>
              <button onClick={() => handleClick('lastName')}>
                <div className="header-content">
                  <span>Фамилия</span>
                  <SortIcon sortState={sortConfig.key === 'lastName' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th>
              <button onClick={() => handleClick('firstName')}>
                <div className="header-content">
                  <span>Имя</span>
                  <SortIcon sortState={sortConfig.key === 'firstName' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th>
              <button onClick={() => handleClick('maidenName')}>
                <div className="header-content">
                  <span>Отчество</span>
                  <SortIcon sortState={sortConfig.key === 'maidenName' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th>
              <button onClick={() => handleClick('age')}>
                <div className="header-content">
                  <span>Возраст</span>
                  <SortIcon sortState={sortConfig.key === 'age' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th>
              <button onClick={() => handleClick('gender')}>
                <div className="header-content">
                  <span>Пол</span>
                  <SortIcon sortState={sortConfig.key === 'gender' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th>
              <button onClick={() => handleClick('phone')}>
                <div className="header-content">
                  <span>Номер телефона</span>
                  <SortIcon sortState={sortConfig.key === 'phone' ? sortConfig.direction : null}/>
                </div>
              </button>
            </th>
            <th>email</th>
            <th>Страна</th>
            <th>Город</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.maidenName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.country}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
      <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentLimitPerPage={currentLimitPerPage}
        totalCount={count}/>
    </div>
  )
}

export default App
