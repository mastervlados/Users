import { useEffect, useState } from 'react'
import './UserProfile.css'
import Spinner from '../Spinner'
import { useAppService } from '../../services/AppService'

export const UserProfile = ({ userID }) => {
    const service = useAppService()
    const [userData, setUserData] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = await service.getSingleUserData(userID);
            setUserData(data)
            setLoading(false)
        })();
    }, [userID])

    if (isLoading) {
        return (
            <div className="user-profile__spinner-area">
                <Spinner/>
            </div>
        )
    }

    return (
        <div>
            <header className="user-profile__header">
                <div>
                    <img src={userData.image} className="user-profile__avatar"/>
                </div>
                <div>
                    <p className="user-profile__name">{`${userData.lastName} ${userData.firstName} ${userData.maidenName}`}</p>
                    <p>{userData.phone}</p>
                    <p>{userData.email}</p>
                </div>
            </header>
            <p>Возраст: {userData.age}</p>
            <p>Рост: {userData.height} см.</p>
            <p>Вес: {userData.weight} кг.</p>
            <p>Адрес:</p>
            <span className="user-profile__name">{`${userData.address.stateCode} ${userData.address.postalCode}`}</span>
            <span>, {userData.address.country}, </span>
            <span>{userData.address.state}, </span>
            <span>{userData.address.city}, </span>
            <span>{userData.address.address}</span>
        </div>
    )
}