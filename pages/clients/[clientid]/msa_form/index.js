import React, { useState,useEffect } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'
import { Dropbox } from "dropbox";



import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Index = ({ data }) => {
   const router = useRouter()

console.log("data",data)
  const notifyMessage = () => {
    toast.success("A new MSA Form has been created!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

/*   const crearFecha=()=>{
    const initialDate= new Date().toLocaleDateString()
    const newDate=initialDate.split('/')
    const fixedDate=`${newDate[2]}-${newDate[1].length===1? `0${newDate[1]}`:`${newDate[1]}`}-${newDate[0].length===1 ? `0${newDate[0]}`: `${newDate[0]}`}`
    return fixedDate
  
  } */


  const crearFecha=()=>{

    const initialDate= new Date().toLocaleDateString()
    const newDate=initialDate.split('/')
    let fixedDate;
    if(typeof window !== 'undefined'){
      const userLocale=window.navigator.language
      userLocale==='en-US' ? fixedDate=`${newDate[2]}-${newDate[0].length===1? `0${newDate[0]}`:`${newDate[0]}`}-${newDate[1].length===1 ? `0${newDate[1]}`: `${newDate[1]}`}`
      :fixedDate=`${newDate[2]}-${newDate[1].length===1? `0${newDate[1]}`:`${newDate[1]}`}-${newDate[0].length===1 ? `0${newDate[0]}`: `${newDate[0]}`}`
    }
    return fixedDate
  }

  const [clientData, setClientData] = useState({
    dateFormReviewed:new Date(),
    clientId: data[0]?.clientid,
    clientFirstName: data[0]?.clientfirstname,
    clientLastName: data[0]?.clientlastname,
    clientHCWID: data[0]?.clienthcwid,
    planStartDate: "",
    userFirstName: data[0]?.clienthcwname,
    userLastName: data[0]?.clienthcwlastname,
    AIRSIntakeForm: false,
    AIRSIntakeFormDate: "",
    ComprehensiveRiskBehaviorAssessment: false,
    ComprehensiveRiskBehaviorAssessmentDate: "",
    ServiceActionPlan: false,
    ServiceActionPlanDate: "",
    AIRSCollateralInformation: false,
    AIRSCollateralInformationDate: "",
    AIRSFinancialInformation: false,
    AIRSFinancialInformationDate: "",
    AIRSHIVAIDSRiskHistory: false,
    AIRSHIVAIDSRiskHistoryDate: "",
    AIRSHCVHistory: false,
    AIRSHCVHistoryDate: "",
    AIRSHousingInformation: false,
    AIRSHousingInformationDate: "",
    AIRSInsuranceInformation: false,
    AIRSInsuranceInformationDate: "",
    AIRSSubstanceUseHistory: false,
    AIRSSubstanceUseHistoryDate: "",
    LNEClientRights: false,
    LNEClientRightsDate: "",
    LNEClientGrievancePolicyProcedure: false,
    LNEClientGrievancePolicyProcedureDate: "",
    LNEProgramRules: false,
    LNEProgramRulesDate: "",
    LNEEmergencyContactConsent: false,
    LNEEmergencyContactConsentDate: "",
    LNEConsentForReleaseOfConfidentialInformation: false,
    LNEConsentForReleaseOfConfidentialInformationDate: "",
    HIPPAConsentForm: false,
    HIPPAConsentFormDate: "",
    NYCDOHMHNoticeOfPrivacyPractices: false,
    NYCDOHMHNoticeOfPrivacyPracticesDate: "",
    
    LinkageRetentionAdherenceForms: false,
    LinkageRetentionAdherenceFormsDate : "",
    InternalReferralInformation: false,
    InternalReferralInformationDate: "",
    LNEClientReferralForm: false,
    LNEClientReferralFormDate: "",
    
    HNSEligibilityForm: false,
    HNSEligibilityFormDate: "",
    HNSReadinessForm: false,
    HNSReadinessFormDate: "",
    SupportGroups: false,
    SupportGroupsDate: "",
    IDGForm: false,
    IDGFormDate: "",
    progressNote:"",
    progressNoteDate:"",

    StatusChangesForm:false,
    StatusChangesFormDate:"",
    ComprehensiveRiskBehaviorAssessmentUpdates:false,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:"",
    M11QForm :false,
    M11QFormDate:"",
    CD4VLReports:false,
    CD4VLReportsDate:"",
    InitialTreatmentAdherenceIntake:false,
    InitialTreatmentAdherenceIntakeDate :"",
    TreatmentAdherenceUpdates:false,
    TreatmentAdherenceUpdatesDate:"",
    AirsDrugRegimen:false,
    AirsDrugRegimenDate:"",
    AirsHIVMedicalProvider:false,
    AirsHIVMedicalProviderDate:"",
    AIRSHIVStatusHistory:false,
    AIRSHIVStatusHistoryDate:""
  });

  const todaysDate = new Date();


console.log("clientData",clientData)
const handleMsaform = ()=> {

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/create_msa_form`, {
        clientData
      })
      .then(function (response) {
        if(response.status===200 || response.statusText==='Ok'){
          notifyMessage()
          setTimeout(()=>{
            router.push(`/clients/${clientData.clientId}/profile`)
          },2300)
        } 
      })
      .catch(function (error) {
            console.log("error del server",error)
      });
}

useEffect(()=>{
  /* var dbx = new Dropbox({ accessToken: process.env.NEXT_PUBLIC_DB_ACCESS_TK });
  dbx.filesListFolder({path: `/apps`})
    .then(function(response) {
      console.log('response', response)
      console.log(response.result.entries);
    })
    .catch(function(error) {
      console.error(error);
    }); */


  /*   axios({
      method:'post',
      url:'https://api.dropboxapi.com/2/files/get_metadata',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DB_ACCESS_TK}`
      },
      data:
        {
          "include_deleted": false,
          "include_has_explicit_shared_members": false,
          "include_media_info": false,
          "path": `/clients/${clientData.clientId}`
      }
      
    })
    .then(response=>console.log("response:",response))
    .catch((e)=>console.log(e)) */
},[])

  return (
    <>
    <ToastContainer autoClose={2000} />
      <Layout>
        <div className="container mx-auto">
          <h3 className="font-black text-center my-5">MSA FORM</h3>
        </div>

        

        <main className="container mx-auto">
         
        <button 
        onClick={()=>router.back()}
        className="bg-black hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5 flex items-center">
        <svg className="mr-2" width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
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
                <div className="flex gap-x-2 mb-5 items-center">
                    <img src="/calendar-icon.svg" width="24"/>
                    <h3 className="font-black ">Date</h3>
                  </div>
                  <label className="block">
                    <span className="text-xs">Today&apos;s date</span>
                    <p>{new Date().toLocaleDateString('en',{year:'numeric',month:'numeric',day:'numeric'})}</p>
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
          <h6 className="font-black my-5 text-dark-blue">
          Forms - Please indicate which forms have been completed with the client
          </h6>
          <section
            id="form"
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5"
          >
            {/* {TABLE HEAD} */}
            <p className="text-xs"><span className="text-red-500">*</span> Mandatory fields (Please, fill out these forms to complete the process)</p>
            <div
              id="form-head"
              className={`${MSAStyles.formRowsContainer} bg-dark-blue  text-white grid gap-5 py-2 rounded-tl-lg rounded-tr-lg my-2`}
            >
              <div></div>
              <p>Form name</p>
              <p className="text-center">Date added</p>
              <p className="text-center">Dropbox Folder</p>
            </div>
            {/* {TABLE HEAD} */}

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSIntakeFormDate ==="" || clientData.AIRSIntakeFormDate ===null ? (
                    setClientData({
                      ...clientData,
                      AIRSIntakeForm: !clientData.AIRSIntakeForm,
                      AIRSIntakeFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSIntakeForm: !clientData.AIRSIntakeForm,
                      AIRSIntakeFormDate: '',
                    })
                  }
                }
                checked={clientData.AIRSIntakeFormDate ? true : false} 
                disabled={clientData.AIRSIntakeFormDate ? true : false} 
                />
              </div>
              <div>
                <p>AIRS Intake Form <span className="text-red-500">*</span></p>
              </div>
              <div className="text-center">
                 
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.AIRSIntakeFormDate &&
                    clientData.AIRSIntakeFormDate
                  }
                  /* disabled={clientData.AIRSIntakeFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AIRSIntakeForm){
                      setClientData({
                        ...clientData,
               
                        AIRSIntakeFormDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSIntakeForm: !clientData.AIRSIntakeForm,
                        AIRSIntakeFormDate: e.target.value,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
                <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.ComprehensiveRiskBehaviorAssessmentDate==="" || clientData.ComprehensiveRiskBehaviorAssessmentDate===null ? (
                    setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessment:
                        !clientData.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessment:
                        !clientData.ComprehensiveRiskBehaviorAssessment,
                      ComprehensiveRiskBehaviorAssessmentDate:'',
                    })
                  }
                }
                checked={clientData.ComprehensiveRiskBehaviorAssessment? true : false}
                />
              </div>
              <div>
                <p>Comprehensive Risk Behavior Assessment <span className="text-red-500">*</span> </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentDate
                  }
                  /* disabled={clientData.ComprehensiveRiskBehaviorAssessmentDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData){
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessment:
                          !clientData.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate: e.target.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="flex justify-center">
              <a href={data[0]?.cbra_folder_url ? data[0]?.cbra_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                {/* <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.ServiceActionPlanDate==="" || clientData.ServiceActionPlanDate===null ? (
                    setClientData({
                      ...clientData,
                      ServiceActionPlan: !clientData.ServiceActionPlan,
                      ServiceActionPlanDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      ServiceActionPlan: !clientData.ServiceActionPlan,
                      ServiceActionPlanDate: ''
                    })
                  }}
                  checked={clientData.ServiceActionPlan? true : false}
                /> */}
              </div>
              <div>
                <p>Service Action Plan  </p>
              </div>
              <div className="text-center">
              {clientData.ServiceActionPlanDate ?  <p className="bg-white inline-block px-5 py-1 rounded-lg"> 
                   {clientData.ServiceActionPlanDate.split('T')[0]}</p>: <p className="bg-white inline-block px-5 py-1 rounded-lg">MM/DD/YYYY</p>}
                {/* <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ServiceActionPlanDate &&
                    clientData.ServiceActionPlanDate
                  }
                  disabled={clientData.ServiceActionPlanDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData){
                      setClientData({
                        ...clientData,
                        ServiceActionPlanDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        ServiceActionPlanDate: e.target.value,
                        ServiceActionPlan: !clientData.ServiceActionPlan,
                      });
                    }
                   
                  }}
                /> */}
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.action_plans_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                {/* <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.ServiceActionPlanDate==="" || clientData.ServiceActionPlanDate===null ? (
                    setClientData({
                      ...clientData,
                      ServiceActionPlan: !clientData.ServiceActionPlan,
                      ServiceActionPlanDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      ServiceActionPlan: !clientData.ServiceActionPlan,
                      ServiceActionPlanDate: ''
                    })
                  }}
                  checked={clientData.ServiceActionPlan? true : false}
                /> */}
              </div>
              <div>
                <p>Progress Note </p>
              </div>
              <div className="text-center">
              {clientData.progressNote ?  <p className="bg-white inline-block px-5 py-1 rounded-lg"> 
                   {clientData.progressNoteDate.split('T')[0]}</p>: <p className="bg-white inline-block px-5 py-1 rounded-lg">MM/DD/YYYY</p>}
                {/* <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ServiceActionPlanDate &&
                    clientData.ServiceActionPlanDate
                  }
                  disabled={clientData.ServiceActionPlanDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData){
                      setClientData({
                        ...clientData,
                        ServiceActionPlanDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        ServiceActionPlanDate: e.target.value,
                        ServiceActionPlan: !clientData.ServiceActionPlan,
                      });
                    }
                   
                  }}
                /> */}
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.action_plans_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.StatusChangesFormDate==="" || clientData.StatusChangesFormDate===null ? (
                    setClientData({
                      ...clientData,
                      StatusChangesForm:
                        !clientData.StatusChangesForm,
                        StatusChangesFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      StatusChangesForm :
                        !clientData.StatusChangesForm ,
                        StatusChangesFormDate: '',
                    })
                    }
                  }
                  checked={clientData.StatusChangesForm ? true : false}
                />
              </div>
              <div>
                <p>Status Changes/ClosureForms</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  value={
                    clientData.StatusChangesFormDate &&
                    clientData.StatusChangesFormDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.StatusChangesForm ){
                      setClientData({
                        ...clientData,
                        StatusChangesFormDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        StatusChangesFormDate: e.target.value,
                        StatusChangesForm :
                          !clientData.StatusChangesForm ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>



            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate==="" || clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate===null ? (
                    setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentUpdates:
                        !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentUpdates :
                        !clientData.ComprehensiveRiskBehaviorAssessmentUpdates ,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: '',
                    })
                    }
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessmentUpdates ? true : false}
                />
              </div>
              <div>
                <p>Comprehensive Behavioral Risk Assessment Updates </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.StatusChangesForm ){
                      setClientData({
                        ...clientData,
                        StatusChangesFormDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        StatusChangesFormDate: e.target.value,
                        StatusChangesForm :
                          !clientData.StatusChangesForm ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>



            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.M11QFormDate==="" || clientData.M11QFormDate===null ? (
                    setClientData({
                      ...clientData,
                      M11QForm:
                        !clientData.M11QForm,
                        M11QFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      M11QForm :
                        !clientData.M11QForm ,
                        M11QFormDate: '',
                    })
                    }
                  }
                  checked={clientData.M11QForm ? true : false}
                />
              </div>
              <div>
                <p>
                M11Q
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.M11QFormDate &&
                    clientData.M11QFormDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.M11QForm ){
                      setClientData({
                        ...clientData,
                        M11QFormDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        M11QFormDate: e.target.value,
                        M11QForm :
                          !clientData.M11QForm ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>


            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.CD4VLReportsDate==="" || clientData.CD4VLReports===null ? (
                    setClientData({
                      ...clientData,
                      CD4VLReports:
                        !clientData.CD4VLReports,
                        CD4VLReportsDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      CD4VLReports :
                        !clientData.CD4VLReports ,
                        CD4VLReportsDate: '',
                    })
                    }
                  }
                  checked={clientData.CD4VLReports ? true : false}
                />
              </div>
              <div>
                <p>
                CD4/VL Check Reports
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.CD4VLReportsDate &&
                    clientData.CD4VLReportsDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.CD4VLReports ){
                      setClientData({
                        ...clientData,
                        CD4VLReportsDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        CD4VLReportsDate: e.target.value,
                        CD4VLReports :
                          !clientData.CD4VLReports ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>





            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.InitialTreatmentAdherenceIntakeDate==="" || clientData.InitialTreatmentAdherenceIntake ===null ? (
                    setClientData({
                      ...clientData,
                      InitialTreatmentAdherenceIntake:
                        !clientData.InitialTreatmentAdherenceIntake,
                        InitialTreatmentAdherenceIntakeDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      InitialTreatmentAdherenceIntake :
                        !clientData.InitialTreatmentAdherenceIntake ,
                        InitialTreatmentAdherenceIntakeDate: '',
                    })
                    }
                  }
                  checked={clientData.InitialTreatmentAdherenceIntake ? true : false}
                />
              </div>
              <div>
                <p>
                Initial Treatment Adherence Intake 
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.InitialTreatmentAdherenceIntakeDate &&
                    clientData.InitialTreatmentAdherenceIntakeDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.InitialTreatmentAdherenceIntake ){
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntakeDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntakeDate: e.target.value,
                        InitialTreatmentAdherenceIntake :
                          !clientData.InitialTreatmentAdherenceIntake ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>




            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.TreatmentAdherenceUpdatesDate==="" || clientData.TreatmentAdherenceUpdates ===null ? (
                    setClientData({
                      ...clientData,
                      TreatmentAdherenceUpdates:
                        !clientData.TreatmentAdherenceUpdates,
                        TreatmentAdherenceUpdatesDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      TreatmentAdherenceUpdates :
                        !clientData.TreatmentAdherenceUpdates ,
                        TreatmentAdherenceUpdatesDate: '',
                    })
                    }
                  }
                  checked={clientData.TreatmentAdherenceUpdates ? true : false}
                />
              </div>
              <div>
                <p>
                Treatment Adherence Updates
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.TreatmentAdherenceUpdatesDate &&
                    clientData.TreatmentAdherenceUpdatesDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.TreatmentAdherenceUpdates ){
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdatesDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdatesDate: e.target.value,
                        TreatmentAdherenceUpdates :
                          !clientData.TreatmentAdherenceUpdates ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>









            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AIRSCollateralInformationDate==="" || clientData.AIRSCollateralInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSCollateralInformation:
                        !clientData.AIRSCollateralInformation,
                        AIRSCollateralInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSCollateralInformation:
                        !clientData.AIRSCollateralInformation,
                      AIRSCollateralInformationDate: '',
                    })
                    }
                  }
                  checked={clientData.AIRSCollateralInformation? true : false}
                />
              </div>
              <div>
                <p>AIRS Collateral Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  value={
                    clientData.AIRSCollateralInformationDate &&
                    clientData.AIRSCollateralInformationDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AIRSCollateralInformation){
                      setClientData({
                        ...clientData,
                        AIRSCollateralInformationDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSCollateralInformationDate: e.target.value,
                        AIRSCollateralInformation:
                          !clientData.AIRSCollateralInformation,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>


            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AirsDrugRegimenDate==="" || clientData.AirsDrugRegimen ===null ? (
                    setClientData({
                      ...clientData,
                      AirsDrugRegimen:
                        !clientData.AirsDrugRegimen,
                        AirsDrugRegimenDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AirsDrugRegimen :
                        !clientData.AirsDrugRegimen ,
                        AirsDrugRegimenDate: '',
                    })
                    }
                  }
                  checked={clientData.AirsDrugRegimen ? true : false}
                />
              </div>
              <div>
                <p>
                AIRS Drug Regimen History 
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AirsDrugRegimen"
                  value={
                    clientData.AirsDrugRegimenDate &&
                    clientData.AirsDrugRegimenDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AirsDrugRegimen ){
                      setClientData({
                        ...clientData,
                        AirsDrugRegimenDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AirsDrugRegimenDate : e.target.value,
                        AirsDrugRegimen  :
                          !clientData.AirsDrugRegimen  ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>



            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSFinancialInformationDate ==="" || clientData.AIRSFinancialInformationDate === null ? (
                    setClientData({
                      ...clientData,
                      AIRSFinancialInformation:
                        !clientData.AIRSFinancialInformation,
                        AIRSFinancialInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSFinancialInformation:
                        !clientData.AIRSFinancialInformation,
                      AIRSFinancialInformationDate: '',
                    })
                  }}
                  checked={clientData.AIRSFinancialInformation? true : false}
                />
              </div>
              <div>
                <p>AIRS Financial Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSFinancialInformation"
                  value={
                    clientData.AIRSFinancialInformationDate &&
                    clientData.AIRSFinancialInformationDate
                  }
                 /*  disabled={clientData.AIRSFinancialInformation ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if (clientData.AIRSFinancialInformation){
                      setClientData({
                        ...clientData,
                        AIRSFinancialInformationDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSFinancialInformationDate: e.target.value,
                        AIRSFinancialInformation:
                          !clientData.AIRSFinancialInformation,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSHIVAIDSRiskHistoryDate==="" || clientData.AIRSHIVAIDSRiskHistoryDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistory:
                        !clientData.AIRSHIVAIDSRiskHistory,
                        AIRSHIVAIDSRiskHistoryDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistory:
                        !clientData.AIRSHIVAIDSRiskHistory,
                      AIRSHIVAIDSRiskHistoryDate: ''
                    })
                  }}
                  checked={clientData.AIRSHIVAIDSRiskHistory? true : false}
                />
              </div>
              <div>
                <p>AIRS HIV AIDS Risk History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHIVAIDSRiskHistory"
                  value={
                    clientData.AIRSHIVAIDSRiskHistoryDate &&
                    clientData.AIRSHIVAIDSRiskHistoryDate
                  }
                  /* disabled={clientData.AIRSHIVAIDSRiskHistoryDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AIRSHIVAIDSRiskHistory){
                      setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistoryDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistoryDate: e.target.value,
                        AIRSHIVAIDSRiskHistory:
                          !clientData.AIRSHIVAIDSRiskHistory,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>



            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AirsHIVMedicalProviderDate==="" || clientData.AirsHIVMedicalProvider ===null ? (
                    setClientData({
                      ...clientData,
                      AirsHIVMedicalProvider:
                        !clientData.AirsHIVMedicalProvider,
                        AirsHIVMedicalProviderDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AirsHIVMedicalProvider :
                        !clientData.AirsHIVMedicalProvider ,
                        AirsHIVMedicalProviderDate: '',
                    })
                    }
                  }
                  checked={clientData.AirsHIVMedicalProvider ? true : false}
                />
              </div>
              <div>
                <p>
                AIRS HIV Medical Provider History 
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.AirsHIVMedicalProviderDate &&
                    clientData.AirsHIVMedicalProviderDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AirsHIVMedicalProvider ){
                      setClientData({
                        ...clientData,
                        AirsHIVMedicalProviderDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AirsHIVMedicalProviderDate: e.target.value,
                        AirsHIVMedicalProvider :
                          !clientData.AirsHIVMedicalProvider ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>


            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AIRSHIVStatusHistoryDate ==="" || clientData.AIRSHIVStatusHistory ===null ? (
                    setClientData({
                      ...clientData,
                      AIRSHIVStatusHistory:
                        !clientData.AIRSHIVStatusHistory,
                        AIRSHIVStatusHistoryDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSHIVStatusHistory :
                        !clientData.AIRSHIVStatusHistory ,
                        AIRSHIVStatusHistoryDate: '',
                    })
                    }
                  }
                  checked={clientData.AIRSHIVStatusHistory ? true : false}
                />
              </div>
              <div>
                <p>
                AIRS HIV Status History 
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.AIRSHIVStatusHistoryDate &&
                    clientData.AIRSHIVStatusHistoryDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AIRSHIVStatusHistory ){
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryDate: e.target.value,
                        AIRSHIVStatusHistory :
                          !clientData.AIRSHIVStatusHistory ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>




            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSHCVHistoryDate==="" || clientData.AIRSHCVHistoryDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSHCVHistory: !clientData.AIRSHCVHistory,
                      AIRSHCVHistoryDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSHCVHistory: !clientData.AIRSHCVHistory,
                      AIRSHCVHistoryDate: ''
                    })
                  }
                }
                checked={clientData.AIRSHCVHistory? true : false}
                />
              </div>
              <div>
                <p>AIRS HCV History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  value={
                    clientData.AIRSHCVHistoryDate &&
                    clientData.AIRSHCVHistoryDate
                  }
                  /* disabled={clientData.AIRSHCVHistoryDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AIRSHCVHistory){
                      setClientData({
                        ...clientData,
                        AIRSHCVHistoryDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHCVHistoryDate: e.target.value,
                        AIRSHCVHistory: !clientData.AIRSHCVHistory,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              
                <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                 
                    clientData.AIRSHousingInformationDate==="" || clientData.AIRSHousingInformationDate=== null ? (
                    setClientData({
                      ...clientData,
                      AIRSHousingInformation:
                        !clientData.AIRSHousingInformation,
                        AIRSHousingInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSHousingInformation:
                        !clientData.AIRSHousingInformation,
                      AIRSHousingInformationDate: '',
                    })
                  }
                }
                checked={clientData.AIRSHousingInformation? true : false}
                />
              </div>
              <div>
                <p>AIRS Housing Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHousingInformation"
                  value={
                    clientData.AIRSHousingInformationDate &&
                    clientData.AIRSHousingInformationDate
                  }
                  /* disabled={clientData.AIRSHousingInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AIRSHousingInformation){
                      setClientData({
                        ...clientData,
                        AIRSHousingInformationDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHousingInformationDate: e.target.value,
                        AIRSHousingInformation:
                          !clientData.AIRSHousingInformation,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSInsuranceInformationDate==="" || clientData.AIRSInsuranceInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformation:
                        !clientData.AIRSInsuranceInformation,
                        AIRSInsuranceInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSInsuranceInformation:
                        !clientData.AIRSInsuranceInformation,
                      AIRSInsuranceInformationDate: '',
                    })
                  }}
                  checked={clientData.AIRSInsuranceInformation? true : false}
                />
              </div>
              <div>
                <p>AIRS Insurance Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSInsuranceInformation"
                  value={
                    clientData.AIRSInsuranceInformationDate &&
                    clientData.AIRSInsuranceInformationDate
                  }
                  /* disabled={clientData.AIRSInsuranceInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if (clientData.AIRSInsuranceInformation){
                      setClientData({
                        ...clientData,
                        AIRSInsuranceInformationDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSInsuranceInformationDate: e.target.value,
                        AIRSInsuranceInformation:
                          !clientData.AIRSInsuranceInformation,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSSubstanceUseHistoryDate==="" || clientData.AIRSSubstanceUseHistoryDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistory:
                        !clientData.AIRSSubstanceUseHistory,
                        AIRSSubstanceUseHistoryDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistory:
                        !clientData.AIRSSubstanceUseHistory,
                      AIRSSubstanceUseHistoryDate: ''
                    })
                  }}
                  checked={clientData.AIRSSubstanceUseHistory? true : false}
                />
              </div>
              <div>
                <p>AIRS Substance Use History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSSubstanceUseHistory"
                  value={
                    clientData.AIRSSubstanceUseHistoryDate &&
                    clientData.AIRSSubstanceUseHistoryDate
                  }
                  /* disabled={clientData.AIRSSubstanceUseHistoryDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AIRSSubstanceUseHistory){
                      setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistoryDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistoryDate: e.target.value,
                        AIRSSubstanceUseHistory:
                          !clientData.AIRSSubstanceUseHistory,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.LNEClientRightsDate==="" || clientData.LNEClientRightsDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEClientRights: !clientData.LNEClientRights,
                      LNEClientRightsDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEClientRights: !clientData.LNEClientRights,
                      LNEClientRightsDate: '',
                    })
                  }}
                  checked={clientData.LNEClientRights? true : false}
                />
              </div>
              <div>
                <p>LNE Client Rights </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientRights"
                  value={
                    clientData.LNEClientRightsDate &&
                    clientData.LNEClientRightsDate
                  }
                  /* disabled={clientData.LNEClientRightsDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.LNEClientRights){
                      setClientData({
                        ...clientData,
                        LNEClientRightsDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEClientRightsDate: e.target.value,
                        LNEClientRights: !clientData.LNEClientRights,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.LNEClientGrievancePolicyProcedureDate==="" || clientData.LNEClientGrievancePolicyProcedureDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedure:
                        !clientData.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedure:
                        !clientData.LNEClientGrievancePolicyProcedure,
                      LNEClientGrievancePolicyProcedureDate: '',
                    })
                  }}
                  checked={clientData.LNEClientGrievancePolicyProcedure? true : false}
                />
              </div>
              <div>
                <p>LNE Client Grievance Policy & Procedure </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEClientGrievancePolicyProcedureDate &&
                    clientData.LNEClientGrievancePolicyProcedureDate
                  }
                  /* disabled={clientData.LNEClientGrievancePolicyProcedureDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.LNEClientGrievancePolicyProcedure){
                      setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedureDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedureDate: e.target.value,
                        LNEClientGrievancePolicyProcedure:
                          !clientData.LNEClientGrievancePolicyProcedure,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.LNEProgramRulesDate==="" || clientData.LNEProgramRulesDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEProgramRules: !clientData.LNEProgramRules,
                      LNEProgramRulesDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEProgramRules: !clientData.LNEProgramRules,
                      LNEProgramRulesDate: ''
                    })
                  }
                }
                checked={clientData.LNEProgramRules? true : false}
                />
              </div>
              <div>
                <p>LNE Program Rules </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEProgramRulesDate &&
                    clientData.LNEProgramRulesDate
                  }
                  /* disabled={clientData.LNEProgramRulesDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.LNEProgramRules){
                      setClientData({
                        ...clientData,
                        LNEProgramRulesDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEProgramRulesDate: e.target.value,
                        LNEProgramRules: !clientData.LNEProgramRules,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.LNEEmergencyContactConsentDate==="" || clientData.LNEEmergencyContactConsentDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEEmergencyContactConsent:
                        !clientData.LNEEmergencyContactConsent,
                        LNEEmergencyContactConsentDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEEmergencyContactConsent:
                        !clientData.LNEEmergencyContactConsent,
                      LNEEmergencyContactConsentDate: ''
                    })
                  }}
                  checked={clientData.LNEEmergencyContactConsent? true : false}
                />
              </div>
              <div>
                <p>LNE Emergency Contact Consent </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEEmergencyContactConsentDate &&
                    clientData.LNEEmergencyContactConsentDate
                  }
                  /* disabled={clientData.LNEEmergencyContactConsentDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.LNEEmergencyContactConsent){
                      setClientData({
                        ...clientData,
                        LNEEmergencyContactConsentDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEEmergencyContactConsentDate: e.target.value,
                        LNEEmergencyContactConsent:
                          !clientData.LNEEmergencyContactConsent,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate==="" || clientData.LNEConsentForReleaseOfConfidentialInformationDate===null ? (
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformation:
                          !clientData.LNEConsentForReleaseOfConfidentialInformation,
                          LNEConsentForReleaseOfConfidentialInformationDate:crearFecha()
                      })
                    ):setClientData({
                      ...clientData,
                      LNEConsentForReleaseOfConfidentialInformation:
                        !clientData.LNEConsentForReleaseOfConfidentialInformation,
                      LNEConsentForReleaseOfConfidentialInformationDate: '',
                    })
                  }
                  }
                  checked={clientData.LNEConsentForReleaseOfConfidentialInformation? true : false}
                />
              </div>
              <div>
                <p>LNE Consent for Release of Confidential Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEConsentForReleaseOfConfidentialInformation"
                  value={
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate &&
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate
                  }
                  /* disabled={clientData.LNEConsentForReleaseOfConfidentialInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.LNEConsentForReleaseOfConfidentialInformation){
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformationDate:
                          e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformationDate:
                          e.target.value,
                        LNEConsentForReleaseOfConfidentialInformation:
                        !clientData.LNEConsentForReleaseOfConfidentialInformation,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.HIPPAConsentFormDate==="" || clientData.HIPPAConsentFormDate===null ? (
                    setClientData({
                      ...clientData,
                      HIPPAConsentForm: !clientData.HIPPAConsentForm,
                      HIPPAConsentFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      HIPPAConsentForm: !clientData.HIPPAConsentForm,
                      HIPPAConsentFormDate: ''
                    })
                  }
                  }
                  checked={clientData.HIPPAConsentForm? true : false}
                />
              </div>
              <div>
                <p>HIPAA Consent Form (OCA Form 960)</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  value={
                    clientData.HIPPAConsentFormDate &&
                    clientData.HIPPAConsentFormDate
                  }
                  disabled={clientData.HIPPAConsentFormDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.HIPPAConsentForm){
                      setClientData({
                        ...clientData,
                        HIPPAConsentFormDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        HIPPAConsentFormDate: e.target.value,
                        HIPPAConsentForm: !clientData.HIPPAConsentForm,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate==="" || clientData.NYCDOHMHNoticeOfPrivacyPracticesDate===null ? (
                    setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPractices:
                        !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                        NYCDOHMHNoticeOfPrivacyPracticesDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPractices:
                        !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                      NYCDOHMHNoticeOfPrivacyPracticesDate: ''
                    })
                  }
                  }
                  checked={clientData.NYCDOHMHNoticeOfPrivacyPractices? true : false}
                />
              </div>
              <div>
                <p>
                  NYC DOHMH Notice of Privacy Practices - Acknowledgement of
                  Receipt{" "}
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="NYCDOHMHNoticeOfPrivacyPractices"
                  value={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate &&
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate
                  }
                  disabled={clientData.NYCDOHMHNoticeOfPrivacyPracticesDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.NYCDOHMHNoticeOfPrivacyPractices){
                      setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPracticesDate: e.target.value

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPracticesDate: e.target.value,
                        NYCDOHMHNoticeOfPrivacyPractices:
                          !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2 rounded-lg my-2`}>
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.LinkageRetentionAdherenceFormsDate==="" || clientData.LinkageRetentionAdherenceFormsDate===null ? (
                    setClientData({
                      ...clientData,
                      LinkageRetentionAdherenceForms:
                        !clientData.LinkageRetentionAdherenceForms,
                        LinkageRetentionAdherenceFormsDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LinkageRetentionAdherenceForms:
                        !clientData.LinkageRetentionAdherenceForms,
                      LinkageRetentionAdherenceFormsDate: ''
                    })
                  }
                  }
                  checked={clientData.LinkageRetentionAdherenceForms? true: false}
                />
              </div>
              <div>
                <p>Linkage, Retention, & Adherence Forms</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LinkageRetentionAdherenceForms"
                  value={
                    clientData.LinkageRetentionAdherenceFormsDate &&
                    clientData.LinkageRetentionAdherenceFormsDate
                  }
                  disabled={clientData.LinkageRetentionAdherenceFormsDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.LinkageRetentionAdherenceForms){
                      setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceFormsDate: e.target.value
      
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceFormsDate: e.target.value,
                        LinkageRetentionAdherenceForms:
                          !clientData.LinkageRetentionAdherenceForms,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.linkage_navigation_folder_url ? data[0]?.linkage_navigation_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    
                    clientData.InternalReferralInformationDate==="" || clientData.InternalReferralInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      InternalReferralInformation:
                        !clientData.InternalReferralInformation,
                        InternalReferralInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      InternalReferralInformation:
                        !clientData.InternalReferralInformation,
                      InternalReferralInformationDate: ''
                    })
                  }
                }
                checked={clientData.InternalReferralInformation? true: false}
                />
              </div>
              <div>
                <p>Internal Referral Information</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEOutreachRetentionTrackingForm"
                  value={
                    clientData.InternalReferralInformationDate &&
                    clientData.InternalReferralInformationDate
                  }
                  disabled={clientData.InternalReferralInformationDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.InternalReferralInformation){
                      setClientData({
                        ...clientData,
                        InternalReferralInformationDate: e.target.value,
              
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        InternalReferralInformationDate: e.target.value,
                        InternalReferralInformation:
                          !clientData.InternalReferralInformation,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    clientData.LNEClientReferralFormDate ==="" || clientData.LNEClientReferralFormDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm,
                      LNEClientReferralFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm,
                      LNEClientReferralFormDate: ''
                    })
                  }
                  checked={clientData.LNEClientReferralForm?  true : false}
                />
              </div>
              <div>
                <p>Identification</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientReferralForm"
                  value={
                    clientData.LNEClientReferralFormDate &&
                    clientData.LNEClientReferralFormDate
                  }
                  disabled={clientData.LNEClientReferralFormDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.LNEClientReferralForm){
                      setClientData({
                        ...clientData,
                        LNEClientReferralFormDate: e.target.value,
                      });
                    } else {
                    setClientData({
                      ...clientData,
                      LNEClientReferralFormDate: e.target.value,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm,
                    });
                  }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.HNSEligibilityFormDate==="" || clientData.HNSEligibilityFormDate ===null ? (
                    setClientData({
                      ...clientData,
                      HNSEligibilityForm: !clientData.HNSEligibilityForm,
                      HNSEligibilityFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      HNSEligibilityForm: !clientData.HNSEligibilityForm,
                      HNSEligibilityFormDate: ''
                    })
                  }}
                  checked={clientData.HNSEligibilityForm? true : false}
                />
              </div>
              <div>
                <p>HNS Eligibility Assessment</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSEligibilityForm"
                  value={
                    clientData.HNSEligibilityFormDate &&
                    clientData.HNSEligibilityFormDate
                  }
                  disabled={clientData.HNSEligibilityFormDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {

                    if(clientData.HNSEligibilityForm){
                      setClientData({
                        ...clientData,
                        HNSEligibilityFormDate: e.target.value,
                    
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        HNSEligibilityFormDate: e.target.value,
                        HNSEligibilityForm: !clientData.HNSEligibilityForm,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.HNSReadinessFormDate==="" || clientData.HNSReadinessFormDate ===null ? (
                    setClientData({
                      ...clientData,
                      HNSReadinessForm: !clientData.HNSReadinessForm,
                      HNSReadinessFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      HNSReadinessForm: !clientData.HNSReadinessForm,
                      HNSReadinessFormDate: ''
                    })
                  }}
                  checked={clientData.HNSReadinessForm? true : false}
                />
              </div>
              <div>
                <p>HNS Readiness Assessment</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSReadinessForm"
                  value={
                    clientData.HNSReadinessFormDate &&
                    clientData.HNSReadinessFormDate
                  }
                  disabled={clientData.HNSReadinessFormDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {

                    if(clientData.HNSReadinessForm){
                      setClientData({
                        ...clientData,
                        HNSReadinessFormDate: e.target.value,
                    
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        HNSReadinessFormDate: e.target.value,
                        HNSReadinessForm: !clientData.HNSReadinessForm,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.SupportGroupsDate==="" || clientData.SupportGroupsDate ===null ? (
                    setClientData({
                      ...clientData,
                      SupportGroups: !clientData.SupportGroups,
                      SupportGroupsDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      SupportGroups: !clientData.SupportGroups,
                      SupportGroupsDate: ''
                    })
                  }}
                  checked={clientData.SupportGroups? true : false}
                />
              </div>
              <div>
                <p>Support Groups</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="SupportGroups"
                  value={
                    clientData.SupportGroupsDate &&
                    clientData.SupportGroupsDate
                  }
                  disabled={clientData.SupportGroupsDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {

                    if(clientData.SupportGroups){
                      setClientData({
                        ...clientData,
                        SupportGroupsDate: e.target.value,
                    
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        SupportGroupsDate: e.target.value,
                        SupportGroups: !clientData.SupportGroups,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.IDGFormDate==="" || clientData.IDGFormDate ===null ? (
                    setClientData({
                      ...clientData,
                      IDGForm: !clientData.IDGForm,
                      IDGFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      IDGForm: !clientData.IDGForm,
                      IDGFormDate: ''
                    })
                  }}
                  checked={clientData.IDGForm? true : false}
                />
              </div>
              <div>
                <p>IDG</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="IDGForm"
                  value={
                    clientData.IDGFormDate &&
                    clientData.IDGFormDate
                  }
                  disabled={clientData.IDGFormDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {

                    if(clientData.IDGForm){
                      setClientData({
                        ...clientData,
                        IDGFormDate: e.target.value,
                    
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        IDGFormDate: e.target.value,
                        IDGForm: !clientData.IDGForm,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
          </section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5"
              onClick={()=>handleMsaform()}
              >
                Save and Update
              </button>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Index;

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