import React,{ useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from "./Loader";

export default function AddUserModal({ showModal, setShowModal,notificationMessage,setNotificationMessage,notifyMessage }) {
  const router = useRouter()
  const [userData,setUserData]= useState({
    name:"",
    lastname:"",
    email:"",
    userRole:"",
    isactive:true
  })

  const [saving,setSaving] = useState(false)

  const addUser =  ()=> {
     axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers/create`,userData)
    .then(function (response) {
      setShowModal(!showModal)
      notifyMessage()
      setTimeout(()=>{
        router.reload()
      },3000)
      
    })
    .catch(function (error) {
      console.log("client error",error);
    });
  }



  return (
    <>
      <div className="modal">
        <div className="bg-yellow-300 relative mt-8 max-w-sm mx-auto p-10 rounded">
        <button
                    className="absolute  top-0 right-0 "
                    onClick={() => setShowModal(!showModal)}
                   >
                   <img src="/close-window-icon.svg" className="rounded-tr" alt="" width="20"/>
                  </button>
          <div className="grid grid-cols-1 gap-6">
          <div className="flex ml-2.5 items-end">
            <img src="/add-new-user-icon.svg" className="mr-3" alt="" width="50"/>
            <h2 className="font-black">Add New User</h2>
            </div>
            <label className="block">
              <span className="ml-1">First name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="John"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="ml-1">Last name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Doe"
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="ml-1">Email address</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="john@example.com"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </label>
            {/*  <label className="block">
            <span className="text-gray-700">When is your event?</span>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label> */}
            <label className="block">
              <span className="ml-1 text-gray-700">User role</span>
              <select
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
                className="select-add-edit-supervisor block text-[#00000065] w-full mt-1 rounded-md p-2 border-grey shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option>HCW</option>
                <option>Supervisor</option>
                <option>DES</option>
              </select>
            </label>

            <label className="block">
              <span className="ml-1 text-gray-700">Active / No active</span>
              <select
                onChange={() =>
                  setUserData({ ...userData, isactive:!userData.isactive })
                }
                className="select-add-edit-supervisor block w-full mt-1 text-[#00000065] rounded-md p-2 border-grey shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option>Active</option>
                <option>No Active</option>
              </select>
            </label>

            <div className="block">
              <div className="mt-2">
                <div className="flex justify-center">
                  <button
                    className="px-4  py-2 mr-3 font-medium bg-[#23D3AA] text-sm flex shadow-xl rounded-md"
                    onClick={() => {
                      addUser();
                      setSaving(!saving);
                    }}
                  >
                    {saving ? (
                      <Loader />
                    ) : (
                      <img src="/save-icon.svg" className="mr-3" alt="" width="18"/>

                    )}
                    Save
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div id="myModal" className="modal fade">
        <div className="modal-content rounded-xl bg-red-500">
          <span className="close" onClick={() => setShowModal(!showModal)}>
            &times;
          </span>
          <p className="font-black">Some text in the Modal..</p>
        </div>
      </div> */}
    </>
  );
}
