import React from 'react'
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import axios from 'axios'

export default function AuthUserListRow({authorizeduser,setShowEditAuthUserModal,showEditAuthUserModal,index,setSelectedUser}) {
  const {email,name,lastname,role,isactive,datelastlogin,id,dateaccountactivated} = authorizeduser
  const router = useRouter()

// console.log("userrole", authorizeduser);
  const handleSelectedUser =(selectedUser)=>{
    
    setSelectedUser(authorizeduser)
    setShowEditAuthUserModal(!showEditAuthUserModal)
 
  }

  const handleAuthUserDelete = (id)=>{
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers/`,{data:{id}})
    .then(response=>{
      router.reload()
    })
    .catch(error=>console.log(error))

  } 

  return (
    <> 

              <div className={`${styles.dashboardClientListHeadRow} bg-white border rounded-md py-3 px-5 my-1 `}>
                {/* <div className="head-row ">
                  <p className="text-center">{id}</p>
                </div> */}
                <div className="head-row ">
                  <p className="text-center">{name}</p>
                </div>
                <div className="head-row ">
                  <p className="text-center">{lastname}</p>
                </div>
                <div className="head-row f">
                  <p className="text-center">{role}</p>
                </div>
                <div className="head-row ">
                  <p className="text-center">{email ? email : "-"}</p>
                </div>
              
                <div className="head-row f">
                  <p className="text-center">{dateaccountactivated ? dateaccountactivated.split("T")[0] : "-"}</p>
                </div>
                
                <div className="head-row flex justify-center">
                  <p className="text-center flex cursor-pointer" 
                   onClick={()=>handleSelectedUser(authorizeduser)}>
                     <img src='/edit-icon.svg' alt=''/>
                  </p>
                </div>
                <div className="head-row flex justify-center ">
                  <p className="text-center flex cursor-pointer" onClick={()=>handleAuthUserDelete(id)}>
                  <img src='/delete-icon.svg' alt=''/>
                  </p>
                </div>
                
              </div>
    </>
  )
}
