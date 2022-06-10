import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../../styles/Home.module.css";
import AuthUserListRow from "../../components/AuthUserListRow";
import AddUserModal from "../../components/AddUserModal";
import EditAuthUserModal from "../../components/EditAuthUserModal";
import DeleteUserModal from '../../components/DeleteUserModal';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

import backIcon from '../../public/back-button-icon.svg'
import addUserICon from '../../public/add-new-user-icon.svg'
import authUserICon from '../../public/authorized-users-icon.svg'


export default function AuthorizedUsersIndex({data, users}) {
  const router = useRouter()
    const { user, error, isLoading } = useUser();
    const [showModal,setShowModal] = useState(false)

    const [notificationMessage,setNotificationMessage]=useState(false)
    const [listOfNonRegistered,setListOfNonRegistered]=useState([])
    const [listOfNoActive, setListOfNoActive] = useState([])

    const [showEditAuthUserModal,setShowEditAuthUserModal] = useState(false)
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

    const [selectedUser,setSelectedUser]=useState({})

    console.log("user",data)

    useEffect(()=> {
      getNotRegisteredUser(data, users)
      getNoActiveUser(data)
    }, [data]) 
    
 const notifyMessage= ()=>{
  toast.success("A new user has been saved!", {
    position: toast.POSITION.TOP_CENTER,
    
  });
 }
 const getNotRegisteredUser =  (array1,array2)=>{
  const selected=[]
 const alldata=array1.map((data,index)=>{
 const filtered = array2.findIndex(user=> user.useremail===data.email)
 if(filtered===-1){
   selected.push(data)
 }
})
setListOfNonRegistered(selected)
return selected
}
const getNoActiveUser = (array1) => {
  const noActive = array1.filter(user => user.isactive == 'false')
  setListOfNoActive(noActive)
}

  return (
    <>
    <header className="border-b">
        <div className="container mx-auto pt-5 pb-0 grid space-between grid-cols-2">
          <img
            src="./logo.png"
            alt=""
            width={125}
          />
          <div id="head-user" className="flex place-items-end justify-end items-center">
            <div>
            <h4 className="font-black mr-2">
              {user && user["https://lanuevatest.herokuapp.com/name"]} {user && user["https://lanuevatest.herokuapp.com/lastname"]}
            </h4>
        
            <h6 className="">
              {user && user["https://lanuevatest.herokuapp.com/roles"]}
            </h6>
            </div>
            <Link
              href="/api/auth/logout"
            >
            <a className={`bg-yellow-300 inline-block btn-index-page text-black px-3 py-1 rounded-md`}>Logout</a>
            </Link>
          </div>
        </div>
        <div className="flex mb-5 mt-1">
             
        
          </div>
      </header>
      <main>
      <ToastContainer autoClose={2000}/>
          <section>
           <div className=""> 
           <h2 className='ml-20 mt-2'>Manage Users</h2>
              <div className='container mx-auto button-container flex mt-3 mb-5'>
               
              <button className="rounded bg-yellow-300 px-5 py-2 flex items-center shadow-xl inline-block mr-4" id="myBtn" onClick={() => setShowModal(!showModal)}>
                <img src="/add-new-user-icon.svg" className="mr-3" alt="" width="40" />
                Add a new user
              </button>
              <Link href="/users">
            <div className="flex justify-center mr-auto">
              <button className="rounded bg-yellow-300 px-5 py-2 flex items-center shadow-xl inline-block" id="myBtn" >
                <img src="/authorized-users-icon.svg" className="mr-3" alt="" width="40" />
                {" "}
                View active users
              </button>
              
            </div>
            </Link>
            <div className="flex justify-center">
              <Link href="/dashboard">
              <button className="px-5 py-2 flex items-center inline-block self-end" id="myBtn" onClick={() => router.back()}>
                <img src="/back-button-icon.svg" className="mr-2" alt="" width="20" />
                {" "}
                back to homepage
              </button>
              </Link>
          </div>
              
            </div>
            {/* Authorized Users   */}
          <div id="dashboard-client-list" className="bg-light-blue pb-7">
            <div className="dashboard-client-list container mx-auto">
            <h2 className="font-black text-center py-5">Authorized Users</h2>
            <div className={`${styles.dashboardClientListHeadRow} items-end py-3 px-5 pt-5 pb-1`}>

                  <div className="head-row font-black">
                    <p className="text-center">Name</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center">Last Name</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center">User Role</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center">Email</p>
                  </div>

                  <div className="head-row font-black">
                    <p className="text-start">Date User added by the supervisor</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center">Edit</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center"> Delete</p>
                  </div>
                  </div>
            </div>
            <div className="dashboard-client-list mt-2 container mx-auto">
     
            {data? listOfNonRegistered?.map((authuser,index)=>{
                   return <AuthUserListRow
                   authorizeduser={authuser}
                   index={index}
                   key={index}
                   setShowEditAuthUserModal={setShowEditAuthUserModal}
                   showEditAuthUserModal={showEditAuthUserModal}
                   setSelectedUser={setSelectedUser}
                   />
                }): "No data"}
              
              
            </div>
                {/* INACTIVE USERS */}
            <div className="dashboard-client-list container mx-auto">
            <h2 className="font-black text-center py-5">Inactive Users</h2>
            <div className="dashboard-client-list ">
                
                <div className={`${styles.dashboardClientListHeadRow} items-end py-3 px-5 pt-5 pb-1`}>

                  <div className="head-row font-black">
                    <p className="text-center">Name</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center">Last Name</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center">User Role</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center">Email</p>
                  </div>

                  <div className="head-row font-black">
                    <p className="text-start">Date User added by the supervisor</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center">Edit</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-center"> Delete</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-client-list mt-2 container mx-auto">
     
            {data? listOfNoActive?.map((authuser,index)=>{
                   return <AuthUserListRow
                   authorizeduser={authuser}
                   index={index}
                   key={index}
                   setShowEditAuthUserModal={setShowEditAuthUserModal}
                   showEditAuthUserModal={showEditAuthUserModal}
                   setSelectedUser={setSelectedUser}
                   />
                }): "No data"}
              
            </div>

          </div>
          </div>
          </section>
      </main>
      {showModal &&<AddUserModal 
      setShowModal={setShowModal} 
      showModal={showModal}
      notifyMessage={notifyMessage}
      />}
      {showEditAuthUserModal &&<EditAuthUserModal setShowEditAuthUserModal={setShowEditAuthUserModal}  showEditAuthUserModal={showEditAuthUserModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
      {showDeleteUserModal && <DeleteUserModal urlEntity={'authorizedusers'} setShowDeleteUserModal={setShowDeleteUserModal} showDeleteUserModal={showDeleteUserModal} selectedUser={selectedUser}/>}
    </>
  )
}


export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [data, users] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers`).then((r) =>
        r.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`).then((r) =>
        r.json()
      ),
    ]);
    return { props: { data: data, users: users } };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});

