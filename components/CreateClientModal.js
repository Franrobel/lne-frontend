import React,{ useState,useEffect,useRef } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from "./Loader";

export default function CreateClientModal({ setShowCreateClientModal, showCreateClientModal,notifyMessage,setNotifyMessage,data,user }) {
  const router = useRouter()

  const loggeduserId=user[`https://lanuevatest.herokuapp.com/roles`]
  const loggedUserName=user[`https://lanuevatest.herokuapp.com/name`]
  const loggedUserLastname=user[`https://lanuevatest.herokuapp.com/lastname`]

  const {current:a} = useRef(['a'])


  const [users,setUsers]=useState([])
  const [errorMessage, setErrorMessage]=useState("")
  const [saving,setSaving] = useState(false)
  const [emptyFields,setEmptyFields]=useState(false)
  const [errorsInFields,setErrorsInFields]=useState(false)

  const [clientData,setClientData]= useState({
    clientFirstName:"",
    clientLastName:"",
    clientSSN:"",
    clientDateCreated:new Date(),
    clientActive:true,
    clientHCWID: loggeduserId !== "Supervisor" ? user.sub : "",
    clientHCWName: loggedUserName,
    clientHCWLastname: loggedUserLastname,
    clientID:""
  })


  const createClientId=()=>{
    const firstNameLetter = clientData?.clientFirstName?.slice(0,1)
    let shortSsn=String(clientData?.clientSSN)?.slice(-4)
    let shortSsnNumber=Number(shortSsn)
    const lastnameFirstLetter=clientData?.clientLastName?.slice(0,1)
    const result =firstNameLetter.toUpperCase()+shortSsnNumber+lastnameFirstLetter.toUpperCase()
    setClientData({...clientData,clientID:result})
  }

  const getUsers = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
    .then(res=>res.json())
    .then(response=>setUsers(response))
    .catch(err=>console.log("err",err))
}

  const checkErrorsFields =()=>{
    // setErrorMessage('');
    setErrorsInFields(prevSelected => {return !prevSelected })
    setSaving(prevSelected => {return !prevSelected })
  }

  const changeSaving=(error)=>{
    if(error.response.status===409){
      setSaving(prevSelected => {return !prevSelected })
    }
  }

  const checkEmtpyFields=()=>{
    setErrorMessage("")
    setEmptyFields(prevState=> {return !prevState})
    setSaving(prevSelected => {return !prevSelected })
  }

  const addClient =  ()=> {
    
    setSaving(!saving);
    setEmptyFields(false)

if(clientData.clientFirstName=="" 
|| clientData.clientLastName=="" 
||clientData.clientSSN==""|| 
clientData.clientID=="") {checkEmtpyFields()}
else if(
/*   clientData.clientFirstName.match(/[^a-zA-Z]/) 
|| clientData.clientLastName.match(/[^a-zA-Z]/)
||  */clientData.clientSSN.length <= 3 ||clientData.clientSSN.length >4 ){checkErrorsFields()}
 else{
  axios(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients/create`,{
    method:'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   data: clientData
  })
 .then(function (response) {
   if(response.status===200 || response.statusText==='Ok'){
     setShowCreateClientModal(!showCreateClientModal)
     notifyMessage()
     setTimeout(()=>{
       router.reload()
     },50000)
   } 
 })
 .catch(function (error) {
   //showErrors(error.response.data)
   changeSaving(error)
 });
}
 
  }

  useEffect(()=>{
    getUsers()
    createClientId()
},[clientData.clientFirstName,clientData.clientLastName,clientData.clientSSN,saving])


  return (
    <>
      <div className="modal">
        <div className="mt-8 max-w-md mx-auto bg-white p-5 rounded">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex justify-between">
            <h1 className="font-black">Client Information</h1>
            <button
                    className="text-sm text-white"
                    onClick={() => setShowCreateClientModal(!showCreateClientModal)}
                  >
                    <svg
                      className="mr-1 relative "
                      width="24"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10 14.2426L12.1213 12.1213M12.1213 12.1213L14.2426 10M12.1213 12.1213L10 10M12.1213 12.1213L14.2426 14.2426"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 8H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    
                  </button>
            </div>
           
            {emptyFields  && <span className="text-red-600 bg-gray-100 text-center text-xs py-2 rounded-xl">Please complete all the fields</span>} 
            {errorsInFields  && <span className="text-red-600 bg-gray-100 text-center text-xs py-2 rounded-xl">Some information is not correct</span>} 

            <label className="block">
              <span className="">First name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="John"
                onChange={(e) =>
                  setClientData({ ...clientData, clientFirstName: e.target.value })
                }
              />
              {/* {clientData.clientFirstName.match(/[^a-zA-Z]/)  && <p className="text-red-500 text-xs mt-2">Only letters allowed</p>} */}
            </label>
            <label className="block">
              <span className="">Last name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Doe"
                onChange={(e) =>
                  setClientData({ ...clientData, clientLastName: e.target.value })
                }
              />
            {/* {clientData.clientLastName.match(/[^a-zA-Z]/)  && <p className="text-red-500 text-xs mt-2">Only letters allowed</p>} */}

            </label>
            <label className="block">
              <span className="">Last 4 digits of social security number </span>
              <div>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="1234"
                min="4" 
                max="4"
                
                onWheel={event => event.currentTarget.blur()}
                onChange={(e) =>
                  setClientData({ ...clientData, clientSSN: e.target.value })
                }
              />

              </div>
               {(clientData.clientSSN.length ==0 || clientData.clientSSN.length ==4 ) ? null :
               clientData.clientSSN.length >4 ? <p className="text-red-500 text-xs mt-2">Only 4 numbers allowed</p> : <p className="text-red-500 text-xs mt-2">Must be 4 numbers </p>}
            </label>
            {/*  <label className="block">
            <span className="text-gray-700">When is your event?</span>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label> */}
          {loggeduserId === "Supervisor" ? (
            <label className="block">
            <span className="text-gray-700">Asign user</span>
            <select
              onChange={(e) =>
                 
                setClientData({ ...clientData, clientHCWID: e.target.value })
              }
              className="block w-full mt-1 rounded-md p-2 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ><option>-</option>
                {users && users?.map((user,index)=>{
              return <option value={user.user_id} key={index}>{user.useremail}</option>
                })}

            </select>
          </label>
          ):""}
            

            <label className="block">
              <span className="text-gray-700">is Active / No active</span>
              <select
                onChange={() =>
                  setClientData({ ...clientData, isactive:!clientData.isactive })
                }
                className="block w-full mt-1 rounded-md p-2 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option>Active</option>
                <option>No Active</option>
              </select>
            </label>

            {errorMessage  && 
            <span className="text-red-600 bg-gray-100 text-center text-xs py-2 rounded-xl">
            {errorMessage}
            </span>} 
            
            <div className="block">
              <div className="mt-2">
                <div className="flex ">
                  <button
                    className="px-5  py-1 mr-3 font-medium bg-yellow-300  text-sm flex shadow-xl items-center rounded-md"
                    onClick={() => addClient()} 
                  >
                    { saving ? (
                      <Loader />
                    ) : (
                      <svg
                        className="mr-1"
                        width="18"
                        height="18"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8.6 9H15.4C15.7314 9 16 8.73137 16 8.4V3.6C16 3.26863 15.7314 3 15.4 3H8.6C8.26863 3 8 3.26863 8 3.6V8.4C8 8.73137 8.26863 9 8.6 9Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 13.6V21H18V13.6C18 13.2686 17.7314 13 17.4 13H6.6C6.26863 13 6 13.2686 6 13.6Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                    Save
                  </button>
                  {/* <button
                    className="px-5  font-medium bg-black  text-sm text-white flex shadow-xl items-center rounded-md"
                    onClick={() => setShowCreateClientModal(!showCreateClientModal)}
                  >
                    <svg
                      className="mr-1 relative "
                      width="24"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10 14.2426L12.1213 12.1213M12.1213 12.1213L14.2426 10M12.1213 12.1213L10 10M12.1213 12.1213L14.2426 14.2426"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 8H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Close
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
