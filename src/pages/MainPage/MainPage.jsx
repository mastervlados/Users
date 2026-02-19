import { useState } from 'react'
import Modal from '../../components/Modal'
import UserProfile from '../../components/UserProfile'
import TableModule from '../../modules/TableModule'
import './MainPage.css'

export const MainPage = () => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [pickedUserID, setUserID] = useState(0)

    return (
        <>
            <TableModule
                setModalOpen={setModalOpen}
                setUserID={setUserID}
            />
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <UserProfile userID={pickedUserID}/>
            </Modal>
        </>
    )
}