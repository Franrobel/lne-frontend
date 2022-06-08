import React from 'react'
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import axios from 'axios'

export default function UserListRow({authorizeduser,setShowEditUserModal,showEditUserModal,index,setSelectedUser}) {
  const {useremail,name,lastname,userrole,isactive,datelastlogin,user_id} = authorizeduser

  console.log(typeof datelastlogin)
  const router = useRouter()

  console.log(authorizeduser)
  const handleSelectedUser =(selectedUser)=>{
    
    setSelectedUser(authorizeduser)
    setShowEditUserModal(!showEditUserModal)
    console.log("selectedUser",selectedUser)
  }

  const handleAuthUserDelete = (id)=>{

    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/`,{data:{id}})
    .then(response=>{
      router.reload()
    })
    .catch(error=>console.log(error))

  } 

  return (
    <> 

    <div
                className={`${styles.dashboardClientListHeadRow} border rounded-md py-3 px-5 my-1 `}
              >
                <div className="head-row ">
                  <p className="text-center">{user_id}</p>
                </div>
                <div className="head-row ">
                  <p className="text-center">{userrole}</p>
                </div>
                <div className="head-row ">
                  <p className="text-center">{name}</p>
                </div>
                <div className="head-row ">
                  <p className="text-center">{lastname}</p>
                </div>
                <div className="head-row f">
                  <p className="text-center">{useremail}</p>
                </div>
                <div className="head-row">
                  <p className="text-center">{new Date(datelastlogin).toLocaleDateString()}</p>
                </div>
                <div className="head-row flex justify-center">
                  <p className="text-center flex cursor-pointer" 
                   onClick={()=>handleSelectedUser(authorizeduser)}>
                    <svg
                      width="24"
                      className="mr-1"
                      strokeWidth="1.5"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 10H16M8 6H12M8 14H11"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Edit
                  </p>
                </div>
                <div className="head-row flex justify-center ">
                  <p className="text-center flex cursor-pointer" onClick={()=>handleAuthUserDelete(user_id)}>
                    <svg
                      className="mr-1"
                      width="24"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Delete
                  </p>
                </div>
              </div>
    </>
  )
}
