import React, { useState,useRef } from "react";
import Layout from "../../../../components/Layout";
import Styles from "../../../../styles/ServiceAP.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ImpactBaselineModal from "../../../../components/ImpactBaselineModal";

import ReactToPrint from 'react-to-print'
import ComponentToPrint from "../../../../components/ComponentToPrint";


export default function IndexServoceActionPlan({ data }) {

  let componentRef = useRef();

  const router = useRouter()
  const [showImpactBaselineModal,setShowImpactBaselineModal]=useState(false)

  const [errorCompleteAllFieldsMessage,setErrorCompleteAllFieldsMessage]=useState(false)


  const [clientData, setClientData] = useState({
    clientId:data[0].clientid,
    clientFirstName:data[0].clientfirstname,
    clientLastName :data[0].clientlastname,
    planStartDate :"",
    userFirstName :data[0].clienthcwname,
    userLastName:data[0].clienthcwlastname,
    goal1ServiceCategory:"",
    goal1Summary:"",
    goal1Details:"",
    goal1TargetDate:"",
    goal1ActionStep1:"",
    goal1ActionStep2:"",
    goal1ActionStep3:"",
    goal2ServiceCategory:"",
    goal2Summary:"",
    goal2Details :"",
    goal2TargetDate:"",
    goal2ActionStep1:"",
    goal2ActionStep2:"",
    goal2ActionStep3:"",
    goal3ServiceCategory:"",
    goal3Summary:"",
    goal3Details:"",
    goal3TargetDate:"",
    goal3ActionStep1:"",
    goal3ActionStep2:"",
    goal3ActionStep3:"",
    comments:"",
    HCWSignature:false,
    HCWSignatureDate:"",
    supervisorSignature:false,
    clientSignature:false
  });



  const genericGoals = [
"Attend all health appointments",
"Adhere to HIV medication",
"Remove barriers to accessing medication",
"Access HIV primary care",
"Consistently measure CD4 Count and Viral load",
"Reduce unsafe sexual behavior",
"Start using PrEP",
"Prevention counselling",
"Access supportive counselling",
"Address a problem with street drugs or substance abuse",
"Overdose Prevention",
"Assistance with employment",
"Assistance with education",
"Assistance with housing services",
"Addressing a legal issue",
"Transportation",
"Improve food security",
"Gain access to public assistance"
  ]

const services = [
"CD4/VL Lab Report Check",
"Transportation Coordination",
"Translation/Interpretation",
"Comprehensive Behavioral Risk Assessment",
"Treatment Education and Adherence Counselling",
"Prevention Counselling",
"Supportive Counselling",
"Escort",
"Linkage to Services",
"Other form of Assistance",
  ]


  const displayServices = (arr) => {
    return arr.map((service, index) => {
      return (
        <option className="" value={service} key={index}>
          {service}
        </option>
      );
    });
  };

  const displayGenericGoals = (arr) => {
    return arr.map((goal, index) => {
      return (
        <option className="" value={goal} key={index}>
          {goal}
        </option>
      );
    });
  };
  const notifyMessage = () => {
    toast.success("Service Action Plan updated", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const createClientActionPlan = ()=>{

    if(
    clientData.goal1ServiceCategory==="" ||
    clientData.goal1Summary==="" ||
    clientData.goal1Details==="" ||
    clientData.goal1TargetDate==="" ||
    clientData.goal1ActionStep1==="" ||
    clientData.goal1ActionStep2==="" ||
    clientData.goal1ActionStep3==="" 
    // clientData.goal2ServiceCategory==="" ||
    // clientData.goal2Summary==="" ||
    // clientData.goal2Details ==="" ||
    // clientData.goal2TargetDate==="" ||
    // clientData.goal2ActionStep1==="" ||
    // clientData.goal2ActionStep2==="" ||
    // clientData.goal2ActionStep3==="" ||
    // clientData.goal3ServiceCategory==="" ||
    // clientData.goal3Summary==="" ||
    // clientData.goal3Details==="" ||
    // clientData.goal3TargetDate==="" ||
    // clientData.goal3ActionStep1==="" ||
    // clientData.goal3ActionStep2==="" ||
    // clientData.goal3ActionStep3===""
    ) {
      setErrorCompleteAllFieldsMessage(!errorCompleteAllFieldsMessage)
    }else{
      
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/services_action_plan`, {
        clientData
      })
      .then(function (response) {
        console.log("response",response)
        if(response.status===200 || response.statusText==='Ok'){
          setShowImpactBaselineModal(!showImpactBaselineModal)
         /*  notifyMessage()
           setTimeout(()=>{
            router.push(`/clients/${clientData.clientId}/profile`)
          },2300)  */
        } 
      })
      .catch(function (error) {
            console.log(error)
      });
    }
  }



  return (
    <>
     
      <Layout>
      <ToastContainer autoClose={2000} />
        <section className="my-5">
          <div className="container mx-auto">
            <div className="md:text-center font-black md:p-0 px-5">
              <h3>Service Action Plan</h3>
            </div>
          </div>
        </section>
        <section className="container mx-auto">
    
        <button 
        onClick={()=>router.back()}
        className="bg-black hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5 flex items-center">
        <svg className="mr-2" width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
        Back to client profile
        </button>
  
        </section>

        <main id="mainContent" >
        <section id="info" className="my-5 px-5">
          <div className="container mx-auto">
            <h6 className="font-black my-5 text-dark-blue">
              Client Information
            </h6>
            <div
              className={`${Styles.serviceActionPlanPageInfoContainer} gap-x-5 border-dark-blue rounded-xl p-5`}
            >
              <div className="service-action-plan-page-info-box md:my-0 my-5">
                <h3 className="font-black mb-5">Date</h3>
                <label className="block">
                  <span className="text-xs">Plan start date</span>
                  <input
                    type="date"
                    className="block w-full rounded-md border p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                    onChange={(e) =>
                      setClientData({ ...clientData, planStartDate: e.target.value })
                    }
                  />
                </label>
              </div>

              <div className="service-action-plan-page-info-box md:my-0 my-5">
                <div className="flex gap-x-2 mb-5 items-center">
                  <img src="/client-icon.svg" width="24"/>
                  <h3 className="font-black ">Client</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <label className="block">
                    <span className="text-xs">First Name</span>
                    <input
                      type="text"
                      className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                      value={data[0].clientfirstname}
                      disabled
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs">Last Name</span>
                    <input
                      type="text"
                      className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                      onChange={(e) =>
                        setUserData({ ...clientData, email: e.target.value })
                      }
                      value={data[0].clientlastname.charAt(0)}
                      disabled
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs">Client ID</span>
                    <input
                      type="text"
                      className="block w-full bg-blue-50  p-2 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                      value={data[0].clientid}
                      disabled
                    />
                  </label>
                </div>
              </div>

              <div className="service-action-plan-page-info-box">
              <div className="flex gap-x-2 mb-5 items-center">
                  <img src="/client-icon.svg" width="24"/>
                  <h3 className="font-black ">Health Care Worker</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs">First Name</span>
                    <input
                      type="text"
                      className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                      value={data[0].clienthcwname}
                      disabled
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs">Last Name</span>
                    <input
                      type="text"
                      className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"

                      value={data[0].clienthcwlastname}
                      disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="goals" className="my-5 md:px-0 px-5">
          <div className="container mx-auto">
            <h6 className="font-black my-5 text-dark-blue">Client Goals</h6>
          </div>
          <div
            className={`border-dark-blue container mx-auto rounded-xl px-5 py-5`}
          >
            <div className="service-action-plan-goals-container grid md:grid-cols-3 grid-cols-1 gap-5">

              <div className="service-action-plan-goal-box">
                <div className="service-action-plan-page-goals-top grid gap-5">
                  <h5 className="font-black mt-5">Goal 01</h5>

                  <label className="block">
                    <h6 className="font-black">Summary</h6>

                    <select
                      onChange={(e) =>
                          setClientData({...clientData,goal1Summary:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      
                      {displayGenericGoals(genericGoals)}
                    </select>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Service Category</h6>

                    <select
                      onChange={(e) =>
                        setClientData({...clientData,goal1ServiceCategory:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      {displayServices(services)}
                    </select>
                  </label>
                  <label className="block">
                    <h6 className="font-black">Details</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData, goal1Details:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Target Date</h6>
                    <input type="date" className="border-black w-full rounded p-2 text-xs"
                    onChange={(e)=>setClientData({...clientData,goal1TargetDate:e.target.value})}/>
                  </label>
                  
                  <label className="block">
                    <h6 className="font-black">Action 01</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal1ActionStep1:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 02</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal1ActionStep2:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 03</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal1ActionStep3:e.target.value})}}></textarea>
                  </label>
                </div>
              </div>


              <div className="service-action-plan-goal-box">
                <div className="service-action-plan-page-goals-top grid gap-5">
                  <h5 className="font-black mt-5">Goal 02</h5>

                  <label className="block">
                    <h6 className="font-black">Summary</h6>

                    <select
                      onChange={(e) =>
                          setClientData({...clientData,goal2Summary:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      
                      {displayGenericGoals(genericGoals)}
                    </select>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Service Category</h6>

                    <select
                      onChange={(e) =>
                        setClientData({...clientData,goal2ServiceCategory:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      {displayServices(services)}
                    </select>
                  </label>
                  <label className="block">
                    <h6 className="font-black">Details</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData, goal2Details:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Target Date</h6>
                    <input type="date" className="border-black w-full rounded p-2 text-xs"
                    onChange={(e)=>setClientData({...clientData,goal2TargetDate:e.target.value})}/>
                  </label>
                  
                  <label className="block">
                    <h6 className="font-black">Action 01</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal2ActionStep1:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 02</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal2ActionStep2:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 03</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal2ActionStep3:e.target.value})}}></textarea>
                  </label>
                </div>
              </div>

              <div className="service-action-plan-goal-box">
                <div className="service-action-plan-page-goals-top grid gap-5">
                  <h5 className="font-black mt-5">Goal 03</h5>

                  <label className="block">
                    <h6 className="font-black">Summary</h6>

                    <select
                      onChange={(e) =>
                          setClientData({...clientData,goal3Summary:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      
                      {displayGenericGoals(genericGoals)}
                    </select>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Service Category</h6>

                    <select
                      onChange={(e) =>
                        setClientData({...clientData,goal3ServiceCategory:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      {displayServices(services)}
                    </select>
                  </label>
                  <label className="block">
                    <h6 className="font-black">Details</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData, goal3Details:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Target Date</h6>
                    <input type="date" className="border-black w-full rounded p-2 text-xs"
                    onChange={(e)=>setClientData({...clientData,goal3TargetDate:e.target.value})}/>
                  </label>
                  
                  <label className="block">
                    <h6 className="font-black">Action 01</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal3ActionStep1:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 02</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal3ActionStep2:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 03</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal3ActionStep3:e.target.value})}}></textarea>
                  </label>
                </div>
              </div>


              
            </div>
            <label className="block">
                    <h6 className="font-black">Additional Comments</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,comments:e.target.value})}}></textarea>
                  </label>
          </div>
        </section>
        <section id="other" className="my-5 md:px-0 px-5">
          <div className="container mx-auto">
            <h6 className="font-black my-5 text-dark-blue">Signatures</h6>
          
          <div  className={`border-dark-blue  rounded-xl px-5 py-5`}>
         
          
          <h6 className="font-black"></h6>
          <div className="others-container grid md:grid-cols-3 grid-cols-1 justify-center">
            <div className="others-container-box flex gap-2 justify-center items-center" >
              <p>Has the client signed?</p>
              <input type="checkbox" className="border-dark-blue" 
              onClick={(e)=>{setClientData({...clientData,clientSignature:!clientData.clientSignature})}}/>
            </div>
            <div className="others-container-box flex gap-2 justify-center items-center">
              <p>Has the health care worker signed?</p>
              <input type="checkbox" className="border-dark-blue" 
              onClick={(e)=>{setClientData({...clientData,HCWSignature:!clientData.HCWSignature})}}/>
            </div>
            <div className="others-container-box flex gap-2 justify-center items-center">
              <p>Has the supervisor signed?</p>
              <input type="checkbox" className="border-dark-blue" 
              onClick={(e)=>{setClientData({...clientData,supervisorSignature:!clientData.supervisorSignature})}}/>
            </div>
          </div>
          </div>
          </div>
        </section>
        </main>

        {errorCompleteAllFieldsMessage && <p className="text-xs text-red-500 my-3 text-center">* Please Complete all the fields</p>  }
        <section id="save" className="my-5">
          <div className="container mx-auto flex justify-center">
 {/*          <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5">
            Save Progress</button> */}

 
            <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5"
            onClick={(e)=>{createClientActionPlan()}}>Save</button>
             <ReactToPrint
                trigger={() => <button className="bg-yellow-500 hover:bg-yellow-300 px-5 py-1 rounded text-white inline-block text-xs">Print</button>}
                content={() => componentRef.current}
              
              />
          
          <div style={{display:'none'}}>
      <ComponentToPrint ref={componentRef} name="alexei" clientData={clientData}/>
      </div>
          </div>
        </section>





  
      </Layout>
      {
      showImpactBaselineModal && (
      <ImpactBaselineModal showImpactBaselineModal={showImpactBaselineModal} 
       setShowImpactBaselineModal={setShowImpactBaselineModal} notifyMessage={notifyMessage}
       clientId={clientData.clientId}/>)
      }
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const  response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}`
    );

    const data = await  response.json();
    return { props: { data } };
  },
});
