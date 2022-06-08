import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../../styles/Home.module.css";
import UserListRow from "../../components/UserListRow";
import AuthUsersListRow from "../../components/AuthUsersComponent";
import AddUserModal from "../../components/AddUserModal";
import EditUserModal from "../../components/EditUserModal";
import Layout from '../../components/Layout';


export default function UsersIndex({data}) {
    const { user, error, isLoading } = useUser();
    const [showModal,setShowModal] = useState(false)

    const [showEditUserModal,setShowEditUserModal] = useState(false)
    const [selectedUser,setSelectedUser]=useState({})


  return (
    <>
    <Layout>
    
      <main>
          <section>
           <div className="container mx-auto"> 

           <div className="flex my-5">
              <Link href="/dashboard">
              <button className="rounded btn-lightBlue px-5 py-2 flex shadow-xl inline-block mr-1" id="myBtn">
           
       Dashboard
              </button>
              </Link>
              <Link href="/authorizedusers">
              <button className="rounded btn-lightBlue px-5 py-2 flex shadow-xl inline-block mr-1" id="myBtn">
              Authorized Users 

              {" "}
       
              </button>
              </Link>
              {/* <button className="rounded btn-lightBlue px-5 py-2 flex shadow-xl inline-block" id="myBtn" onClick={()=>setShowModal(!showModal)}>
                <svg
                  className="mr-2"
                  width="24"
                  height="24"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 10H20M23 10H20M20 10V7M20 10V13"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                Go to users
              </button> */}
            </div>




          <div className="dashboard-client-list">
            <h3 className="font-black text-center my-5">Active Users</h3>
              <div className={`${styles.dashboardClientListHeadRow} py-3 px-5`}>
                <div className="head-row font-black">
                  <p className="text-center"> User ID</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center"> User Role</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Name</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Lastname</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Email</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Last login</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Edit</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Delete</p>
                </div>
              </div>
            </div>
            <div className="dashboard-client-list mt-5">

                {data?data.map((authuser,index)=>{
                   return <UserListRow 
                   authorizeduser={authuser} 
                   index={index} 
                   key={index}
                   setShowEditUserModal={setShowEditUserModal} 
                   showEditUserModal={showEditUserModal}
                   setSelectedUser={setSelectedUser}
                   />
                }):"No hay data"}
              
            </div>
          </div>
          </section>
      </main>
      {showModal &&<AddUserModal setShowModal={setShowModal} showModal={showModal}/>}
      {showEditUserModal &&<EditUserModal setShowEditUserModal={setShowEditUserModal} showEditUserModal={showEditUserModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
      </Layout>
    </>
  )
}


// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
    const data = await res.json()
    // Pass data to the page via props
    return { props: { data } }
  }