import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../styles/Home.module.css";
import UserListRow from "../components/UserListRow";
import AddUserModal from "../components/AddUserModal";
import AddClientModal from "../components/CreateClientModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dropbox } from "dropbox";
import DashboardClientCard from '../components/DashboardClientCard'

import Layout from "../components/Layout";
import ImpactBaselineModal from "../components/ImpactBaselineModal";

export default function Dashboard({ data, hcworkers }) {
  const { user, error, isLoading } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);
  const loggedUserRole = user && user["https://lanuevatest.herokuapp.com/roles"];
  const userId = user?.sub
  const [noDataMessage, setNoDataMessage] = useState(false);

  const [liveData,setLiveData]=useState(data)




  const getUserClients = ()=> {

    if(loggedUserRole !=="Supervisor" && loggedUserRole !=="DES" ){

      const allClients= liveData.filter(client=>client.clienthcwid===userId).sort((a, b) => a.clientfirstname.localeCompare(b.clientfirstname))
      const userClients = allClients.map((client,index)=>{
        return (
          
          <DashboardClientCard client={client} key={index} loggedUserRole={loggedUserRole}/>
          )
      })
      return userClients
    } else {
      const hasMsaForm=liveData.filter(client=>client.msa_form_id!==null)
     const userClients= hasMsaForm.map((client,index)=>{
     return  <DashboardClientCard client={client} key={index} loggedUserRole={loggedUserRole}/>
      })
      return userClients
    }

    
   }
   const searchByClientIdOrClientName = (text) => {
    const result = data.filter(
      (client, index) =>
        client.clientfirstname.toLowerCase().includes(text.toLowerCase()) ||
        client.clientid.toLowerCase().includes(text.toLowerCase())
    );
    setLiveData(result);

    if (result.length <= 0) {
      setNoDataMessage(true);
    } else {
      setNoDataMessage(false);
    }
  };

  const searchByUserId =(userid)=>{
    console.log(userid)
    console.log("data antes",data)
if(userid!=="All"){
    setLiveData(data)
    const result = data.filter((client, index) => client.clienthcwid.toLowerCase()===userid.toLowerCase());
    setLiveData(result);
    if (result.length <= 0) {
      setNoDataMessage(true);
    } else {
      setNoDataMessage(false);
    }
} else {
  setLiveData(data)
  console.log("data despues",data)
}


  
  }


  const notifyMessage = () => {
    toast.success("A new client has been added!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const displayUserList = () => {
   return hcworkers && hcworkers.map((user, index) => {

      return (
        <option className="text-black" value={user.user_id} key={index}>
          {user.name} {user.lastname}
        </option>
      );
    });
  };



  return (
    <>
      <ToastContainer autoClose={2000} />
      <Head>
        <title>La Nueva Esperanza App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

<Layout>
      <main className="my-5">
        <section id="dashboard-client-list">
          <div className="container mx-auto">
            <h1 className="font-black my-5">
              Hello {user && user["https://lanuevatest.herokuapp.com/name"]}
            </h1>
            <h3 className="font-black my-2">What you want to do today? </h3>
            <div className="flex mb-2">
              {loggedUserRole === "Supervisor" && (
                <Link href="/authorizedusers">
                  <div className="text-center mr-5">
                    <div className="rounded btn-darkYellow p-5 text-center shadow-xl   mb-2 rounded-xl">
                      <button id="myBtn">
                        <div className="flex justify-center">
                          <svg
                            width="102"
                            height="102"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>{" "}
                    <p className="my-5">MANAGE USERS</p>
                  </div>
                </Link>
              )}



             {/*  <div
                className="text-center mr-5"
                onClick={() => setShowCreateClientModal(!showCreateClientModal)}
              >
                <div className="rounded btn-darkBlue p-5 text-center shadow-xl   mb-2 rounded-xl">
                  <button id="myBtn">
                    <div className="flex justify-center">
                      <svg
                        width="102"
                        height="102"
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
                      </svg>
                    </div>
                  </button>
                </div>{" "}
                <p className="my-5">ADD NEW CLIENT</p>
              </div> */}

           
            </div>

            <div className="search-container grid md:grid-cols-2 grid-cols-1 gap-5 space-between">
            {loggedUserRole ==='Supervisor' || loggedUserRole==="DES" && (
                <div className="search-box flex  items-center">
                  <p className="mr-5">Search by name or Client ID</p>

                  <div className="flex ">
                    <div className="flex border-1 border-black rounded-lg  rounded-lg">
                      <input
                        type="text"
                        className="px-4  w-80 rounded-lg "
                        placeholder="Search..."
                        onChange={(e) =>
                          searchByClientIdOrClientName(e.target.value)
                        }
                      />
                      <button className="px-4 py-1 text-white bg-dark-blue border-l rounded">
                        <svg
                          width="24"
                          height="24"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.5 15.5L19 19"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>)}

                {loggedUserRole ==='Supervisor' || loggedUserRole==="DES" && (
              <div className="search-box flex items-center justify-end gap-3">
               
                
                  <p>Filter by HCW</p> 
                <img src="" alt="" />
              <select
                    onChange={(e)=>searchByUserId(e.target.value)}
                      className="text-xs  w-1/2 mt-1 rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                    >
                      <option selected="true" disabled="disabled">Select HCW</option>
                      <option onClick={()=>searchByUserId("")}>All</option>
                      {displayUserList()}
                 
                    </select>
              </div>
              )}

              </div>
              
          
            <div className="dashboard-client-list ">
              <h1 className="font-black text-center my-5">Clients</h1>
              {data.length<=0 && <p className="text-center">No clients has been added</p>}
              {noDataMessage && <p className="text-center">No clients has been added with that name or id</p>}
              <div className="dashboard-clients-container grid md:grid-cols-5 grid.cols-1 md:px-0 px-5 gap-5">
            {/*  
             {data.length > 0 && data.map((client,index)=>{
              return (
              <>
              <DashboardClientCard client={client}/>
              </>)
            })
            } */}

            {loggedUserRole ==="Supervisor" || loggedUserRole==="HCW" && 
            <div
                className="p-5 text-center mb-2  text-center btn-darkBlue rounded shadow-xl rounded-xl text-white"
                onClick={() => setShowCreateClientModal(!showCreateClientModal)}
              >
                <div className="  ">
                  <button id="myBtn">
                    <div className="flex justify-center">
                      <svg
                      className=""
                        width="102"
                        height="102"
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
                      </svg>
                    </div>
                  </button>
                </div>{" "}
                <p className="my-5 lne-text-white">ADD NEW CLIENT</p>
              </div>
            }

              {getUserClients()}
          
          
                
              </div>
            </div>
          </div>
        </section>
      </main>
      </Layout>

      {showModal && (
        <AddUserModal setShowModal={setShowModal} showModal={showModal} />
      )}
      {showCreateClientModal && (
        <AddClientModal
          setShowCreateClientModal={setShowCreateClientModal}
          showCreateClientModal={showCreateClientModal}
          notifyMessage={notifyMessage}
          user={user}
        />
      )}
      
    </>
  );
}

/* export const getServerSideProps = withPageAuthRequired(); */

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [data, hcworkers] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`).then((r) =>
        r.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`).then((r) =>
        r.json()
      ),
    ]);
    return { props: { data: data, hcworkers: hcworkers } };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});