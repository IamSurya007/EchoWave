import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from '@material-tailwind/react';
import { useLogout } from "../hooks/useLogout";

const customStyles = {
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {

    },
};

Modal.setAppElement(document.getElementById('root'));

function SettingsModal() {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }
    const {logout} = useLogout()

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className=' flex justify-center '>
            <button onClick={openModal}><IoSettingsOutline /></button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                className=" bg-gray-600 h-1/5 w-1/2"
            >
                <div className='flex flex-col gap-2 py-3 mt-2'>
                <Button onClick={logout}>Logout</Button>
                <Button onClick={closeModal}>Cancel</Button>
                </div>
            </Modal>
        </div>
    );
}


export default SettingsModal
