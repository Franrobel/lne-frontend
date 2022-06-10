import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import Image from 'next/image';

import deleteUserIcon from '../public/delete-user-icon.svg'

const deleteUserModal = ({urlEntity,selectedUser, showDeleteUserModal, setShowDeleteUserModal}) => {
    const router = useRouter()
    const {id, name, lastname} = selectedUser

    const handleAuthUserDelete = ({})=>{
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/${urlEntity}/`,{data:{id}})
        .then(response=>{
          router.reload()
        })
        .catch(error=>console.log(error))
    };

    return (
        <div className='modal flex items-center'>
            <div className='max-w-sm mx-auto h-4/6 rounded-md bg-yellow-400 '>
                <button onClick={() => setShowDeleteUserModal(!showDeleteUserModal)} className='modal-btn-close font-semibold bg-black text-white px-2'>x</button>
                <div className='flex flex-col justify-between items-start px-8 mt-3 h-5/6'>
                    <div className='flex items-center'>
                        <Image src={deleteUserIcon}/>
                        <p className='font-bold text-xl ml-2'>Delete User</p>
                    </div>
                    <label id="name" className="block text-sm font-semibold">Name
                        <input id="name" value={name +' '+ lastname} className="text-lg rounded-lg bg-yellow-100 block p-2 px-3"></input>
                    </label>
                     <p className='self-center text-center text-lg font-semibold '>Are you sure you want <br/>to delete this user?</p>
                    <div className='w-full flex justify-between self-center'>
                        <button className='text-black font-semibold shadow-md bg-green-600 hover:text-white hover:bg-green-500 cursor-pointer rounded-md p-1 px-10 mx-1 my-5'
                        onClick={()=> handleAuthUserDelete()} >Yes</button>
                        <button className='text-white font-semibold shadow-md bg-black hover:text-white hover:bg-blue-900 cursor-pointer rounded-md p-1 px-10 mx-1 my-5' 
                            onClick={() => setShowDeleteUserModal(!showDeleteUserModal)}>No
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
};

export default deleteUserModal;