//ANTERIOR
// import React, { useState, useEffect } from 'react'
// import Link from 'next/link';
// import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
// import styles from "../../styles/Home.module.css";
// import AuthUserListRow from "../../components/AuthUserListRow";
// import AddUserModal from "../../components/AddUserModal";
// import EditAuthUserModal from "../../components/EditAuthUserModal";
// import { ToastContainer, toast } from 'react-toastify';
// import { useRouter } from 'next/router'

// import 'react-toastify/dist/ReactToastify.css';

// export default function AuthorizedUsersIndex({ data, users }) {
//   const router = useRouter()
//   const { user, error, isLoading } = useUser();
//   const [showModal, setShowModal] = useState(false)

//   const [notificationMessage, setNotificationMessage] = useState(false)

//   const [showEditAuthUserModal, setShowEditAuthUserModal] = useState(false)
//   const [selectedUser, setSelectedUser] = useState({})
//   const [listOfNonRegistered, setListOfNonRegistered] = useState([])

//   console.log("users", users)

//   console.log("data", data)
//   // console.log("users",users)    
//   const notifyMessage = () => {
//     toast.success("A new user has been saved!", {
//       position: toast.POSITION.TOP_CENTER,

//     });
//   }
//   const getNotRegisteredUser = (array1, array2) => {
//     const selected = []
//     const alldata = array1.map((data, index) => {
//       const filtered = array2.findIndex(user => user.useremail === data.email)
//       if (filtered === -1) {
//         selected.push(data)
//       }
//     })
//     setListOfNonRegistered(selected)
//     return selected
//   }
//   useEffect(() => {
//     getNotRegisteredUser(data, users)


//   }, [data])


//   return (
//     <>
//       <header className="border-b">
//         <div className="container mx-auto py-5  grid space-between grid-cols-2">
//           <img
//             src="./logo.png"
//             alt=""
//             width={125}
//           />
//           <div id="head-user" className="grid place-items-end">
//             <h3 className="font-black">
//               {user && user["https://lanuevatest.herokuapp.com/name"]}
//             </h3>
//             <h6 className="">
//               {user && user["https://lanuevatest.herokuapp.com/roles"]}
//             </h6>
//             <Link
//               href="/api/auth/logout"
//             >
//               <a className={`bg-yellow-300  inline-block btn-index-page text-black px-3 py-0 rounded-md`}>Logout</a>

//             </Link>
//           </div>
//         </div>
//       </header>
//       <main>
//         <ToastContainer autoClose={2000} />
//         <section >
//           <div className="container mx-auto ">

//             <div className="flex my-5 ">
             
