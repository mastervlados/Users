import { useEffect, useState } from 'react'
import './App.css'
import { useAppService } from './services/AppService'
import Pagination from './components/Pagination'

function App() {
  const service = useAppService()
  const [currentPage, setCurrentPage] = useState(0)
  const [currentLimitPerPage, setCurrentLimitPerPage] = useState(0)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [isLoading, setLoading] = useState(true)

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
        const data = await service.getUserData(currentPage, currentLimitPerPage);
        setData(data.users)
      }
    })();
  }, [currentPage])

  if (isLoading) {
    return
  }

  return (
    <div className="table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>Номер телефона</th>
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
