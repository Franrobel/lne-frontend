import React, { useState,useEffect } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import ProgressNotesStyles from "../../../../styles/ProgressNotes.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'
import ImpactTrackerModal from "../../../../components/ImpactTrackerModal";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProgressNotesIndex = ({ data }) => {

    console.log("data",data)
   const router = useRouter()

   const [showImpactTrackerModal,setShowImpactTrackerModal]=useState(false)


  const notifyMessage = () => {
    toast.success("Progress Note Saved!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const crearFecha=(date)=>{
    const initialDate= date
    const newDate=initialDate.split('/')
    const fixedDate=`${newDate[2]}-${newDate[1].length===1? `0${newDate[1]}`:`${newDate[1]}`}-${newDate[0].length===1 ? `0${newDate[0]}`: `${newDate[0]}`}`
    return fixedDate
  
  }

  const setLocaleDateString = (date) => {

    const fecha = Date.parse(date)
    const newDate=new Date(fecha).toLocaleDateString().replace("/","-").replace("/","-")
    const separatedDate=newDate.split('-')
    const finalDate=`${separatedDate[2]}-${separatedDate[1]?.length===1?`0${separatedDate[1]}`:separatedDate[1]}-${separatedDate[0]?.length===1?`0${separatedDate[0]}`:separatedDate[0]}`
    return finalDate
  }

  const [clientData, setClientData] = useState({
    clientId: data[0]?.clientid,
    clientFirstName: data[0]?.clientfirstname,
    clientLastName: data[0]?.clientlastname,
    clientHCWID: data[0]?.clienthcwid,
    userFirstName: data[0]?.clienthcwname,
    userLastName: data[0]?.clienthcwlastname,
    progressNoteDate:new Date(),
    developmentActionPlan:false,
    CD4VLLabReport:false,
    transportationCoordination :false,
    translationInterpretation :false,
    comprehensiveBehavioralRiskAssessment :false,
    ticklerUpdate :false,
    treatmentEducation:false,
    preventionCounselling :false,
    supportiveCounselling :false,
    escort:false,
    caseClosureDischarge:false,
    linkageToServices:false,
    OtherAssistance:false,
    goal1Progress:false,
    goal1ProgressDate:"",
    goal2Progress:false,
    goal2ProgressDate:"",
    goal3Progress:false,
    goal3ProgressDate:"",
    goal1Completed:false,
    goal1CompletedDate:"",
    goal2Completed:false,
    goal2CompletedDate:"",
    goal3Completed:false,
    goal3CompletedDate:"",
    AIRSCollateralInformation:data[0]?.airscollateralinformation ==="0" ? false: true,
    AIRSCollateralInformationDate:data[0]?.airscollateralinformationdate,
    AIRSFinancialInformation:data[0]?.airsfinancialinformation ==="0" ? false: true,
    AIRSFinancialInformationDate:data[0]?.airsfinancialinformationdate,
    AIRSHIVAIDSRiskHistory:data[0]?.airshivaidsriskhistory ==="0" ? false: true,
    AIRSHIVAIDSRiskHistoryDate:data[0]?.airshivaidsriskhistorydate,
    AIRSHCVHistory:data[0]?.airshcvhistory ==="0" ? false: true,
    AIRSHCVHistoryDate:data[0]?.airshcvhistorydate,
    AIRSHousingInformation:data[0]?.airshousinginformation ==="0" ? false: true,
    AIRSHousingInformationDate:data[0]?.airshousinginformationdate,
    AIRSInsuranceInformation:data[0]?.airsinsuranceinformation ==="0" ? false: true,
    AIRSInsuranceInformationDate:data[0]?.airsinsuranceinformationdate,
    AIRSSubstanceUseHistory :data[0]?.airssubstanceusehistory ==="0" ? false: true,
    AIRSSubstanceUseHistoryDate :data[0]?.airssubstanceusehistorydate,
    LNEClientRights:data[0]?.lneclientrights ==="0" ? false: true,
    LNEClientRightsDate:data[0]?.lneclientrightsdate,
    LNEClientGrievancePolicyProcedure :data[0]?.lneclientgrievancepolicyprocedure ==="0" ? false: true,
    LNEClientGrievancePolicyProcedureDate :data[0]?.lneclientgrievancepolicyproceduredate,
    LNEProgramRules:data[0]?.lneprogramrules ==="0" ? false: true,
    LNEProgramRulesDate:data[0]?.lneprogramrulesdate,
    LNEEmergencyContactConsent :data[0]?.lneemergencycontactconsent ==="0" ? false: true,
    LNEEmergencyContactConsentDate :data[0]?.lneemergencycontactconsentdate,
    LNEConsentForReleaseOfConfidentialInformation :data[0]?.lneconsentforreleaseofconfidentialinformation ==="0" ? false: true,
    LNEConsentForReleaseOfConfidentialInformationDate :data[0]?.lneconsentforreleaseofconfidentialinformationdate,
    HIPPAConsentForm :data[0]?.hippaconsentform ==="0" ? false: true,
    HIPPAConsentFormDate:data[0]?.hippaconsentformdate,
    NYCDOHMHNoticeOfPrivacyPractices :data[0]?.nycdohmhnoticeofprivacypractices ==="0" ? false: true,
    NYCDOHMHNoticeOfPrivacyPracticesDate :data[0]?.nycdohmhnoticeofprivacypracticesdate,
    LNEOutreachRetentionTrackingForm :data[0]?.lneoutreachretentiontrackingform ==="0" ? false: true,
    LNEOutreachRetentionTrackingFormDate :data[0]?.lneoutreachretentiontrackingformdate,
    LNEReferralInformation :data[0]?.lnereferralinformation ==="0" ? false: true,
    LNEReferralInformationDate :data[0]?.lnereferralinformationdate,
    LNEClientReferralForm :data[0]?.lneclientreferralform ==="0" ? false: true,
    LNEClientReferralFormDate :data[0]?.lneclientreferralformdate,
    LNEHNSEligibilityForm:data[0]?.lnehnseligibilityform ==="0" ? false: true,
    LNEHNSEligibilityFormDate:data[0]?.lnehnseligibilityformdate,

  });

  const todaysDate = new Date();
const [serviceActionData,setServiceActionData]=useState({
    goal1servicecategory:data[0]?.goal1servicecategory,
    goal1summary:data[0]?.goal1summary,
    goal1targetdate:data[0]?.goal1targetdate,
    goal2servicecategory:data[0]?.goal2servicecategory,
    goal2summary:data[0]?.goal2summary,
    goal2targetdate:data[0]?.goal2targetdate,
    goal3servicecategory:data[0]?.goal3servicecategory,
    goal3summary:data[0]?.goal3summary,
    goal3targetdate:data[0]?.goal3targetdate
})

const [dataForSAP,setDataForSAP]=useState({
  clientId: data[0]?.clientid,
    goal1Completed:clientData.goal1Completed,
    goal1CompletionDate:clientData.goal1CompletedDate,
    goal2Completed:clientData.goal1Completed,
    goal2CompletionDate:clientData.goal1CompletedDate,
    goal3Completed:clientData.goal1Completed,
    goal3CompletionDate:clientData.goal1CompletedDate,
})

console.log("dataForSAP",dataForSAP)

const handleMsaformUpdate = ()=> {

    axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update_msa_form_from_progress_note`, {
        clientData
      })
      .then(function (response) {
        if(response.status===200 || response.statusText==='Ok'){
          console.log(response)
          console.log("msa form updated successfully")
        } 
      })
      .catch(function (error) {
            console.log("an error ocurred while trying to update msa form", error)
      });
}

const handleServiceActionPlanFormUpdate = ()=> {

  axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/services_action_plan/${clientData.clientId}/update_sap_from_progress_note`, {
      clientData:dataForSAP
    })
    .then(function (response) {
      if(response.status===200 || response.statusText==='Ok'){
        console.log(response)
        console.log("msa form updated successfully")
      } 
    })
    .catch(function (error) {
          console.log("an error ocurred while trying to update msa form", error)
    });
}

const handleProgressNote=()=>{

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/`, {
        clientData
      })
      .then(function (response) {
        if(response.status===200 || response.statusText==='Ok'){
          handleMsaformUpdate()
          handleServiceActionPlanFormUpdate()
          notifyMessage()
          setShowImpactTrackerModal(!showImpactTrackerModal)
        } 
      })
      .catch(function (error) {
            console.log(error)
      });
   
}


console.log("clientData",dataForSAP)

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Layout>
        <div className="container mx-auto">
          <h3 className="font-black text-center my-5">Progress Notes</h3>
        </div>

        <main className="container mx-auto">
{/*         <button
            onClick={() => handleMsaformUpdate()}
            className="bg-black hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5 flex items-center"
          >

            msa
          </button> */}
          <button
            onClick={() => router.back()}
            className="bg-black hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5 flex items-center"
          >
            <svg
              className="mr-2"
              width="20"
              height="20"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5"
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
            Back to client profile
          </button>
          <section id="info" className="my-5">
            <div className="">
              <h6 className="font-black my-5 text-dark-blue">
                Client Information
              </h6>
              <div
                className={`${Styles.serviceActionPlanPageInfoContainer} gap-x-5 border-dark-blue rounded-xl p-5`}
              >
                <div className="service-action-plan-page-info-box md:my-0 my-5">
                  <h3 className="font-black mb-5">Date</h3>
                  <label className="block">
                    <span className="text-xs">Today&apos;s date</span>
                    <p>{todaysDate.toLocaleDateString('en',{year:'numeric',month:'numeric',day:'numeric'})}</p>
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
                        value={data[0]?.clientfirstname}
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
                        value={data[0]?.clientlastname.charAt(0)}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs">Client ID</span>
                      <input
                        type="text"
                        className="block w-full bg-blue-50  p-2 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={data[0]?.clientid}
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
                        value={clientData.userFirstName}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs">Last Name</span>
                      <input
                        type="text"
                        className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={clientData.userLastName}
                        disabled
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <h6 className="font-black my-5 text-dark-blue">Service Provided</h6>

          <section
            id="servidedProvided"
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5"
          >
            <div className="services-container grid md:grid-cols-3 grid-cols-1 gap-x-5">
              <div className="services-box">
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Development of Action Plan with Client
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,developmentActionPlan:!clientData.developmentActionPlan})}
                    />
                    <span
                      className={`${ProgressNotesStyles.checkmark} `}
                    ></span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    CD4/VL Lab Report Check
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,CD4VLLabReport:!clientData.CD4VLLabReport})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Transportation Coordination
                    <input type="checkbox"
                    onChange={()=>setClientData({...clientData,transportationCoordination:!clientData.transportationCoordination})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Translation/Interpretation
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,translationInterpretation:!clientData.translationInterpretation})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>

                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Comprehensive Behavioral Risk Assessment
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,comprehensiveBehavioralRiskAssessment:!clientData.comprehensiveBehavioralRiskAssessment})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>
              </div>

              <div className="services-box">
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Tickler Update
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,ticklerUpdate:!clientData.ticklerUpdate})}/>
                    <span
                      className={`${ProgressNotesStyles.checkmark} `}
                    ></span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Treatment Education and Adherence Counselling
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,treatmentEducation:!clientData.treatmentEducation})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Prevention Counselling
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,preventionCounselling:!clientData.preventionCounselling})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Supportive Counselling
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,supportiveCounselling:!clientData.supportiveCounselling})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Escort
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,escort:!clientData.escort})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>
              </div>

              <div className="services-box">
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Case Closure/Discharge
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,caseClosureDischarge:!clientData.caseClosureDischarge})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Linkage to Services
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,linkageToServices:!clientData.linkageToServices})}
                    />
                    <span
                      className={`${ProgressNotesStyles.checkmark} `}
                    ></span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label
                    className={`${ProgressNotesStyles.checkboxContainer} text-sm`}
                  >
                    Other form of Assistance
                    <input type="checkbox" 
                    onChange={()=>setClientData({...clientData,OtherAssistance:!clientData.OtherAssistance})}
                    />
                    <span className={`${ProgressNotesStyles.checkmark}`}></span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <h6 className="font-black my-5 text-dark-blue">Goals</h6>

          <section
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5 goals"
            id="goals"
          >
            <div className="goals-container grid md:grid-cols-3 grid-cols-3 gap-5">
              <div className="goal-box">
                <div className="goal-top flex my-2">
                  <h3 className="font-black">Goal 01</h3>
                  <div className="w-2/4 border-b px-5"></div>
                </div>
                <div className="goal-service grid grid-cols-2 my-2">
                  <div>
                    <span className="text-sm">Service Category</span>
                    <p className="text-sm text-dark-blue ">
                      {serviceActionData?.goal1servicecategory}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm">Target Date</span>
                    <p className="text-dark-blue text-sm">
                    {new Date(serviceActionData?.goal1targetdate).toLocaleDateString('en',{year:'numeric',month:'numeric',day:'numeric'})}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2">
                  <span className="text-sm">Summary</span>
                  <p className="text-sm text-dark-blue ">
                  {serviceActionData?.goal1summary}
                  </p>
                </div>
              </div>

              <div className="goal-box">
                <div className="goal-top flex my-2">
                  <h3 className="font-black">Goal 02</h3>
                  <div className="w-2/4 border-b px-5"></div>
                </div>
                <div className="goal-service grid grid-cols-2 my-2">
                  <div>
                    <span className="text-sm">Service Category</span>
                    <p className="text-sm text-dark-blue ">
                    {serviceActionData?.goal2servicecategory}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm">Target Date</span>
                    <p className="text-dark-blue text-sm">
                    {new Date(serviceActionData?.goal2targetdate).toLocaleDateString('en',{year:'numeric',month:'numeric',day:'numeric'})}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2">
                  <span className="text-sm">Summary</span>
                  <p className="text-sm text-dark-blue ">
                  {serviceActionData?.goal2summary}
                  </p>
                </div>
              </div>



              <div className="goal-box">
                <div className="goal-top flex my-2">
                  <h3 className="font-black">Goal 03</h3>
                  <div className="w-2/4 border-b px-5"></div>
                </div>
                <div className="goal-service grid grid-cols-2 my-2">
                  <div>
                    <span className="text-sm">Service Category</span>
                    <p className="text-sm text-dark-blue ">
                    {serviceActionData?.goal3servicecategory}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm">Target Date</span>
                    <p className="text-dark-blue text-sm">
                    {new Date(serviceActionData?.goal3targetdate).toLocaleDateString('en',{year:'numeric',month:'numeric',day:'numeric'})}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2">
                  <span className="text-sm">Summary</span>
                  <p className="text-sm text-dark-blue ">
                  {serviceActionData?.goal3summary}
                  </p>
                </div>
              </div>
            </div>
          </section>


          <h6 className="font-black my-5 text-dark-blue">Which of the goals were worked on?</h6>

          <section
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5 workedGoals"
            id="workedGoals"
          >
            <div className="goals-container grid md:grid-cols-3 grid-cols-3 gap-5">

                <div>
                        <div className="workedGoals-box flex gap-5 ">
                            <p className="">Goal 01</p>
                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>Yes
                            <input type="radio"  name="workedGoals" onChange={(e)=>setClientData({...clientData,goal1Progress:true})}/>
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>

                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>No
                            <input type="radio"  name="workedGoals" onChange={(e)=>setClientData({...clientData,goal1Progress:false})}/>
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>
                        </div>
                        <div className="flex gap-5 items-center">
                        <div className={`calendarIcon`}><img src="https://i.pinimg.com/474x/d4/b0/f1/d4b0f127a402c9cb262d17ec43b10fc3.jpg" width={24} alt=""/></div>
                            <h3 className="text-sm">Date</h3>
                            <input
                                type="date"
                                id=""
                                className="rounded-lg text-sm p-1 border-dark-blue"
                                onChange={(e)=>setClientData({...clientData,goal1ProgressDate:e.target.value})}
                                />
                        </div>
                </div>  


                <div>
                        <div className="workedGoals-box flex gap-5 ">
                            <p className="">Goal 02</p>
                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>Yes
                            <input type="radio"  name="workedGoals2"onChange={(e)=>setClientData({...clientData,goal2Progress:true})} />
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>

                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>No
                            <input type="radio"  name="workedGoals2" onChange={(e)=>setClientData({...clientData,goal2Progress:true})} />
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>
                        </div>
                        <div className="flex gap-5 items-center">
                        <div className={`calendarIcon`}><img src="https://i.pinimg.com/474x/d4/b0/f1/d4b0f127a402c9cb262d17ec43b10fc3.jpg" width={24} alt=""/></div>
                            <h3 className="text-sm">Date</h3>
                            <input
                                type="date"
                                id=""
                                className="rounded-lg text-sm p-1 border-dark-blue"
                                onChange={(e)=>setClientData({...clientData,goal2ProgressDate:e.target.value})}
                                />
                        </div>
                </div>  



                <div>
                        <div className="workedGoals-box flex gap-5 ">
                            <p className="">Goal 03</p>
                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>Yes
                            <input type="radio"  name="workedGoals3" onChange={(e)=>setClientData({...clientData,goal3Progress:true})}/>
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>

                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>No
                            <input type="radio"  name="workedGoals3" onChange={(e)=>setClientData({...clientData,goal3Progress:true})}/>
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>
                        </div>
                        <div className="flex gap-5 items-center">
                        <div className={`calendarIcon`}><img src="https://i.pinimg.com/474x/d4/b0/f1/d4b0f127a402c9cb262d17ec43b10fc3.jpg" width={24} alt=""/></div>
                            <h3 className="text-sm">Date</h3>
                            <input
                                type="date"
                                id=""
                                className="rounded-lg text-sm p-1 border-dark-blue"
                                onChange={(e)=>setClientData({...clientData,goal3ProgressDate:e.target.value})}
                                />
                        </div>
                </div>        
                
             
            </div>
          </section>





          <h6 className="font-black my-5 text-dark-blue">Were any of the clients goals completed?</h6>

          <section
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5 workedGoals"
            id="workedGoals"
          >
            <div className="goals-container grid md:grid-cols-3 grid-cols-3 gap-5">

                <div>
                        <div className="workedGoals-box flex gap-5 ">
                            <p className="">Goal 01</p>
                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>Yes
                            <input type="radio"  name="completedGoals1" onClick={(e)=>{
                              setClientData({...clientData,goal1Completed:true})
                              setDataForSAP({...dataForSAP,goal1Completed:true})
                              }}/>
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>

                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>No
                            <input type="radio"  name="completedGoals1" onClick={()=>{
                              setClientData({...clientData,goal1Completed:false})
                              setDataForSAP({...dataForSAP,goal1Completed:false})

                          }}/>
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>
                        </div>
                        <div className="flex gap-5 items-center">
                        <div className={`calendarIcon`}><img src="https://i.pinimg.com/474x/d4/b0/f1/d4b0f127a402c9cb262d17ec43b10fc3.jpg" width={24} alt=""/></div>
                            <h3 className="text-sm">Date</h3>
                            <input
                                type="date"
                                id=""
                                className="rounded-lg text-sm p-1 border-dark-blue"
                                onChange={(e)=>{
                                  setClientData({...clientData,goal1CompletedDate:e.target.value})
                                  setDataForSAP({...dataForSAP,goal1CompletionDate:e.target.value})
                              }}
                                />
                        </div>
                </div>  


                <div>
                        <div className="workedGoals-box flex gap-5 ">
                            <p className="">Goal 02</p>
                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>Yes
                            <input type="radio"  name="completedGoals2" onClick={(e)=>{
                              setClientData({...clientData,goal2Completed:true})
                              setDataForSAP({...dataForSAP,goal2Completed:true})
                          }} />
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>

                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>No
                            <input type="radio"  name="completedGoals2" onClick={(e)=>{
                              setClientData({...clientData,goal2Completed:false})
                              setDataForSAP({...dataForSAP,goal2Completed:false})
                          }}/>
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>
                        </div>
                        <div className="flex gap-5 items-center">
                        <div className={`calendarIcon`}><img src="https://i.pinimg.com/474x/d4/b0/f1/d4b0f127a402c9cb262d17ec43b10fc3.jpg" width={24} alt=""/></div>
                            <h3 className="text-sm">Date</h3>
                            <input
                                type="date"
                                id=""
                                className="rounded-lg text-sm p-1 border-dark-blue"
                                onChange={(e)=>{setClientData({...clientData,goal2CompletedDate:e.target.value})
                                setDataForSAP({...dataForSAP,goal2CompletionDate:e.target.value})
                              }}
                                />
                        </div>
                </div>  



                <div>
                        <div className="workedGoals-box flex gap-5 ">
                            <p className="">Goal 03</p>
                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>Yes
                            <input type="radio"  name="completedGoals3" onClick={(e)=>{
                              setClientData({...clientData,goal3Completed:true})
                              setDataForSAP({...dataForSAP,goal3Completed:true})
                          }}/>
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>
                            <label className={`${ProgressNotesStyles.radioBtnContainer} text-sm`}>No
                            <input type="radio"  name="completedGoals3"onClick={(e)=>{
                              setClientData({...clientData,goal3Completed:false})
                              setDataForSAP({...dataForSAP,goal3Completed:false})
                          }} />
                            <span className={`${ProgressNotesStyles.radioBtnCheckmark}`}></span>
                            </label>
                        </div>
                        <div className="flex gap-5 items-center">
                        <div className={`calendarIcon`}><img src="https://i.pinimg.com/474x/d4/b0/f1/d4b0f127a402c9cb262d17ec43b10fc3.jpg" width={24} alt=""/></div>
                            <h3 className="text-sm">Date</h3>
                            <input
                                type="date"
                                id=""
                                className="rounded-lg text-sm p-1 border-dark-blue"
                                onChange={(e)=>{setClientData({...clientData,goal3CompletedDate:e.target.value})
                              setDataForSAP({...dataForSAP,goal3CompletionDate:e.target.value})
                              }}
                                />
                        </div>
                </div>        
                
             
            </div>
          </section>

          <h6 className="font-black my-5 text-dark-blue">Were any additional forms added to the clients profile?</h6>

<section className="gap-x-5 border-dark-blue rounded-xl  mb-5 workedGoals" id="workedGoals">

    <div className="additional-forms-container grid grid-cols-2 gap-1">
        <div className="additional-forms-box border-r-dark-blue ">
        
        <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.AIRSCollateralInformation ? 'checked' : ''}
                  disabled={clientData.AIRSCollateralInformation ? true : false}
                  onChange={(e) =>{
                    clientData.AIRSCollateralInformationDate==="" || clientData.AIRSCollateralInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSCollateralInformation:
                        !clientData.AIRSCollateralInformation,
                        AIRSCollateralInformationDate:new Date()
                    })):setClientData({
                      ...clientData,
                      AIRSCollateralInformation:
                        !clientData.AIRSCollateralInformation,
                    })
                    }
                  }
                />
              </div>
              <div>
                <p>AIRS Collateral Information </p>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.AIRSFinancialInformation ? 'checked' : ''}
                  disabled={clientData.AIRSFinancialInformation ? true : false}
                  onChange={() => {
                    clientData.AIRSFinancialInformationDate ==="" || clientData.AIRSFinancialInformationDate === null ? (
                    setClientData({
                      ...clientData,
                      AIRSFinancialInformation:
                        !clientData.AIRSFinancialInformation,
                        AIRSFinancialInformationDate:new Date()
                    })):setClientData({
                      ...clientData,
                      AIRSFinancialInformation:
                        !clientData.AIRSFinancialInformation,
                    })
                  }}
                />
              </div>
              <div>
                <p>AIRS Financial Information </p>
              </div>
              
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.AIRSHIVAIDSRiskHistory ? 'checked' : ''}
                  disabled={clientData.AIRSHIVAIDSRiskHistory ? true : false}
                  onChange={() => {
                    clientData.AIRSHIVAIDSRiskHistoryDate==="" || clientData.AIRSHIVAIDSRiskHistoryDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistory:
                        !clientData.AIRSHIVAIDSRiskHistory,
                        AIRSHIVAIDSRiskHistoryDate:new Date()
                    })):setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistory:
                        !clientData.AIRSHIVAIDSRiskHistory,
                    })
                  }}
                />
              </div>
              <div>
                <p>AIRS HIV AIDS Risk History </p>
              </div>
     
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.AIRSHCVHistory ? 'checked' : ''}
                  disabled={clientData.AIRSHCVHistory ? true : false}
                  onChange={() => {
                    clientData.AIRSHCVHistoryDate==="" || clientData.AIRSHCVHistoryDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSHCVHistory: !clientData.AIRSHCVHistory,
                      AIRSHCVHistoryDate:new Date()
                    })):setClientData({
                      ...clientData,
                      AIRSHCVHistory: !clientData.AIRSHCVHistory,
                    })
                  }
                }
                />
              </div>
              <div>
                <p>AIRS HCV History </p>
              </div>
          
         
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.AIRSHousingInformation ? 'checked' : ''}
                  disabled={clientData.AIRSHousingInformation ? true : false}
                  onChange={() => {
                 
                    clientData.AIRSHousingInformationDate==="" || clientData.AIRSHousingInformationDate=== null ? (
                    setClientData({
                      ...clientData,
                      AIRSHousingInformation:
                        !clientData.AIRSHousingInformation,
                        AIRSHousingInformationDate:new Date()
                    })):setClientData({
                      ...clientData,
                      AIRSHousingInformation:
                        !clientData.AIRSHousingInformation,
                    })
                  }
                }
                />
              </div>
              <div>
                <p>AIRS Housing Information </p>
              </div>
 
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.AIRSInsuranceInformation ? 'checked' : ''}
                  disabled={clientData.AIRSInsuranceInformation ? true : false}
                  onChange={() => {
                    clientData.AIRSInsuranceInformationDate==="" || clientData.AIRSInsuranceInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformation:
                        !clientData.AIRSInsuranceInformation,
                        AIRSInsuranceInformationDate:new Date()
                    })):setClientData({
                      ...clientData,
                      AIRSInsuranceInformation:
                        !clientData.AIRSInsuranceInformation,
                    })
                  }}
                />
              </div>
              <div>
                <p>AIRS Insurance Information </p>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.AIRSSubstanceUseHistory ? 'checked' : ''}
                  disabled={clientData.AIRSSubstanceUseHistory ? true : false}
                  onChange={() => {
                    clientData.AIRSSubstanceUseHistoryDate==="" || clientData.AIRSSubstanceUseHistoryDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistory:
                        !clientData.AIRSSubstanceUseHistory,
                        AIRSSubstanceUseHistoryDate:new Date()
                    })):setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistory:
                        !clientData.AIRSSubstanceUseHistory,
                    })
                  }}
                />
              </div>
              <div>
                <p>AIRS Substance Use History </p>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.LNEClientRights ? 'checked' : ''}
                  disabled={clientData.LNEClientRights ? true : false}
                  onChange={() => {
                    clientData.LNEClientRightsDate==="" || clientData.LNEClientRightsDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEClientRights: !clientData.LNEClientRights,
                      LNEClientRightsDate:new Date()
                    })):setClientData({
                      ...clientData,
                      LNEClientRights: !clientData.LNEClientRights,
                     
                    })
                  }}
                />
              </div>
              <div>
                <p>LNE Client Rights </p>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.LNEClientGrievancePolicyProcedure ? 'checked' : ''}
                  disabled={clientData.LNEClientGrievancePolicyProcedure ? true : false}
                  onChange={() => {
                    clientData.LNEClientGrievancePolicyProcedureDate==="" || clientData.LNEClientGrievancePolicyProcedureDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedure:
                        !clientData.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate:new Date()
                    })):setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedure:
                        !clientData.LNEClientGrievancePolicyProcedure,
                    })
                  }}
                />
              </div>
              <div>
                <p>LNE Client Grievance Policy & Procedure </p>
              </div>

            </div>
        
        </div>   {/* FIN DEL FORM BOX */}


        <div className="additional-form-box">
        <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.LNEProgramRules ? 'checked' : ''}
                  disabled={clientData.LNEProgramRules ? true : false}
                  onChange={() => {
                    clientData.LNEProgramRulesDate==="" || clientData.LNEProgramRulesDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEProgramRules: !clientData.LNEProgramRules,
                      LNEProgramRulesDate:new Date()
                    })):setClientData({
                      ...clientData,
                      LNEProgramRules: !clientData.LNEProgramRules,
                    })
                  }
                }
                />
              </div>
              <div>
                <p>LNE Program Rules </p>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.LNEEmergencyContactConsent ? 'checked' : ''}
                  disabled={clientData.LNEEmergencyContactConsent ? true : false}
                  onChange={() =>{
                    clientData.LNEEmergencyContactConsentDate==="" || clientData.LNEEmergencyContactConsentDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEEmergencyContactConsent:
                        !clientData.LNEEmergencyContactConsent,
                        LNEEmergencyContactConsentDate:new Date()
                    })):setClientData({
                      ...clientData,
                      LNEEmergencyContactConsent:
                        !clientData.LNEEmergencyContactConsent,
                    })
                  }}
                />
              </div>
              <div>
                <p>LNE Emergency Contact Consent </p>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.LNEConsentForReleaseOfConfidentialInformation ? 'checked' : ''}
                  disabled={clientData.LNEConsentForReleaseOfConfidentialInformation ? true : false}
                  onChange={() =>{
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate==="" || clientData.LNEConsentForReleaseOfConfidentialInformationDate===null ? (
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformation:
                          !clientData.LNEConsentForReleaseOfConfidentialInformation,
                          LNEConsentForReleaseOfConfidentialInformationDate:new Date()
                      })
                    ):setClientData({
                      ...clientData,
                      LNEConsentForReleaseOfConfidentialInformation:
                        !clientData.LNEConsentForReleaseOfConfidentialInformation,
                    })
                  }
                  }
                />
              </div>
              <div>
                <p>LNE Consent for Release of Confidential Information </p>
              </div>
     
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.HIPPAConsentForm ? 'checked' : ''}
                  disabled={clientData.HIPPAConsentForm ? true : false}
                  onChange={() =>{
                    clientData.HIPPAConsentFormDate==="" || clientData.HIPPAConsentFormDate===null ? (
                    setClientData({
                      ...clientData,
                      HIPPAConsentForm: !clientData.HIPPAConsentForm,
                      HIPPAConsentFormDate:new Date()
                    })):setClientData({
                      ...clientData,
                      HIPPAConsentForm: !clientData.HIPPAConsentForm,
                    })
                  }
                  }
                />
              </div>
              <div>
                <p>HIPAA Consent Form (OCA Form 960)</p>
              </div>
              
    
            </div>

            <div
              className={`flex bg-light-green  py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.NYCDOHMHNoticeOfPrivacyPractices ? 'checked' : ''}
                  disabled={clientData.NYCDOHMHNoticeOfPrivacyPractices ? true : false}
                  onChange={() =>{
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate==="" || clientData.NYCDOHMHNoticeOfPrivacyPracticesDate===null ? (
                    setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPractices:
                        !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                        NYCDOHMHNoticeOfPrivacyPracticesDate:new Date()
                    })):setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPractices:
                        !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                    })
                  }
                  }
                />
              </div>
              <div>
                <p className="text-sm">
                  NYC DOHMH Notice of Privacy Practices - Acknowledgement of
                  Receipt{" "}
                </p>
              </div>
          
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.LNEOutreachRetentionTrackingForm ? 'checked' : ''}
                  disabled={clientData.LNEOutreachRetentionTrackingForm ? true : false}
                  onChange={() =>{
                    clientData.LNEOutreachRetentionTrackingFormDate==="" || clientData.LNEOutreachRetentionTrackingFormDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEOutreachRetentionTrackingForm:
                        !clientData.LNEOutreachRetentionTrackingForm,
                        LNEOutreachRetentionTrackingFormDate:new Date()
                    })):setClientData({
                      ...clientData,
                      LNEOutreachRetentionTrackingForm:
                        !clientData.LNEOutreachRetentionTrackingForm,
                    })
                  }
                  }
                />
              </div>
              <div>
                <p>LNE Outreach Retention/Tracking Form </p>
              </div>
             
             
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.LNEReferralInformation ? 'checked' : ''}
                  disabled={clientData.LNEReferralInformation ? true : false}
                  onChange={() => {
                    
                    clientData.LNEReferralInformationDate==="" || clientData.LNEReferralInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEReferralInformation:
                        !clientData.LNEReferralInformation,
                        LNEReferralInformationDate:new Date()
                    })):setClientData({
                      ...clientData,
                      LNEReferralInformation:
                        !clientData.LNEReferralInformation,
                    })
                  }
                }
                />
              </div>
              <div>
                <p>LNE Referral Information </p>
              </div>
             
            
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.LNEClientReferralForm ? 'checked' : ''}
                  disabled={clientData.LNEClientReferralForm ? true : false}
                  onChange={() =>
                    clientData.LNEClientReferralFormDate ==="" || clientData.LNEClientReferralFormDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm,
                      LNEClientReferralFormDate:new Date()
                    })):setClientData({
                      ...clientData,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm
                    })
                  }
                />
              </div>
              <div>
                <p>LNE Client Referral Form </p>
              </div>
              
    
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid gap-5 py-2  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={clientData.LNEHNSEligibilityForm ? 'checked' : ''}
                  disabled={clientData.LNEHNSEligibilityForm ? true : false}
                  onChange={() =>{
                    clientData.LNEHNSEligibilityFormDate==="" || clientData.LNEHNSEligibilityFormDate ===null ? (
                    setClientData({
                      ...clientData,
                      LNEHNSEligibilityForm: !clientData.LNEHNSEligibilityForm,
                      LNEHNSEligibilityFormDate:new Date()
                    })):setClientData({
                      ...clientData,
                      LNEHNSEligibilityForm: !clientData.LNEHNSEligibilityForm
                    })
                  }}
                />
              </div>
              <div>
                <p>LNE HNS Eligibility Form </p>
              </div>
             
         
            </div>
        </div>
    </div>

</section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5"
               onClick={()=>handleProgressNote()}
              >
                Save and Finish
              </button>


            </div>
          </section>
        </main>
      </Layout>
      {showImpactTrackerModal && (
      <ImpactTrackerModal showImpactTrackerModal={showImpactTrackerModal} 
       setShowImpactTrackerModal={setShowImpactTrackerModal} notifyMessage={notifyMessage}
       clientId={clientData.clientId}
       />)
      }
    </>
  );
};

export default ProgressNotesIndex;

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
      let { clientid } = ctx.params;
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/${clientid}`)
      const data = await response.json();
      console.log("data del server:",data)
      return { props: { data } };
    },
  });