//                 <button className="rounded bg-yellow-300 px-5 py-2 flex items-center shadow-xl inline-block mr-1" id="myBtn" onClick={() => setShowModal(!showModal)}>
//                   <img src="/add-new-user-icon.svg" className="mr-3" alt="" width="40" />
//                   Add a new user
//                 </button>
             
//               {/*<Link href="/users">
//               <button className="rounded btn-lightBlue px-5 py-2 flex shadow-xl inline-block mr-1" id="myBtn">
//                Users 

//               {" "}
       
//               </button>
//               </Link> */}
//               <div className="flex justify-center mr-auto">
//                 <button className="rounded bg-yellow-300 px-5 py-2 flex items-center shadow-xl inline-block" id="myBtn" >
//                   <img src="/authorized-users-icon.svg" className="mr-3" alt="" width="40" />
//                   {" "}
//                   View active users
//                 </button>
//               </div>
//               <div className="flex justify-center">
//                  <Link href="/dashboard">
//                 <button className="px-5 py-2 flex items-center inline-block self-end" id="myBtn" onClick={() => router.back()}>
//                   <img src="/back-button-icon.svg" className="mr-2" alt="" width="20" />
//                   {" "}
//                   back to homepage
//                 </button>
//  </Link>
//               </div>
//             </div>
//             </div>


//             <div className='bg-light-blue p-6'>
              
// //               <div className="dashboard-client-list mt-1 ">
// //                 {data ? listOfNonRegistered?.map((authuser, index) => {
//                   return <AuthUserListRow
//                     authorizeduser={authuser}
//                     index={index}
//                     key={index}
//                     setShowEditAuthUserModal={setShowEditAuthUserModal}
//                     showEditAuthUserModal={showEditAuthUserModal}
//                     setSelectedUser={setSelectedUser}
//                   />
//                 }) : "No Data"}
//               </div>
           
//             <div className="dashboard-client-list mt-10 ">
//               <h2 className="font-black text-center my-5">Inactive Users</h2>
//               <div className={`${styles.dashboardClientListHeadRow} py-3 px-5`}>

//                 <div className="head-row font-black">
//                   <p className="text-center">Name</p>
//                 </div>
//                 <div className="head-row font-black">
//                   <p className="text-center">Last Name</p>
//                 </div>
//                 <div className="head-row font-black">
//                   <p className="text-center">User Role</p>
//                 </div>
//                 <div className="head-row font-black">
//                   <p className="text-center">Email</p>
//                 </div>

//                 <div className="head-row font-black">
//                   <p className="text-center">Date User added by the supervisor</p>
//                 </div>
//                 <div className="head-row font-black">
//                   <p className="text-center">Edit</p>
//                 </div>
//                 <div className="head-row font-black">
//                   <p className="text-center"> Delete</p>
//                 </div>
//               </div>
//             </div>
//             <div className="dashboard-client-list mt-5 ">
//               {data ? data.filter(user => user.isactive === "false").map((authuser, index) => {
//                 return <AuthUserListRow
//                   authorizeduser={authuser}
//                   index={index}
//                   key={index}
//                   setShowEditAuthUserModal={setShowEditAuthUserModal}
//                   showEditAuthUserModal={showEditAuthUserModal}
//                   setSelectedUser={setSelectedUser}
//                 />
//               }) : "No Data"}
//             </div>
          
//           </div>
//         </section>

//       </main>
//       {showModal && <AddUserModal
//         setShowModal={setShowModal}
//         showModal={showModal}
//         notifyMessage={notifyMessage}
//       />}
//       {showEditAuthUserModal && <EditAuthUserModal setShowEditAuthUserModal={setShowEditAuthUserModal} showEditAuthUserModal={showEditAuthUserModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />}

//     </>
//   )
// }


// // This gets called on every request
// /* export async function getServerSideProps() {
//     // Fetch data from external API
//     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers`)
//     const data = await response.json()
//     // Pass data to the page via props
//     return { props: { data } }
//   }
//  */

// // export const getServerSideProps = withPageAuthRequired({
// //   async getServerSideProps(ctx) {
// //     const [data, users] = await Promise.all([
// //       fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers`).then((r) =>
// //         r.json()
// //       ),
// //       fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`).then((r) =>
// //         r.json()
// //       ),
// //     ]);
// //     return { props: { data: data, users: users } };

// //     /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
// //     const data = await res.json();
// //     return { props: { data } }; */
// //   },
// // });
// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps(ctx) {
//     const [data, users] = await Promise.all([
//       fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers`).then((r) =>
//         r.json()
//       ),
//       fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`).then((r) =>
//         r.json()
//       ),
//     ]);
//     return { props: { data: data, users: users } };
//     /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
//     const data = await res.json();
//     return { props: { data } }; */
//   },
// });