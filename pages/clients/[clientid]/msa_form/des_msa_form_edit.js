import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditMsaFormPage = ({ data }) => {

  console.log("data",data)

  const router = useRouter()

  const notifyMessage = () => {
    toast.success("MSA Form updated!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };


  const { user, error, isLoading } = useUser();
  const loggedUserRole = user && user["https://lanuevatest.herokuapp.com/roles"];

  const disableUserIfNotSupervisor = () => loggedUserRole === 'HCW' ? true : false


  const [clientData, setClientData] = useState({
    dateFormReviewed: new Date(),
    clientId: data[0].clientid,
    clientFirstName: data[0].clientfirstname,
    clientLastName: data[0].clientlastname,
    clientHCWID: data[0].clienthcwid,
    planStartDate: "",
    userFirstName: data[0].userfirstname,
    userLastName: data[0].userlastname,
    AIRSIntakeForm:  data[0].AIRSIntakeForm === "0" || data[0].AIRSIntakeForm === null ? false : true,
    AIRSIntakeFormDate: data[0].airsintakeformdate,
    AIRSIntakeFormPDF: data[0].airsintakeformpdf=== "0" || data[0].airsintakeformpdf=== null ? false : true,
    AIRSIntakeFormScan: data[0].airsintakeformscan=== "0" || data[0].airsintakeformscan=== null ? false : true,
    AIRSIntakeFormUploadDate: data[0].airsintakeformuploaddate || null,
    ComprehensiveRiskBehaviorAssessment: data[0].comprehensiveriskbehaviorassessment === "0" || data[0].comprehensiveriskbehaviorassessment === null ? false : true,
    ComprehensiveRiskBehaviorAssessmentDate: data[0].comprehensiveriskbehaviorassessmentdate,
    ComprehensiveRiskBehaviorAssessmentPDF: data[0].comprehensiveriskbehaviorassessmentpdf=== "0" || data[0].comprehensiveriskbehaviorassessmentpdf=== null ? false : true,
    ComprehensiveRiskBehaviorAssessmentScan: data[0].comprehensiveriskbehaviorassessmentscan=== "0" || data[0].comprehensiveriskbehaviorassessmentscan=== null ? false : true,
    ComprehensiveRiskBehaviorAssessmentUploadDate: data[0].comprehensiveriskbehaviorassessmentuploaddate || null,
    ServiceActionPlan: data[0].serviceactionplan === "0" || data[0].serviceactionplan === null ? false : true,
    ServiceActionPlanDate: data[0].serviceactionplandate,
    // ServiceActionPlanPDF: data[0].serviceactionplanpdf === "0" ? true : false,
    ServiceActionPlanScan :  data[0].serviceactionplanscan=== "0" || data[0].serviceactionplanscan=== null ? false : true,
    ServiceActionPlanUploadDate: data[0].serviceactionplanuploaddate || null,
    AIRSCollateralInformation: true,
    AIRSCollateralInformationDate:data[0].serviceactionplandate,
    AIRSCollateralInformationPDF: data[0].airscollateralinformationpdf=== "0" || data[0].airscollateralinformationpdf=== null ? false : true,
    AIRSCollateralInformationScan: data[0].airscollateralinformationscan=== "0" || data[0].airscollateralinformationscan=== null ? false : true,
    AIRSCollateralInformationUploadDate: data[0].airsCollateralInformationuploaddate || null,

    AIRSFinancialInformation: data[0].airsfinancialinformation === "0" || data[0].airsfinancialinformation === null ? false : true,
    AIRSFinancialInformationDate: data[0].airsfinancialinformationdate,
    AIRSFinancialInformationPDF: data[0].airsfinancialinformationpdf=== "0" || data[0].airsfinancialinformationpdf=== null ? false : true,
    AIRSFinancialInformationScan: data[0].airsfinancialinformationscan=== "0" || data[0].airsfinancialinformationscan===null ? false : true,
    AIRSFinancialInformationUploadDate: data[0].airsFinancialInformationuploaddate || null,

    AIRSHIVAIDSRiskHistory: data[0].airshivaidsriskhistory === "0" || data[0].airshivaidsriskhistory === null ? false : true,
    AIRSHIVAIDSRiskHistoryDate: data[0].airshivaidsriskhistorydate,
    AIRSHIVAIDSRiskHistoryPDF: data[0].airshivaidsriskhistorypdf==="0" || data[0].airshivaidsriskhistorypdf===null ? false: true, 
    AIRSHIVAIDSRiskHistoryScan: data[0].airshivaidsriskhistoryscan==="0" || data[0].airshivaidsriskhistoryscan===null ? false: true, 
    AIRSHIVAIDSRiskHistoryUploadDate: data[0].airshivaidsriskhistoryuploaddate || null,

    AIRSHCVHistory: data[0].airshcvhistory === "0" || data[0].airshcvhistory === null ? false : true,
    AIRSHCVHistoryDate: data[0].airshcvhistorydate,
    AIRSHCVHistoryPDF: data[0].airshcvhistorypdf=== "0" || data[0].airshcvhistorypdf=== null  ? false : true, 
    AIRSHCVHistoryScan: data[0].airshcvhistoryscan=== "0"  || data[0].airshcvhistoryscan=== null ? false : true, 
    AIRSHCVHistoryUploadDate: data[0].airshcvhistoryuploaddate || null,

    AIRSHousingInformation: data[0].airshousinginformation === "0" || data[0].airshousinginformation === null ? false : true,
    AIRSHousingInformationDate: data[0].airshousinginformationdate,
    AIRSHousingInformationPDF: data[0].airshousinginformationpdf=== "0" || data[0].airshousinginformationpdf=== null ? false: true, 
    AIRSHousingInformationScan: data[0].airshousinginformationscan=== "0" || data[0].airshousinginformationscan=== null ? false: true, 
    AIRSHousingInformationUploadDate: data[0].airshousinginformationuploaddate || null,

    AIRSInsuranceInformation: data[0].airsinsuranceinformation === "0" || data[0].airsinsuranceinformation === null ? false : true,
    AIRSInsuranceInformationDate: data[0].airsinsuranceinformationdate,
    AIRSInsuranceInformationPDF: data[0].airsinsuranceinformationpdf=== "0" || data[0].airsinsuranceinformationpdf=== null ? false : true, 
    AIRSInsuranceInformationScan : data[0].airsinsuranceinformationscan=== "0" || data[0].airsinsuranceinformationscan=== null ? false : true, 
    AIRSInsuranceInformationUploadDate: data[0].airsinsuranceinformationuploaddate || null,

    AIRSSubstanceUseHistory: data[0].airssubstanceusehistory === "0" || data[0].airssubstanceusehistory === null ? false : true,
    AIRSSubstanceUseHistoryDate: data[0].airssubstanceusehistorydate,
    AIRSSubstanceUseHistoryPDF: data[0].airssubstanceusehistorypdf==="0" || data[0].airssubstanceusehistorypdf===null ? false : true, 
    AIRSSubstanceUseHistoryScan : data[0].airssubstanceusehistoryscan==="0" || data[0].airssubstanceusehistoryscan===null ? false : true, 
    AIRSSubstanceUseHistoryUploadDate: data[0].airssubstanceusehistoryuploaddate || null,

    LNEClientRights: data[0].lneclientrights === "0" || data[0].lneclientrights === null ? false : true,
    LNEClientRightsDate: data[0].lneclientrightsdate,
    LNEClientRightsPDF: data[0].lneclientrightspdf=== "0" || data[0].lneclientrightspdf=== null ? false : true, 
    LNEClientRightsScan: data[0].lneclientrightsscan=== "0" || data[0].lneclientrightsscan=== null ? false : true, 
    LNEClientRightsUploadDate: data[0].lneclientrightsuploaddate || null,

    LNEClientGrievancePolicyProcedure: data[0].lneclientgrievancepolicyprocedure === "0" || data[0].lneclientgrievancepolicyprocedure === null ? false : true,
    LNEClientGrievancePolicyProcedureDate: data[0].lneclientgrievancepolicyproceduredate,
    LNEClientGrievancePolicyProcedurePDF: data[0].lneclientgrievancepolicyprocedurepdf=== "0" || data[0].lneclientgrievancepolicyprocedurepdf=== null ? false : true, 
    LNEClientGrievancePolicyProcedureScan : data[0].lneclientgrievancepolicyprocedurescan=== "0" || data[0].lneclientgrievancepolicyprocedurescan=== null ? false : true, 
    LNEClientGrievancePolicyProcedureUploadDate: data[0].lneclientgrievancepolicyprocedureuploaddate || null,

    LNEProgramRules: data[0].lneprogramrules === "0" || data[0].lneprogramrules === null ? false : true,
    LNEProgramRulesDate: data[0].lneprogramrulesdate,
    LNEProgramRulesPDF: data[0].lneprogramrulespdf=== "0" || data[0].lneprogramrulespdf=== null  ? false : true, 
    LNEProgramRulesScan: data[0].lneprogramrulesscan=== "0"  || data[0].lneprogramrulesscan=== null ? false : true, 
    LNEProgramRulesUploadDate: data[0].lneprogramrulesuploaddate || null,

    LNEEmergencyContactConsent: data[0].lneemergencycontactconsent === "0" || data[0].lneemergencycontactconsent === null ? false : true,
    LNEEmergencyContactConsentDate: data[0].lneemergencycontactconsentdate,
    LNEEmergencyContactConsentPDF: data[0].lneemergencycontactconsentpdf=== "0"  || data[0].lneemergencycontactconsentpdf=== null ? false : true,
    LNEEmergencyContactConsentScan: data[0].lneemergencycontactconsentscan=== "0" || data[0].lneemergencycontactconsentscan=== null ? false : true,
    LNEEmergencyContactConsentUploadDate: data[0].lneemergencycontactconsentuploaddate || null,

    LNEConsentForReleaseOfConfidentialInformation: data[0].lneconsentforreleaseofconfidentialinformation === "0" || data[0].lneconsentforreleaseofconfidentialinformation === null ? false : true,
    LNEConsentForReleaseOfConfidentialInformationDate: data[0].lneconsentforreleaseofconfidentialinformationdate,
    LNEConsentForReleaseOfConfidentialInformationPDF: data[0].lneconsentforreleaseofconfidentialinformationpdf=== "0" || data[0].lneconsentforreleaseofconfidentialinformationpdf=== null ? false : true,
    LNEConsentForReleaseOfConfidentialInformationScan: data[0].lneconsentforreleaseofconfidentialinformationscan=== "0" || data[0].lneconsentforreleaseofconfidentialinformationscan=== null ? false : true,
    LNEConsentForReleaseOfConfidentialInformationUploadDate: data[0].lneconsentforreleaseofconfidentialinformationuploaddate || null,

    HIPPAConsentForm: data[0].hippaconsentform === "0" || data[0].hippaconsentform === null ? false : true,
    HIPPAConsentFormDate: data[0].hippaconsentformdate,
    HIPPAConsentFormPDF: data[0].hippaconsentformpdf=== "0" || data[0].hippaconsentformpdf=== null ? false : true,
    HIPPAConsentFormScan : data[0].hippaconsentformscan=== "0" || data[0].hippaconsentformscan=== null ? false : true,
    HIPPAConsentFormUploadDate: data[0].hippaconsentformuploaddate || null,

    NYCDOHMHNoticeOfPrivacyPractices: data[0].nycdohmhnoticeofprivacypractices === "0" || data[0].nycdohmhnoticeofprivacypractices === null ? false : true,
    NYCDOHMHNoticeOfPrivacyPracticesDate: data[0].nycdohmhnoticeofprivacypracticesdate,
    NYCDOHMHNoticeOfPrivacyPracticesPDF: data[0].nycdohmhnoticeofprivacypracticespdf=== "0" || data[0].nycdohmhnoticeofprivacypracticespdf=== null ? false : true,
    NYCDOHMHNoticeOfPrivacyPracticesScan : data[0].nycdohmhnoticeofprivacypracticesscan=== "0" || data[0].nycdohmhnoticeofprivacypracticesscan=== null ? false : true,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate: data[0].nycdohmhnoticeofprivacypracticesuploaddate || null,

    LNEOutreachRetentionTrackingForm: data[0].lneoutreachretentiontrackingform === "0" || data[0].lneoutreachretentiontrackingform === null ? false : true,
    LNEOutreachRetentionTrackingFormDate: data[0].lneoutreachretentiontrackingformdate,
    LNEOutreachRetentionTrackingFormPDF: data[0].lneoutreachretentiontrackingformpdf=== "0" || data[0].lneoutreachretentiontrackingformpdf=== null ? false : true,
    LNEOutreachRetentionTrackingFormScan: data[0].lneoutreachretentiontrackingformscan=== "0" || data[0].lneoutreachretentiontrackingformscan=== null ? false : true,
    LNEOutreachRetentionTrackingFormUploadDate: data[0].lneoutreachretentiontrackingformuploaddate || null,

    LNEReferralInformation: data[0].lnereferralinformation === "0" || data[0].lnereferralinformation === null ? false : true,
    LNEReferralInformationDate: data[0].lnereferralinformationdate,
    LNEReferralInformationPDF:  data[0].lnereferralinformationpdf=== "0" || data[0].lnereferralinformationpdf=== null ? false : true,
    LNEReferralInformationScan:  data[0].lnereferralinformationscan=== "0" || data[0].lnereferralinformationscan=== null ? false : true,
    LNEReferralInformationUploadDate: data[0].lnereferralinformationuploaddate || null,

    LNEClientReferralForm: data[0].lneclientreferralform === "0" || data[0].lneclientreferralform === null ? false : true,
    LNEClientReferralFormDate: data[0].lneclientreferralformdate,
    LNEClientReferralFormPDF: data[0].lneclientreferralformpdf=== "0" || data[0].lneclientreferralformpdf=== null ? false : true,
    LNEClientReferralFormScan: data[0].lneclientreferralformscan=== "0" || data[0].lneclientreferralformscan=== null ? false : true,
    LNEClientReferralFormUploadDate: data[0].lnereferralinformationuploaddate || null,

    LNEHNSEligibilityForm: data[0].lnehnseligibilityform === "0" || data[0].lnehnseligibilityform === null ? false : true,
    LNEHNSEligibilityFormDate: data[0].lnehnseligibilityformdate,
    LNEHNSEligibilityFormPDF: data[0].lnehnseligibilityformpdf=== "0" || data[0].lnehnseligibilityformpdf=== null ? false : true,
    LNEHNSEligibilityFormScan: data[0].lnehnseligibilityformscan=== "0" || data[0].lnehnseligibilityformscan=== null ? false : true,
    LNEHNSEligibilityFormUploadDate: data[0].lnehnseligibilityformuploaddate || null
  });
  const todaysDate = new Date();



//WORK IN PROGRESS, TRYING TO ITERATE THE STATE
  // [['AIRSIntakeForm', true], [...]...]
  const clientForms = Object.entries(clientData).slice(8)
  const FormTitles = clientForms.filter((form, i) => i % 5 === 0 && form[0]);
  const AirsIntakeForm = `${FormTitles[0][0].slice(0, 4)} ${FormTitles[0][0].slice(4, 10)} ${FormTitles[0][0].slice(10, 15)}`
  const CompRiskBehASS = `${FormTitles[1][0].slice(0, 13)} ${FormTitles[1][0].slice(13, 17)} ${FormTitles[1][0].slice(17, 25)} ${FormTitles[2][0].slice(25)}`;
  const ServActioPla = `${FormTitles[2][0].slice(0, 7)} ${FormTitles[2][0].slice(7, 13)} ${FormTitles[2][0].slice(13, 17)}`

console.log("clientData",clientData);
  const handleMsaform = () => {

/*     notifyMessage()
          setTimeout(() => {
            router.push(`/clients/${clientData.clientId}/profile`)
          }, 2300) */

    axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update_des_msa_form`, {
      clientData
    })
      .then(function (response) {
        console.log(response)
        if (response.status === 200 || response.statusText === 'Ok') {
          notifyMessage()
          setTimeout(() => {
            router.push(`/dashboard`)
          }, 2300)
        
        } 
      })
      .catch(function (error) {
        console.log(error)
        res.send(error)
      });
  }

  const crearFecha = () => {
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

  return (
    <><ToastContainer autoClose={2000} />
      <Layout>

        <div className="container mx-auto">
          <h3 className="font-black text-center my-5">DES Edit MSA FORM</h3>
        </div>
       {/*  <div className="container bg-blue-50 rounded-xl p-5 mx-auto">
          <div className="flex flex-col items-center max-w-fit">
            <svg
              width="24"
              height="24"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              xmlns="http://www.w3.org/2000/svg"
              className="font-black"
            >
              <path
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <p className="text-dark-blue">{clientData.clientId}</p>
            <button className="flex items-center bg-blue-500 hover:bg-blue-300 px-3 py-1 rounded text-white inline-block text-xs"
           onClick={() => router.push("/dashboard")}>
              <svg className="mr-1" width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>Dashboard
            </button>
          </div>
        </div> */}
        <main className="container mx-auto">

          <button
            onClick={() => router.back()}
            className="bg-black hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5 flex items-center">
            <svg className="mr-2" width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Dashboard
          </button>
          <section id="info" className="my-5">
            <div className="">
              <h6 className="font-black mt-5 mb-2 px-2 text-dark-blue">
                Information
              </h6>
              <div
                className={`${Styles.serviceActionPlanPageInfoContainer} gap-x-5 border-dark-blue rounded-xl p-5`}
              >
                <div className="service-action-plan-page-info-box md:my-0 my-5">
                  <h3 className="font-black mb-5">Date</h3>
                  <label className="block">
                    <span className="text-xs">Todays date</span>
                    <p>{todaysDate.toLocaleDateString()}</p>
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
          <h6 className="font-black mt-5 mb-2 px-2 text-dark-blue">
            Indicate which of the following forms you have uploaded to the client&apos;s Dropbox
          </h6>
          <section
            id="form"
            className={`relative border-dark-blue rounded-xl mb-5`}
          >
            {/* {TABLE HEAD} */}
            {/* <div className={`${MSAStyles.line}`}></div> */}
            <div
              id="form-head"
              className={`${MSAStyles.formRowsContainerDesFormEdit} grid gap-5 justify-center items-end rounded-tl-lg rounded-tr-lg py-1 mx-1`}
            >

              <div></div>
              <div></div>
              <p className="text-center">Date added</p>
              <p className="text-center">Dropbox Folder</p>
              <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16.532" height="16"><g fill="#161615"><path d="M3.376 1.147v1.082c-.349.017-.669.036-.989.047a1.048 1.048 0 0 0-1.153 1 11.209 11.209 0 0 0-.008 1.232h14a2.413 2.413 0 0 0-.191-1.858c-.46-.643-1.2-.233-1.869-.462l-.05-.981c2.341-.609 3.428.845 3.417 2.425q-.034 4.9 0 9.805a2.424 2.424 0 0 1-2.57 2.56c-3.812-.063-7.626-.016-11.439-.021a2.263 2.263 0 0 1-2.5-2.512c-.005-3.2.058-6.4-.025-9.592C-.045 2.097 1 .697 3.376 1.147M1.268 5.806c-.021.207-.052.367-.052.527 0 2.37-.009 4.74 0 7.11 0 .918.373 1.337 1.189 1.339q5.865.012 11.731 0a1.036 1.036 0 0 0 1.15-1.074c.007-.071.008-.142.008-.213V6.314a3.851 3.851 0 0 0-.071-.508Z"/><path d="M5.457 1.111h5.614V2.22H5.457zM3.827 1.614A4.193 4.193 0 0 1 3.85.559a.881.881 0 0 1 .523-.542.5.5 0 0 1 .616.521c.034.729.034 1.461.006 2.191a.548.548 0 0 1-.612.554.558.558 0 0 1-.557-.609c-.012-.353 0-.707 0-1.061M12.716 1.683c0 .33.01.661 0 .99a.589.589 0 1 1-1.177-.01 60.97 60.97 0 0 1 0-2.051.555.555 0 0 1 .556-.61c.4-.016.6.237.619.62.016.353 0 .707 0 1.061M4.97 10.177c.22-.191.359-.318.5-.436.109-.088.228-.163.425-.3l1.826 2.234 3.305-4.628.953.665c-.151.232-.27.428-.4.615-1.051 1.488-2.1 2.978-3.161 4.459-.478.668-.8.674-1.329.03-.7-.859-1.39-1.731-2.117-2.639"/></g></svg>
              <p className="text-center">Date last updated</p>
              </div>
              <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="31.5"><path d="m19.035 27.869.144.11v-.221Z" fill="#fefefe"/><path d="M1.815 19.367h18.357v8.539a1.483 1.483 0 0 1-1.483 1.483H3.298a1.483 1.483 0 0 1-1.483-1.483Z" fill="#007fff" stroke="#007efe"/><path d="M3.327 2.466h11.557l5.288 5.391v11.509H1.815V3.978a1.512 1.512 0 0 1 1.512-1.512" fill="#fff" stroke="#007fff"/><path d="M14.883 2.466c.056.045 3.459 3.53 5.155 5.23.047.051.091.105.133.161a.636.636 0 0 1-.185.056h-4.283a.958.958 0 0 1-.944-.97V2.9a2.157 2.157 0 0 1 .009-.334c.006-.039.074-.068.114-.1" fill="#007fff"/><path d="M9.645 24.787V22.52a1.487 1.487 0 0 1 .022-.3.431.431 0 0 1 .435-.386 18.029 18.029 0 0 1 1.9.011 1.35 1.35 0 0 1 1.225 1.321c.026.391.009.786.01 1.178 0 .635-.012 1.27 0 1.9a1.475 1.475 0 0 1-1.409 1.538H11.7c-.473-.013-.946 0-1.419 0s-.639-.171-.64-.638v-2.357m.949-2.018v4.071c.447 0 .876.009 1.305 0a.423.423 0 0 0 .383-.335 1.105 1.105 0 0 0 .044-.327v-2.75a1.316 1.316 0 0 0-.053-.356.373.373 0 0 0-.346-.294c-.441-.011-.883-.005-1.335-.005Z" fill="#f6f0f0"/><path d="M6.262 25.734v1.289a2.238 2.238 0 0 1-.027.36.454.454 0 0 1-.429.391.49.49 0 0 1-.432-.324.873.873 0 0 1-.04-.266v-4.778c0-.4.174-.576.569-.579.574 0 1.148-.006 1.722 0a1.229 1.229 0 0 1 1.245 1.061 8.825 8.825 0 0 1 0 1.774 1.234 1.234 0 0 1-1.216 1.061c-.351.017-.7.007-1.057.008h-.335m-.005-.914c.457 0 .878.012 1.3 0a.413.413 0 0 0 .437-.468q.01-.573 0-1.146c-.006-.312-.131-.437-.447-.444-.361-.008-.723 0-1.085 0a1.864 1.864 0 0 0-.2.026Z" fill="#f6f0f1"/><path d="M14.994 25.261v1.968a.5.5 0 0 1-.177.429.444.444 0 0 1-.721-.219.876.876 0 0 1-.034-.237v-4.778a.945.945 0 0 1 .009-.15.476.476 0 0 1 .488-.443h2.512a.58.58 0 0 1 .447.143.459.459 0 0 1-.259.771 1.178 1.178 0 0 1-.271.016h-1.976v1.591h.575c.241 0 .484 0 .726.008a.443.443 0 0 1 .421.4.451.451 0 0 1-.335.48 1.22 1.22 0 0 1-.3.027h-1.106" fill="#f6f0f0"/></svg>

             

                <p className="text-start">PDF version uploaded</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="85" height="32.197"><g fill="#007ee5"><path d="M20.141 16.439v7.596a.519.519 0 0 1-.523.534H9.045c-.646 0-.767-.133-.767-.842v-7.289h-.812c-.008.1-.025.2-.025.3v7.117a1.466 1.466 0 0 0 .84 1.5 1.8 1.8 0 0 0 .7.113q4.58.011 9.161 0h.4c.014.041.02.049.019.057-.1.7-.174.769-.833.769H7.408c-.1 0-.2.006-.3 0a.487.487 0 0 1-.447-.478c-.009-.089-.007-.178-.007-.268q0-4.407-.005-8.815v-.308h-.8c-.007.112-.019.217-.019.323v8.875a1.518 1.518 0 0 0 .707 1.416 1.394 1.394 0 0 0 .749.168h10.711a1.316 1.316 0 0 0 1.318-1.084 4.148 4.148 0 0 0 .034-.634c.072 0 .162-.013.252-.016a1.41 1.41 0 0 0 1.392-1.484V16.435ZM1.888 15.884v-.859c.167-.053 22.629-.055 23.02 0 .017.281.006.549 0 .859ZM7.442 6.601a1.28 1.28 0 0 0-1.619 1.3v6.252c0 .116.01.232.016.366h.786c.007-.143.02-.279.02-.414V7.913a.5.5 0 0 1 .392-.5c.122-.031.247-.052.4-.085v7.19h.816c.006-.112.016-.217.016-.323V6.246c.02-.384.16-.535.519-.536h8.341c.009.117.02.2.02.289 0 .486.013.973 0 1.459a1.426 1.426 0 0 0 1.405 1.526c.415-.014.83 0 1.245 0h.334v5.534h.825c.007-.114.019-.219.019-.325V8.685a.9.9 0 0 0-.257-.659q-1.4-1.507-2.78-3.029a.731.731 0 0 0-.593-.249c-2.822.005-5.645.013-8.467 0a1.4 1.4 0 0 0-1.451 1.526v.325M19.543 8.07c-.385 0-.75.012-1.114 0a.5.5 0 0 1-.462-.475c-.027-.407-.007-.817-.007-1.157l1.583 1.636M1.575 30.488V24.896c0-.075 0-.15.005-.225a.557.557 0 0 1 1.09-.107 1.288 1.288 0 0 1 .036.333v4.433c.109.007.2.017.294.017h4.112a1.371 1.371 0 0 1 .331.032.562.562 0 0 1-.1 1.1c-.067.006-.134 0-.2 0H1.575M24.093 29.349v-4.444a1.3 1.3 0 0 1 .04-.355.557.557 0 0 1 1.085.116 1.763 1.763 0 0 1 .005.18v5.621a2.017 2.017 0 0 1-.2.021h-5.475a.556.556 0 0 1-.565-.358.542.542 0 0 1 .121-.6.58.58 0 0 1 .444-.178h4.547M1.578 1.43V7.025c0 .075 0 .15.005.225a.545.545 0 0 0 .467.505.53.53 0 0 0 .572-.4 1.35 1.35 0 0 0 .034-.333V2.586c.1-.007.192-.017.281-.017h3.919a1.247 1.247 0 0 0 .316-.032.556.556 0 0 0 .394-.592.547.547 0 0 0-.486-.511c-.063-.006-.128 0-.192 0h-5.31M23.852 2.57v4.448a1.367 1.367 0 0 0 .038.355.528.528 0 0 0 .561.384.545.545 0 0 0 .472-.5c.006-.059.005-.12.005-.18V1.453a1.843 1.843 0 0 0-.193-.021h-5.218a.529.529 0 0 0-.538.358.562.562 0 0 0 .115.6.539.539 0 0 0 .423.178h4.332"/></g></svg>
                <p className="text-start">Scanned version uploaded</p>
                {/* what about Original Version Scanned */}
              </div>
            </div>
            {/* {TABLE HEAD} */}

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSIntakeForm? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSIntakeForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSIntakeForm ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSIntakeForm: !formState.AIRSIntakeForm,
                            AIRSIntakeFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSIntakeForm: !formState.AIRSIntakeForm,
                            AIRSIntakeFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSIntakeForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSIntakeForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSIntakeFormDate === "" || clientData.AIRSIntakeFormDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSIntakeForm: !clientData.AIRSIntakeForm,
                        AIRSIntakeFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSIntakeForm: !clientData.AIRSIntakeForm,
                        AIRSIntakeFormDate:''
                      })
                  }
                  }
                  checked={clientData.AIRSIntakeForm ? 'checked' : false}
                  disabled={clientData.AIRSIntakeForm ? true : false}
                />
                
              </div>
              
            
              <div>
                <p>AIRS Intake Form <span className="text-red-500">*</span></p>
              </div>

              <div className="text-center">
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSIntakeFormDate &&
                    clientData.AIRSIntakeFormDate.split('T')[0]
                  }
                  disabled={clientData.AIRSIntakeForm ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSIntakeFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames}  text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
               {/*  <p className="text-dark-blue underline">Intake</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  className={`${MSAStyles.inputDate} ${(clientData.AIRSIntakeForm) ? "border-2 border-dark-blue rounded-md p-px bg-white" : ""} ${(clientData.AIRSIntakeForm && clientData.AIRSIntakeFormPDF && clientData.AIRSIntakeFormScan)  ? "" :" border-2 border-dark-blue rounded-md p-px bg-white"}`}
                value={
                  clientData.AIRSIntakeFormUploadDate &&
                  clientData.AIRSIntakeFormUploadDate.split('T')[0]
                }
                disabled={clientData.AIRSIntakeFormUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    AIRSIntakeFormUploadDate: e.target.value,
                  })
                
                }}
                />

              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSIntakeFormPDF? 'pointer-events-none' :""}`}

            
                onClick={(e) => {
                  clientData.AIRSIntakeFormPDF ?
                    setClientData(formState => ({
                      ...formState,
                      AIRSIntakeFormPDF: !formState.AIRSIntakeFormPDF,
                      AIRSIntakeFormUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      AIRSIntakeFormPDF: !formState.AIRSIntakeFormPDF,
                      AIRSIntakeFormUploadDate: crearFecha()
                    }))
                    if(!clientData.AIRSIntakeFormPDF || clientData.AIRSIntakeFormScan){
                      setClientData(formState => ({
                        ...formState,
                        AIRSIntakeFormUploadDate: crearFecha()
                      }))
                  }   
                  }
                }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSIntakeFormPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSIntakeForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                onChange={(e) => {
                  clientData.AIRSIntakeFormUploadDate === "" || clientData.AIRSIntakeFormUploadDate === null ? (
                    setClientData({
                      ...clientData,
                      AIRSIntakeFormPDF: !clientData.AIRSIntakeFormPDF,
                      AIRSIntakeFormUploadDate: crearFecha()
                    })) : setClientData({
                      ...clientData,
                      AIRSIntakeFormPDF: !clientData.AIRSIntakeFormPDF,
                    })
                }
                }
                checked={clientData.AIRSIntakeFormPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSIntakeFormScan? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.AIRSIntakeFormScan ?
                    setClientData(formState => ({
                      ...formState,
                      AIRSIntakeFormScan: !formState.AIRSIntakeFormScan,
                      AIRSIntakeFormUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      AIRSIntakeFormScan: !formState.AIRSIntakeFormScan,
                      AIRSIntakeFormUploadDate: crearFecha()
                    }))
                    if(clientData.AIRSIntakeFormPDF || !clientData.AIRSIntakeFormScan){
                      setClientData(formState => ({
                        ...formState,
                        AIRSIntakeFormUploadDate: crearFecha()
                      }))
                    }
                  }
                }
                >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSIntakeFormScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSIntakeForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSIntakeFormUploadDate === "" || clientData.AIRSIntakeFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSIntakeFormScan: !clientData.AIRSIntakeFormScan,
                        AIRSIntakeFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSIntakeFormScan: !clientData.AIRSIntakeFormScan,
                      })
                  }
                  }
                  checked={clientData.AIRSIntakeFormScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.ComprehensiveRiskBehaviorAssessment? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ComprehensiveRiskBehaviorAssessment? 'pointer-events-none' :""}`}
                onClick={() => {
                  clientData.ComprehensiveRiskBehaviorAssessment ?
                    setClientData(formState => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessment: !formState.ComprehensiveRiskBehaviorAssessment,
                      ComprehensiveRiskBehaviorAssessmentDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessment: !formState.ComprehensiveRiskBehaviorAssessment,
                      ComprehensiveRiskBehaviorAssessmentDate: crearFecha()
                    }))
                  }
                } 
               >
                 
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ComprehensiveRiskBehaviorAssessment ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ComprehensiveRiskBehaviorAssessment && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentDate === "" || clientData.ComprehensiveRiskBehaviorAssessmentDate === null ? (
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessment: !clientData.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessment: !clientData.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate: ""
                      })
                  }
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessment ? 'checked' : false}
                />
              </div>
              <div>
                <p>Comprehensive Risk Behavior Assessment <span className="text-red-500">*</span> </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessment"

                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentDate.split('T')[0]
                  }
                  disabled={clientData.ComprehensiveRiskBehaviorAssessment ? true : false}
                  className={`${MSAStyles.inputDate}`}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentDate: prevDate.e.target.value,
                    }));
                  }}
                />

              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.cbra_folder_url ? data[0]?.cbra_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
          {/*       <p className="text-dark-blue underline">CRBA</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessment"
                  className={`${MSAStyles.inputDate} {${(clientData.ComprehensiveRiskBehaviorAssessment) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.ComprehensiveRiskBehaviorAssessmentUploadDate &&
                  clientData.ComprehensiveRiskBehaviorAssessmentUploadDate.split('T')[0]
                }
                disabled={clientData.ComprehensiveRiskBehaviorAssessmentUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    ComprehensiveRiskBehaviorAssessmentUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ComprehensiveRiskBehaviorAssessmentPDF? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.ComprehensiveRiskBehaviorAssessmentPDF ?
                    setClientData(formState => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessmentPDF: !formState.ComprehensiveRiskBehaviorAssessmentPDF,
                      ComprehensiveRiskBehaviorAssessmentUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessmentPDF: !formState.ComprehensiveRiskBehaviorAssessmentPDF,
                      ComprehensiveRiskBehaviorAssessmentUploadDate: crearFecha()
                    }))
                    if(!clientData.ComprehensiveRiskBehaviorAssessmentPDF || clientData.ComprehensiveRiskBehaviorAssessmentScan){
                      setClientData(formState => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentUploadDate: crearFecha()
                      }))
                    }
                  }
                } >                 
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ComprehensiveRiskBehaviorAssessmentPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ComprehensiveRiskBehaviorAssessment && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUploadDate === "" || clientData.ComprehensiveRiskBehaviorAssessmentUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentPDF: !clientData.ComprehensiveRiskBehaviorAssessmentPDF,
                        ComprehensiveRiskBehaviorAssessmentUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentPDF: !clientData.ComprehensiveRiskBehaviorAssessmentPDF,
                      })
                  }
                  }
                  disabled={clientData.ComprehensiveRiskBehaviorAssessment ? true : false}
                  checked={clientData.ComprehensiveRiskBehaviorAssessmentPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ComprehensiveRiskBehaviorAssessmentScan? 'pointer-events-none' :""}`}

               onClick={() => {
                clientData.ComprehensiveRiskBehaviorAssessmentScan ?
                  setClientData(formState => ({
                    ...formState,
                    ComprehensiveRiskBehaviorAssessmentScan: !formState.ComprehensiveRiskBehaviorAssessmentScan,
                    ComprehensiveRiskBehaviorAssessmentUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    ComprehensiveRiskBehaviorAssessmentScan: !formState.ComprehensiveRiskBehaviorAssessmentScan,
                    ComprehensiveRiskBehaviorAssessmentUploadDate: crearFecha()
                  }))
                  if(!clientData.ComprehensiveRiskBehaviorAssessmentScan || clientData.ComprehensiveRiskBehaviorAssessmentPDF){
                    setClientData(formState => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessmentUploadDate: crearFecha()
                    }))
                  }
                }
              }
               >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ComprehensiveRiskBehaviorAssessmentScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ComprehensiveRiskBehaviorAssessment && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUploadDate === "" || clientData.ComprehensiveRiskBehaviorAssessmentUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentScan: !clientData.ComprehensiveRiskBehaviorAssessmentScan,
                        ComprehensiveRiskBehaviorAssessmentUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentScan: !clientData.ComprehensiveRiskBehaviorAssessmentScan,
                      })
                  }
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessmentScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${clientData.ServiceActionPlan? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ServiceActionPlan? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.ServiceActionPlan ?
                  setClientData(formState => ({
                    ...formState,
                    ServiceActionPlan: !formState.ServiceActionPlan,
                    ServiceActionPlanDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    ServiceActionPlan: !formState.ServiceActionPlan,
                    ServiceActionPlanDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ServiceActionPlan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ServiceActionPlan && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ServiceActionPlanDate === "" || clientData.ServiceActionPlanDate === null ? (
                      setClientData({
                        ...clientData,
                        ServiceActionPlan: !clientData.ServiceActionPlan,
                        ServiceActionPlanDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ServiceActionPlan: !clientData.ServiceActionPlan,
                        ServiceActionPlanDate: ""
                      })
                  }
                  }
                  checked={clientData.ServiceActionPlan ? 'checked' : false}
                />
              </div>
              <div>
                <p>Service Action Plan </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ServiceActionPlan"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.ServiceActionPlanDate &&
                    clientData.ServiceActionPlanDate.split('T')[0]
                  }
                  disabled={clientData.ServiceActionPlan ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      ServiceActionPlanDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.action_plans_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ServiceActionPlan"
                  className={`${MSAStyles.inputDate} {${(clientData.ServiceActionPlan) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.ServiceActionPlanUploadDate &&
                  clientData.ServiceActionPlanUploadDate.split('T')[0]
                }
                disabled={clientData.ServiceActionPlanUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    ServiceActionPlanUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ServiceActionPlanPDF? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.ServiceActionPlanPDF ?
                  setClientData(formState => ({
                    ...formState,
                    ServiceActionPlanPDF: !formState.ServiceActionPlanPDF,
                    ServiceActionPlanUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    ServiceActionPlanPDF: !formState.ServiceActionPlanPDF,
                    ServiceActionPlanUploadDate: crearFecha()
                  }))
                  if(!clientData.ServiceActionPlanPDF || clientData.ServiceActionPlanPDF){
                    setClientData(formState => ({
                      ...formState,
                      ServiceActionPlanUploadDate: crearFecha()
                    }))
                  }
                }
              } >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ServiceActionPlanPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
               {/*  <input
                  className={`${!clientData.ServiceActionPlan && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ServiceActionPlanDate === "" || clientData.ServiceActionPlanDate === null ? (
                      setClientData({
                        ...clientData,
                        ServiceActionPlan: !clientData.ServiceActionPlan,
                        ServiceActionPlanDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ServiceActionPlan: !clientData.ServiceActionPlan,
                      })
                  }
                  }
                  checked={clientData.ServiceActionPlanPDF ? 'checked' : false}
                /> */}
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ServiceActionPlanScan? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.ServiceActionPlanScan ?
                    setClientData(formState => ({
                      ...formState,
                      ServiceActionPlanScan: !formState.ServiceActionPlanScan,
                      ServiceActionPlanUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      ServiceActionPlanScan: !formState.ServiceActionPlanScan,
                      ServiceActionPlanUploadDate: crearFecha()
                    }))}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ServiceActionPlanScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ServiceActionPlan && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ServiceActionPlanUploadDate === "" || clientData.ServiceActionPlanUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        ServiceActionPlanScan: !clientData.ServiceActionPlanScan,
                        ServiceActionPlanUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ServiceActionPlanScan: !clientData.ServiceActionPlanScan,
                      })
                  }
                  }
                  checked={clientData.ServiceActionPlanScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSCollateralInformation? '' :'pointer-events-none'}`}
            >
              <div className="ml-1 text-center flex justify-center items-center ">
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSCollateralInformation? 'pointer-events-none' :""}`}
                  onClick={() => {
                    clientData.AIRSCollateralInformation ?
                      setClientData(formState => ({
                        ...formState,
                        AIRSCollateralInformation: !formState.AIRSCollateralInformation,
                        AIRSCollateralInformationDate: ""
                      })) :
                      setClientData(formState => ({
                        ...formState,
                        AIRSCollateralInformation: !formState.AIRSCollateralInformation,
                        AIRSCollateralInformationDate: crearFecha()
                      }))
                  }}
                  disabled={clientData.AIRSCollateralInformation ? true : false}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    strokeWidth={clientData.AIRSCollateralInformation ? "3" : "0"}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <input
                  className={`${!clientData.AIRSCollateralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                    name=""
                    id=""
                    onChange={(e) => {
                      clientData.AIRSCollateralInformationDate === "" || clientData.AIRSCollateralInformationDate === null ? (
                        setClientData({
                          ...clientData,
                          AIRSCollateralInformation: !clientData.AIRSCollateralInformation,
                          AIRSCollateralInformationDate: crearFecha()
                        })) : setClientData({
                          ...clientData,
                          AIRSCollateralInformation: !clientData.AIRSCollateralInformation,
                          AIRSCollateralInformationDate: ""
                        })
                    }
                    }
                    checked={clientData.AIRSCollateralInformation ? 'checked' : false}
                    disabled={clientData.AIRSCollateralInformation ? true : false}
                   
                  />
                </div>
                {/*  */}
              </div>
              <div>
                <p>AIRS Collateral Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSCollateralInformationDate &&
                    clientData.AIRSCollateralInformationDate.split('T')[0]
                  }
                  disabled={clientData.AIRSCollateralInformationDate ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      AIRSCollateralInformationDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  className={`${MSAStyles.inputDate} {${(clientData.AIRSCollateralInformation) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.AIRSCollateralInformationUploadDate &&
                  clientData.AIRSCollateralInformationUploadDate.split('T')[0]
                }
                disabled={clientData.AIRSCollateralInformationUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    AIRSCollateralInformationUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSCollateralInformationPDF? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.AIRSCollateralInformationPDF ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSCollateralInformationPDF: !formState.AIRSCollateralInformationPDF,
                    AIRSCollateralInformationUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSCollateralInformationPDF: !formState.AIRSCollateralInformationPDF,
                    AIRSCollateralInformationUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSCollateralInformationScan || !clientData.AIRSCollateralInformationPDF){
                    setClientData(formState => ({
                      ...formState,
                      AIRSCollateralInformationUploadDate: crearFecha()
                    }))
                  }
                }
               }
               >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSCollateralInformationPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSCollateralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSCollateralInformationUploadDate === "" || clientData.AIRSCollateralInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSCollateralInformationPDF: !clientData.AIRSCollateralInformationPDF
                        ,
                        AIRSCollateralInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSCollateralInformationPDF: !clientData.AIRSCollateralInformationPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSCollateralInformationPDF ? 'checked' : false}
                  disabled={clientData.AIRSCollateralInformationPDF ? true : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSCollateralInformationScan? 'pointer-events-none' :""}`}

                 onClick={() => {
                  clientData.AIRSCollateralInformationScan ?
                    setClientData(formState => ({
                      ...formState,
                      AIRSCollateralInformationScan: !formState.AIRSCollateralInformationScan,
                      AIRSCollateralInformationUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      AIRSCollateralInformationScan: !formState.AIRSCollateralInformationScan,
                      AIRSCollateralInformationUploadDate: crearFecha()
                    }))
                    if(!clientData.AIRSCollateralInformationScan || clientData.AIRSCollateralInformationPDF){
                      setClientData(formState => ({
                        ...formState,
                        AIRSCollateralInformationUploadDate: crearFecha()
                      }))
                    }
                  }
                }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSCollateralInformationScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSCollateralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSCollateralInformationUploadDate === "" || clientData.AIRSCollateralInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSCollateralInformationScan: !clientData.AIRSCollateralInformationScan,
                        AIRSCollateralInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSCollateralInformationScan: !clientData.AIRSCollateralInformationScan,
                      })
                  }
                  }
                  checked={clientData.AIRSCollateralInformationScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSFinancialInformation? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSFinancialInformation? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.AIRSFinancialInformation ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSFinancialInformation: !formState.AIRSFinancialInformation,
                    AIRSFinancialInformationDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSFinancialInformation: !formState.AIRSFinancialInformation,
                    AIRSFinancialInformationDate: crearFecha()
                  }))
                }
              } >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSFinancialInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSFinancialInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSFinancialInformationDate === "" || clientData.AIRSFinancialInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSFinancialInformation: !clientData.AIRSFinancialInformation,
                        AIRSFinancialInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSFinancialInformation: !clientData.AIRSFinancialInformation,
                      })
                  }
                  }
                  checked={clientData.AIRSFinancialInformation ? 'checked' : false}
                />
              </div>
              <div>
                <p>AIRS Financial Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSFinancialInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSFinancialInformationDate &&
                    clientData.AIRSFinancialInformationDate.split('T')[0]
                  }
                  disabled={clientData.AIRSFinancialInformationDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSFinancialInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
               {/*  <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSFinancialInformation"
                  className={`${MSAStyles.inputDate} {${clientData.AIRSFinancialInformation && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.AIRSFinancialInformationUploadDate &&
                  clientData.AIRSFinancialInformationUploadDate.split('T')[0]
                }
                disabled={clientData.AIRSFinancialInformationUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    AIRSFinancialInformationUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSFinancialInformationPDF? 'pointer-events-none' :""}`}

             onClick={() => {
              clientData.AIRSFinancialInformationPDF ?
                setClientData(formState => ({
                  ...formState,
                  AIRSFinancialInformationPDF: !formState.AIRSFinancialInformationPDF,
                  AIRSFinancialInformationUploadDate: ""
                })) :
                setClientData(formState => ({
                  ...formState,
                  AIRSFinancialInformationPDF: !formState.AIRSFinancialInformationPDF,
                  AIRSFinancialInformationUploadDate: crearFecha()
                }))
                if(clientData.AIRSFinancialInformationScan || !clientData.AIRSFinancialInformationPDF){
                  setClientData(formState => ({
                    ...formState,
                    AIRSFinancialInformationUploadDate: crearFecha()
                  }))
                }
              }
            }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSFinancialInformationPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSFinancialInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSFinancialInformationUploadDate === "" || clientData.AIRSFinancialInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSFinancialInformationPDF: !clientData.AIRSFinancialInformationPDF,
                        AIRSFinancialInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSFinancialInformationPDF: !clientData.AIRSFinancialInformationPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSFinancialInformationPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSFinancialInformationScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSFinancialInformationScan ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSFinancialInformationScan: !formState.AIRSFinancialInformationScan,
                    AIRSFinancialInformationUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSFinancialInformationScan: !formState.AIRSFinancialInformationScan,
                    AIRSFinancialInformationUploadDate: crearFecha()
                  }))
                  if(!clientData.AIRSFinancialInformationScan || clientData.AIRSFinancialInformationPDF){
                    setClientData(formState => ({
                      ...formState,
                      AIRSFinancialInformationUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSFinancialInformationScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSFinancialInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSFinancialInformationUploadDate === "" || clientData.AIRSFinancialInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSFinancialInformationScan: !clientData.AIRSFinancialInformationScan,
                        AIRSFinancialInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSFinancialInformationScan: !clientData.AIRSFinancialInformationScan,
                      })
                  }
                  }
                  checked={clientData.AIRSFinancialInformationScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSHIVAIDSRiskHistory? '' :'pointer-events-none'}`}>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVAIDSRiskHistory? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.AIRSHIVAIDSRiskHistory ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVAIDSRiskHistory: !formState.AIRSHIVAIDSRiskHistory,
                    AIRSHIVAIDSRiskHistoryDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVAIDSRiskHistory: !formState.AIRSHIVAIDSRiskHistory,
                    AIRSHIVAIDSRiskHistoryDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVAIDSRiskHistory ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHIVAIDSRiskHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVAIDSRiskHistoryDate === "" || clientData.AIRSHIVAIDSRiskHistoryDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistory: !clientData.AIRSHIVAIDSRiskHistory,
                        AIRSHIVAIDSRiskHistoryDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistory: !clientData.AIRSHIVAIDSRiskHistory,
                      })
                  }
                  }
                  checked={clientData.AIRSHIVAIDSRiskHistory ? 'checked' : false}
                />
              </div>
              <div>
                <p>AIRS HIV AIDS Risk History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHIVAIDSRiskHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHIVAIDSRiskHistoryDate &&
                    clientData.AIRSHIVAIDSRiskHistoryDate.split('T')[0]
                  }
                  disabled={clientData.AIRSHIVAIDSRiskHistoryDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHIVAIDSRiskHistory"
                  className={`${MSAStyles.inputDate} {${clientData.AIRSHIVAIDSRiskHistory && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.AIRSHIVAIDSRiskHistoryUploadDate &&
                  clientData.AIRSHIVAIDSRiskHistoryUploadDate.split('T')[0]
                }
                disabled={clientData.AIRSHIVAIDSRiskHistoryUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    AIRSHIVAIDSRiskHistoryUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVAIDSRiskHistoryPDF? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSHIVAIDSRiskHistoryPDF ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVAIDSRiskHistoryPDF: !formState.AIRSHIVAIDSRiskHistoryPDF,
                    AIRSHIVAIDSRiskHistoryUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVAIDSRiskHistoryPDF: !formState.AIRSHIVAIDSRiskHistoryPDF,
                    AIRSHIVAIDSRiskHistoryUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSHIVAIDSRiskHistoryScan || !clientData.AIRSHIVAIDSRiskHistoryPDF){
                    setClientData(formState => ({
                      ...formState,
                      AIRSHIVAIDSRiskHistoryUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVAIDSRiskHistoryPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHIVAIDSRiskHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVAIDSRiskHistoryUploadDate === "" || clientData.AIRSHIVAIDSRiskHistoryUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistoryPDF: !clientData.AIRSHIVAIDSRiskHistoryPDF,
                        AIRSHIVAIDSRiskHistoryUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistoryPDF: !clientData.AIRSHIVAIDSRiskHistoryPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSHIVAIDSRiskHistoryPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVAIDSRiskHistoryScan? 'pointer-events-none' :""}`}
             onClick={() => {
              clientData.AIRSHIVAIDSRiskHistoryScan ?
                setClientData(formState => ({
                  ...formState,
                  AIRSHIVAIDSRiskHistoryScan: !formState.AIRSHIVAIDSRiskHistoryScan,
                  AIRSHIVAIDSRiskHistoryUploadDate: ""
                })) :
                setClientData(formState => ({
                  ...formState,
                  AIRSHIVAIDSRiskHistoryScan: !formState.AIRSHIVAIDSRiskHistoryScan,
                  AIRSHIVAIDSRiskHistoryUploadDate: crearFecha()
                }))
                if(!clientData.AIRSHIVAIDSRiskHistoryScan || clientData.AIRSHIVAIDSRiskHistoryPDF){
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVAIDSRiskHistoryUploadDate: crearFecha()
                  }))
                }
              }
            }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVAIDSRiskHistoryScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHIVAIDSRiskHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVAIDSRiskHistoryUploadDate === "" || clientData.AIRSHIVAIDSRiskHistoryUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistoryScan: !clientData.AIRSHIVAIDSRiskHistoryScan,
                        AIRSHIVAIDSRiskHistoryUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistoryScan: !clientData.AIRSHIVAIDSRiskHistoryScan,
                      })
                  }
                  }
                  checked={clientData.AIRSHIVAIDSRiskHistoryScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSHCVHistory? '' :'pointer-events-none'}`} >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHCVHistory? 'pointer-events-none' :""}`}
             onClick={() => {
              clientData.AIRSHCVHistory ?
                setClientData(formState => ({
                  ...formState,
                  AIRSHCVHistory: !formState.AIRSHCVHistory,
                  AIRSHCVHistoryDate: ""
                })) :
                setClientData(formState => ({
                  ...formState,
                  AIRSHCVHistory: !formState.AIRSHCVHistory,
                  AIRSHCVHistoryDate: crearFecha()
                }))
              }
            }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHCVHistory ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHCVHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHCVHistoryDate === "" || clientData.AIRSHCVHistoryDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHCVHistory: !clientData.AIRSHCVHistory,
                        AIRSHCVHistoryDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHCVHistory: !clientData.AIRSHCVHistory,
                      })
                  }
                  }
                  checked={clientData.AIRSHCVHistory ? 'checked' : false}
                />
              </div>
              <div>
                <p>AIRS HCV History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHCVHistoryDate &&
                    clientData.AIRSHCVHistoryDate.split('T')[0]
                  }
                  disabled={clientData.AIRSHCVHistoryDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHCVHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={`${MSAStyles.inputDate} {${clientData.AIRSHCVHistory && "border-2 border-dark-blue rounded-md p-px"}`}
                  value={
                    clientData.AIRSHCVHistoryUploadDate &&
                    clientData.AIRSHCVHistoryUploadDate.split('T')[0]
                  }
                  disabled={clientData.AIRSHCVHistoryUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHCVHistoryUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHCVHistoryPDF? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSHCVHistoryPDF ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHCVHistoryPDF: !formState.AIRSHCVHistoryPDF,
                    AIRSHCVHistoryUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHCVHistoryPDF: !formState.AIRSHCVHistoryPDF,
                    AIRSHCVHistoryUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSHCVHistoryScan || !clientData.AIRSHCVHistoryPDF){
                    setClientData(formState => ({
                      ...formState,
                      AIRSHCVHistoryUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHCVHistoryPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHCVHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHCVHistoryUploadDate === "" || clientData.AIRSHCVHistoryUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHCVHistoryPDF: !clientData.AIRSHCVHistoryPDF,
                        AIRSHCVHistoryUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHCVHistoryPDF: !clientData.AIRSHCVHistoryPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSHCVHistoryPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHCVHistoryScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSHCVHistoryScan ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHCVHistoryScan: !formState.AIRSHCVHistoryScan,
                    AIRSHCVHistoryUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHCVHistoryScan: !formState.AIRSHCVHistoryScan,
                    AIRSHCVHistoryUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSHCVHistoryPDF || !clientData.AIRSHCVHistoryScan){
                    setClientData(formState => ({
                      ...formState,
                      AIRSHCVHistoryUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHCVHistoryScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHCVHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHCVHistoryUploadDate === "" || clientData.AIRSHCVHistoryUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHCVHistoryScan: !clientData.AIRSHCVHistoryScan,
                        AIRSHCVHistoryUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHCVHistoryScan: !clientData.AIRSHCVHistoryScan,
                      })
                  }
                  }
                  checked={clientData.AIRSHCVHistoryScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSHousingInformation? '' :'pointer-events-none'}`} >

<div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHousingInformation? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.AIRSHousingInformation ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHousingInformation: !formState.AIRSHousingInformation,
                    AIRSHousingInformationDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHousingInformation: !formState.AIRSHousingInformation,
                    AIRSHousingInformationDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHousingInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHousingInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHousingInformationDate === "" || clientData.AIRSHousingInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHousingInformation: !clientData.AIRSHousingInformation,
                        AIRSHousingInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHousingInformation: !clientData.AIRSHousingInformation,
                      })
                  }
                  }
                  checked={clientData.AIRSHousingInformation ? 'checked' : false}
                />
              </div>
              <div>
                <p>AIRS Housing Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHousingInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHousingInformationDate &&
                    clientData.AIRSHousingInformationDate.split('T')[0]
                  }
                  disabled={clientData.AIRSHousingInformationDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHousingInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
               {/*  <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHousingInformation"
                  className={`${MSAStyles.inputDate} {${clientData.AIRSHousingInformation && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.AIRSHousingInformationUploadDate &&
                  clientData.AIRSHousingInformationUploadDate.split('T')[0]
                }
                disabled={clientData.AIRSHousingInformationUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    AIRSHousingInformationUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHousingInformationPDF? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSHousingInformationPDF ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHousingInformationPDF: !formState.AIRSHousingInformationPDF,
                    AIRSHousingInformationUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHousingInformationPDF: !formState.AIRSHousingInformationPDF,
                    AIRSHousingInformationUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSHousingInformationScan || !clientData.AIRSHousingInformationPDF){
                    setClientData(formState => ({
                      ...formState,
                      AIRSHousingInformationUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHousingInformationPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHousingInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHousingInformationUploadDate === "" || clientData.AIRSHousingInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHousingInformationPDF: !clientData.AIRSHousingInformationPDF,
                        AIRSHousingInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHousingInformationPDF: !clientData.AIRSHousingInformationPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSHousingInformationPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHousingInformationScan? 'pointer-events-none' :""}`}

               onClick={() => {
                clientData.AIRSHousingInformationScan ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHousingInformationScan: !formState.AIRSHousingInformationScan,
                    AIRSHousingInformationUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHousingInformationScan: !formState.AIRSHousingInformationScan,
                    AIRSHousingInformationUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSHousingInformationPDF || !clientData.AIRSHousingInformationScan){
                    setClientData(formState => ({
                      ...formState,
                      AIRSHousingInformationUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHousingInformationScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHousingInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHousingInformationUploadDate === "" || clientData.AIRSHousingInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHousingInformationScan: !clientData.AIRSHousingInformationScan,
                        AIRSHousingInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHousingInformationScan: !clientData.AIRSHousingInformationScan,
                      })
                  }
                  }
                  checked={clientData.AIRSHousingInformationScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSInsuranceInformation? '' :'pointer-events-none'}`} >

<div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSInsuranceInformation? 'pointer-events-none' :""}`}
             onClick={() => {
              clientData.AIRSInsuranceInformation ?
                setClientData(formState => ({
                  ...formState,
                  AIRSInsuranceInformation: !formState.AIRSInsuranceInformation,
                  AIRSInsuranceInformationDate: ""
                })) :
                setClientData(formState => ({
                  ...formState,
                  AIRSInsuranceInformation: !formState.AIRSInsuranceInformation,
                  AIRSInsuranceInformationDate: crearFecha()
                }))
              }
            }
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSInsuranceInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSInsuranceInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSInsuranceInformationDate === "" || clientData.AIRSInsuranceInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSInsuranceInformation: !clientData.AIRSInsuranceInformation,
                        AIRSInsuranceInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSInsuranceInformation: !clientData.AIRSInsuranceInformation,
                      })
                  }
                  }
                  checked={clientData.AIRSInsuranceInformation ? 'checked' : false}
                />
              </div>
              <div>
                <p>AIRS Insurance Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSInsuranceInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSInsuranceInformationDate &&
                    clientData.AIRSInsuranceInformationDate.split('T')[0]
                  }
                  disabled={clientData.AIRSInsuranceInformationDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSInsuranceInformation"
                  className={`${MSAStyles.inputDate} {${clientData.AIRSInsuranceInformation && "border-2 border-dark-blue rounded-md p-px"}`}
                  value={
                    clientData.AIRSInsuranceInformationUploadDate &&
                    clientData.AIRSInsuranceInformationUploadDate.split('T')[0]
                  }
                  disabled={clientData.AIRSInsuranceInformationUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformationUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSInsuranceInformationPDF? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.AIRSInsuranceInformationPDF ?
                    setClientData(formState => ({
                      ...formState,
                      AIRSInsuranceInformationPDF: !formState.AIRSInsuranceInformationPDF,
                      AIRSInsuranceInformationUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      AIRSInsuranceInformationPDF: !formState.AIRSInsuranceInformationPDF,
                      AIRSInsuranceInformationUploadDate: crearFecha()
                    }))
                    if(clientData.AIRSInsuranceInformationScan || !clientData.AIRSInsuranceInformationPDF){
                      setClientData(formState => ({
                        ...formState,
                        AIRSInsuranceInformationUploadDate: crearFecha()
                      }))
                    }
                  }
                }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSInsuranceInformationPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSInsuranceInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSInsuranceInformationUploadDate === "" || clientData.AIRSInsuranceInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSInsuranceInformationPDF: !clientData.AIRSInsuranceInformationPDF,
                        AIRSInsuranceInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSInsuranceInformationPDF: !clientData.AIRSInsuranceInformationPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSInsuranceInformationPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSInsuranceInformationScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSInsuranceInformationScan ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSInsuranceInformationScan: !formState.AIRSInsuranceInformationScan,
                    AIRSInsuranceInformationUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSInsuranceInformationScan: !formState.AIRSInsuranceInformationScan,
                    AIRSInsuranceInformationUploadDate: crearFecha()
                  }))
                  if(!clientData.AIRSInsuranceInformationScan || clientData.AIRSInsuranceInformationPDF){
                    setClientData(formState => ({
                      ...formState,
                      AIRSInsuranceInformationUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSInsuranceInformationScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSInsuranceInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSInsuranceInformationUploadDate === "" || clientData.AIRSInsuranceInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSInsuranceInformationScan: !clientData.AIRSInsuranceInformationScan,
                        AIRSInsuranceInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSInsuranceInformationScan: !clientData.AIRSInsuranceInformationScan,
                      })
                  }
                  }
                  checked={clientData.AIRSInsuranceInformationScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSSubstanceUseHistory? '' :'pointer-events-none'}`} >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSSubstanceUseHistory? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.AIRSSubstanceUseHistory ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSSubstanceUseHistory: !formState.AIRSSubstanceUseHistory,
                    AIRSSubstanceUseHistoryDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSSubstanceUseHistory: !formState.AIRSSubstanceUseHistory,
                    AIRSSubstanceUseHistoryDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSSubstanceUseHistory ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSSubstanceUseHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSSubstanceUseHistoryDate === "" || clientData.AIRSSubstanceUseHistoryDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistory: !clientData.AIRSSubstanceUseHistory,
                        AIRSSubstanceUseHistoryDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistory: !clientData.AIRSSubstanceUseHistory,
                      })
                  }
                  }
                  checked={clientData.AIRSSubstanceUseHistory ? 'checked' : false}
                />
              </div>
              <div>
                <p>AIRS Substance Use History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSSubstanceUseHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSSubstanceUseHistoryDate &&
                    clientData.AIRSSubstanceUseHistoryDate.split('T')[0]
                  }
                  disabled={clientData.AIRSSubstanceUseHistoryDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSSubstanceUseHistory"
                  className={`${MSAStyles.inputDate} {${clientData.AIRSSubstanceUseHistory && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.AIRSSubstanceUseHistoryUploadDate &&
                  clientData.AIRSSubstanceUseHistoryUploadDate.split('T')[0]
                }
                disabled={clientData.AIRSSubstanceUseHistoryUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    AIRSSubstanceUseHistoryUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSSubstanceUseHistoryPDF? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSSubstanceUseHistoryPDF ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSSubstanceUseHistoryPDF: !formState.AIRSSubstanceUseHistoryPDF,
                    AIRSSubstanceUseHistoryUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSSubstanceUseHistoryPDF: !formState.AIRSSubstanceUseHistoryPDF,
                    AIRSSubstanceUseHistoryUploadDate: crearFecha()
                  }))
                  if(!clientData.AIRSSubstanceUseHistoryPDF || clientData.AIRSSubstanceUseHistoryScan){
                    setClientData(formState => ({
                      ...formState,
                      AIRSSubstanceUseHistoryUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSSubstanceUseHistoryPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSSubstanceUseHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSSubstanceUseHistoryUploadDate === "" || clientData.AIRSSubstanceUseHistoryUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistoryPDF: !clientData.AIRSSubstanceUseHistoryPDF,
                        AIRSSubstanceUseHistoryUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistoryPDF: !clientData.AIRSSubstanceUseHistoryPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSSubstanceUseHistoryPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSSubstanceUseHistoryScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSSubstanceUseHistoryScan ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSSubstanceUseHistoryScan: !formState.AIRSSubstanceUseHistoryScan,
                    AIRSSubstanceUseHistoryUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSSubstanceUseHistoryScan: !formState.AIRSSubstanceUseHistoryScan,
                    AIRSSubstanceUseHistoryUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSSubstanceUseHistoryPDF || !clientData.AIRSSubstanceUseHistoryScan){
                    setClientData(formState => ({
                      ...formState,
                      AIRSSubstanceUseHistoryUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSSubstanceUseHistoryScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSSubstanceUseHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSSubstanceUseHistoryUploadDate === "" || clientData.AIRSSubstanceUseHistoryUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistoryScan: !clientData.AIRSSubstanceUseHistoryScan,
                        AIRSSubstanceUseHistoryUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistoryScan: !clientData.AIRSSubstanceUseHistoryScan,
                      })
                  }
                  }
                  checked={clientData.AIRSSubstanceUseHistoryScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
             className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEClientRights? '' :'pointer-events-none'}`} >

              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientRights? 'pointer-events-none' :""}`}
                onClick={() => {
                  clientData.LNEClientRights ?
                    setClientData(formState => ({
                      ...formState,
                      LNEClientRights: !formState.LNEClientRights,
                      LNEClientRightsDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      LNEClientRights: !formState.LNEClientRights,
                      LNEClientRightsDate: crearFecha()
                    }))
                  }
                }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientRights ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEClientRights && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientRightsDate === "" || clientData.LNEClientRightsDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientRights: !clientData.LNEClientRights,
                        LNEClientRightsDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientRights: !clientData.LNEClientRights,
                      })
                  }
                  }
                  checked={clientData.LNEClientRights ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE Client Rights </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientRights"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEClientRightsDate &&
                    clientData.LNEClientRightsDate.split('T')[0]
                  }
                  disabled={clientData.LNEClientRightsDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientRightsDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}

              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientRights"
                  className={`${MSAStyles.inputDate} {${clientData.LNEClientRights && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LNEClientRightsUploadDate &&
                  clientData.LNEClientRightsUploadDate.split('T')[0]
                }
                disabled={clientData.LNEClientRightsUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LNEClientRightsUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className="ml-1 text-center flex justify-center items-center ">
                {/* <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientRightsPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEClientRights && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientRightsDate === "" || clientData.LNEClientRightsDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientRights: !clientData.LNEClientRights,
                        LNEClientRightsDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientRights: !clientData.LNEClientRights,
                      })
                  }
                  }
                  checked={clientData.LNEClientRights ? 'checked' : false}
                /> */}
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientRightsScan? 'pointer-events-none' :""}`}

               onClick={() => {
                clientData.LNEClientRightsScan ?
                  setClientData(formState => ({
                    ...formState,
                    LNEClientRightsScan: !formState.LNEClientRightsScan,
                    LNEClientRightsUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEClientRightsScan: !formState.LNEClientRightsScan,
                    LNEClientRightsUploadDate: crearFecha()
                  }))
                }}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientRightsScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEClientRights && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientRightsUploadDate === "" || clientData.LNEClientRightsUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientRightsScan: !clientData.LNEClientRightsScan,
                        LNEClientRightsUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientRightsScan: !clientData.LNEClientRightsScan,
                      })
                  }
                  }
                  checked={clientData.LNEClientRightsScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEClientGrievancePolicyProcedure? '' :'pointer-events-none'}`} >

              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientGrievancePolicyProcedure? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.LNEClientGrievancePolicyProcedure ?
                  setClientData(formState => ({
                    ...formState,
                    LNEClientGrievancePolicyProcedure: !formState.LNEClientGrievancePolicyProcedure,
                    LNEClientGrievancePolicyProcedureDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEClientGrievancePolicyProcedure: !formState.LNEClientGrievancePolicyProcedure,
                    LNEClientGrievancePolicyProcedureDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientGrievancePolicyProcedure ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEClientGrievancePolicyProcedure && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientGrievancePolicyProcedureDate === "" || clientData.LNEClientGrievancePolicyProcedureDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedure: !clientData.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedure: !clientData.LNEClientGrievancePolicyProcedure,
                      })
                  }
                  }
                  checked={clientData.LNEClientGrievancePolicyProcedure ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE Client Grievance Policy & Procedure </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEClientGrievancePolicyProcedureDate &&
                    clientData.LNEClientGrievancePolicyProcedureDate.split('T')[0]
                  }
                  disabled={clientData.LNEClientGrievancePolicyProcedureDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedureDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  className={`${MSAStyles.inputDate} {${clientData.LNEClientGrievancePolicyProcedure && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LNEClientGrievancePolicyProcedureUploadDate &&
                  clientData.LNEClientGrievancePolicyProcedureUploadDate.split('T')[0]
                }
                disabled={clientData.LNEClientGrievancePolicyProcedureUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LNEClientGrievancePolicyProcedureUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className="ml-1 text-center flex justify-center items-center ">
                {/* <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientGrievancePolicyProcedurePDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEClientGrievancePolicyProcedure && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientGrievancePolicyProcedureDate === "" || clientData.LNEClientGrievancePolicyProcedureDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedure: !clientData.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedure: !clientData.LNEClientGrievancePolicyProcedure,
                      })
                  }
                  }
                  checked={clientData.LNEClientGrievancePolicyProcedure ? 'checked' : false}
                /> */}
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientGrievancePolicyProcedureScan? 'pointer-events-none' :""}`}

                   onClick={() => {
                    clientData.LNEClientGrievancePolicyProcedureScan ?
                      setClientData(formState => ({
                        ...formState,
                        LNEClientGrievancePolicyProcedureScan: !formState.LNEClientGrievancePolicyProcedureScan,
                        LNEClientGrievancePolicyProcedureUploadDate: ""
                      })) :
                      setClientData(formState => ({
                        ...formState,
                        LNEClientGrievancePolicyProcedureScan: !formState.LNEClientGrievancePolicyProcedureScan,
                        LNEClientGrievancePolicyProcedureUploadDate: crearFecha()
                      }))
                    }}
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientGrievancePolicyProcedureScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEClientGrievancePolicyProcedure && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientGrievancePolicyProcedureUploadDate === "" || clientData.LNEClientGrievancePolicyProcedureUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedureScan: !clientData.LNEClientGrievancePolicyProcedureScan,
                        LNEClientGrievancePolicyProcedureUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedureScan: !clientData.LNEClientGrievancePolicyProcedureScan,
                      })
                  }
                  }
                  checked={clientData.LNEClientGrievancePolicyProcedureScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEProgramRules? '' :'pointer-events-none'}`} >
            <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEProgramRules? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.LNEProgramRules ?
                  setClientData(formState => ({
                    ...formState,
                    LNEProgramRules: !formState.LNEProgramRules,
                    LNEProgramRulesDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEProgramRules: !formState.LNEProgramRules,
                    LNEProgramRulesDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEProgramRules ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEProgramRules && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEProgramRulesDate === "" || clientData.LNEProgramRulesDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEProgramRules: !clientData.LNEProgramRules,
                        LNEProgramRulesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEProgramRules: !clientData.LNEProgramRules,
                      })
                  }
                  }
                  checked={clientData.LNEProgramRules ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE Program Rules </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEProgramRules"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEProgramRulesDate &&
                    clientData.LNEProgramRulesDate.split('T')[0]
                  }
                  disabled={clientData.LNEProgramRulesDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEProgramRulesDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
               {/*  <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEProgramRules"
                  className={`${MSAStyles.inputDate} {${clientData.LNEProgramRules && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LNEProgramRulesUploadDate &&
                  clientData.LNEProgramRulesUploadDate.split('T')[0]
                }
                disabled={clientData.LNEProgramRulesUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LNEProgramRulesUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className="ml-1 text-center flex justify-center items-center ">
                {/* <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEProgramRulesPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEProgramRules && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEProgramRulesDate === "" || clientData.LNEProgramRulesDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEProgramRules: !clientData.LNEProgramRules,
                        LNEProgramRulesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEProgramRules: !clientData.LNEProgramRules,
                      })
                  }
                  }
                  checked={clientData.LNEProgramRules ? 'checked' : false}
                /> */}
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEProgramRulesScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.LNEProgramRulesScan ?
                  setClientData(formState => ({
                    ...formState,
                    LNEProgramRulesScan: !formState.LNEProgramRulesScan,
                    LNEProgramRulesUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEProgramRulesScan: !formState.LNEProgramRulesScan,
                    LNEProgramRulesUploadDate: crearFecha()
                  }))
                }}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEProgramRulesScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEProgramRules && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEProgramRulesUploadDate === "" || clientData.LNEProgramRulesUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEProgramRulesScan: !clientData.LNEProgramRulesScan,
                        LNEProgramRulesUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEProgramRulesScan: !clientData.LNEProgramRulesScan,
                      })
                  }
                  }
                  checked={clientData.LNEProgramRulesScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEEmergencyContactConsent? '' :'pointer-events-none'}`} >
           <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEEmergencyContactConsent? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.LNEEmergencyContactConsent ?
                  setClientData(formState => ({
                    ...formState,
                    LNEEmergencyContactConsent: !formState.LNEEmergencyContactConsent,
                    LNEEmergencyContactConsentDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEEmergencyContactConsent: !formState.LNEEmergencyContactConsent,
                    LNEEmergencyContactConsentDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEEmergencyContactConsent ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEEmergencyContactConsent && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEEmergencyContactConsentDate === "" || clientData.LNEEmergencyContactConsentDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEEmergencyContactConsent: !clientData.LNEEmergencyContactConsent,
                        LNEEmergencyContactConsentDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEEmergencyContactConsent: !clientData.LNEEmergencyContactConsent,
                      })
                  }
                  }
                  checked={clientData.LNEEmergencyContactConsent ? 'checked' : false}
                />
              </div>

              <div>
                <p>LNE Emergency Contact Consent </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEEmergencyContactConsent"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEEmergencyContactConsentDate &&
                    clientData.LNEEmergencyContactConsentDate.split('T')[0]
                  }
                  disabled={clientData.LNEEmergencyContactConsentDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEEmergencyContactConsentDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
               {/*  <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEEmergencyContactConsent"
                  className={`${MSAStyles.inputDate} {${clientData.LNEEmergencyContactConsent && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LNEEmergencyContactConsentUploadDate &&
                  clientData.LNEEmergencyContactConsentUploadDate.split('T')[0]
                }
                disabled={clientData.LNEEmergencyContactConsentUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LNEEmergencyContactConsentUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className="ml-1 text-center flex justify-center items-center ">
                {/* <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEEmergencyContactConsentPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEEmergencyContactConsent && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEEmergencyContactConsentDate === "" || clientData.LNEEmergencyContactConsentDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEEmergencyContactConsent: !clientData.LNEEmergencyContactConsent,
                        LNEEmergencyContactConsentDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEEmergencyContactConsent: !clientData.LNEEmergencyContactConsent,
                      })
                  }
                  }
                  checked={clientData.LNEEmergencyContactConsent ? 'checked' : false}
                /> */}
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEEmergencyContactConsentScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.LNEEmergencyContactConsentScan ?
                  setClientData(formState => ({
                    ...formState,
                    LNEEmergencyContactConsentScan: !formState.LNEEmergencyContactConsentScan,
                    LNEEmergencyContactConsentUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEEmergencyContactConsentScan: !formState.LNEEmergencyContactConsentScan,
                    LNEEmergencyContactConsentUploadDate: crearFecha()
                  }))
                }}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEEmergencyContactConsentScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEEmergencyContactConsent && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEEmergencyContactConsentUploadDate === "" || clientData.LNEEmergencyContactConsentUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEEmergencyContactConsentScan: !clientData.LNEEmergencyContactConsentScan,
                        LNEEmergencyContactConsentUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEEmergencyContactConsentScan: !clientData.LNEEmergencyContactConsentScan,
                      })
                  }
                  }
                  checked={clientData.LNEEmergencyContactConsentScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2  ${clientData.LNEConsentForReleaseOfConfidentialInformation? '' :'pointer-events-none'}`} >
               <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEConsentForReleaseOfConfidentialInformation? 'pointer-events-none' :""}`}
                onClick={() => {
                  clientData.LNEConsentForReleaseOfConfidentialInformation ?
                    setClientData(formState => ({
                      ...formState,
                      LNEConsentForReleaseOfConfidentialInformation: !formState.LNEConsentForReleaseOfConfidentialInformation,
                      LNEConsentForReleaseOfConfidentialInformationDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      LNEConsentForReleaseOfConfidentialInformation: !formState.LNEConsentForReleaseOfConfidentialInformation,
                      LNEConsentForReleaseOfConfidentialInformationDate: crearFecha()
                    }))
                  }
                }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEConsentForReleaseOfConfidentialInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEConsentForReleaseOfConfidentialInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate === "" || clientData.LNEConsentForReleaseOfConfidentialInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformation: !clientData.LNEConsentForReleaseOfConfidentialInformation,
                        LNEConsentForReleaseOfConfidentialInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformation: !clientData.LNEConsentForReleaseOfConfidentialInformation,
                      })
                  }
                  }
                  checked={clientData.LNEConsentForReleaseOfConfidentialInformation ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE Consent for Release of Confidential Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEConsentForReleaseOfConfidentialInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate &&
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate.split('T')[0]
                  }
                  disabled={clientData.LNEConsentForReleaseOfConfidentialInformationDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEConsentForReleaseOfConfidentialInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
               <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
               <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEConsentForReleaseOfConfidentialInformation"
                  className={`${MSAStyles.inputDate} {${clientData.LNEConsentForReleaseOfConfidentialInformation && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate &&
                  clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate.split('T')[0]
                }    
                disabled={clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LNEConsentForReleaseOfConfidentialInformationUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              {/* REVIEW HERE */}
              <div className="ml-1 text-center flex justify-center items-center "> 
                {/* <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEConsentForReleaseOfConfidentialInformationPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEConsentForReleaseOfConfidentialInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate === "" || clientData.LNEConsentForReleaseOfConfidentialInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformation: !clientData.LNEConsentForReleaseOfConfidentialInformation,
                        LNEConsentForReleaseOfConfidentialInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformation: !clientData.LNEConsentForReleaseOfConfidentialInformation,
                      })
                  }
                  }
                  checked={clientData.LNEConsentForReleaseOfConfidentialInformation ? 'checked' : false}
                /> */}
              </div>
              <div className="ml-1 text-center flex justify-center items-center "
                onClick={() => {
                  clientData.LNEConsentForReleaseOfConfidentialInformationScan ?
                    setClientData(formState => ({
                      ...formState,
                      LNEConsentForReleaseOfConfidentialInformationScan: !formState.LNEConsentForReleaseOfConfidentialInformationScan,
                      LNEConsentForReleaseOfConfidentialInformationUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      LNEConsentForReleaseOfConfidentialInformationScan: !formState.LNEConsentForReleaseOfConfidentialInformationScan,
                      LNEConsentForReleaseOfConfidentialInformationUploadDate: crearFecha()
                    }))
                  }}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEConsentForReleaseOfConfidentialInformationScan? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEConsentForReleaseOfConfidentialInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate === "" || clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformationScan: !clientData.LNEConsentForReleaseOfConfidentialInformationScan,
                        LNEConsentForReleaseOfConfidentialInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformationScan: !clientData.LNEConsentForReleaseOfConfidentialInformationScan,
                      })
                  }
                  }
                  checked={clientData.LNEConsentForReleaseOfConfidentialInformationScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${clientData.HIPPAConsentForm? '' :'pointer-events-none'}`} >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.HIPPAConsentForm? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.HIPPAConsentForm ?
                  setClientData(formState => ({
                    ...formState,
                    HIPPAConsentForm: !formState.HIPPAConsentForm,
                    HIPPAConsentFormDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    HIPPAConsentForm: !formState.HIPPAConsentForm,
                    HIPPAConsentFormDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.HIPPAConsentForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.HIPPAConsentForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HIPPAConsentFormDate === "" || clientData.HIPPAConsentFormDate === null ? (
                      setClientData({
                        ...clientData,
                        HIPPAConsentForm: !clientData.HIPPAConsentForm,
                        HIPPAConsentFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        HIPPAConsentForm: !clientData.HIPPAConsentForm,
                      })
                  }
                  }
                  checked={clientData.HIPPAConsentForm ? 'checked' : false}
                />
              </div>
              <div>
                <p>HIPAA Consent Form (OCA Form 960)</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.HIPPAConsentFormDate &&
                    clientData.HIPPAConsentFormDate.split('T')[0]
                  }
                  disabled={clientData.HIPPAConsentFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HIPPAConsentFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  className={`${MSAStyles.inputDate} {${clientData.HIPPAConsentForm && "border-2 border-dark-blue rounded-md p-px"}`}
                  value={
                    clientData.HIPPAConsentFormUploadDate &&
                    clientData.HIPPAConsentFormUploadDate.split('T')[0]
                  }
                  disabled={clientData.HIPPAConsentFormUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HIPPAConsentFormUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.HIPPAConsentFormPDF? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.HIPPAConsentFormPDF ?
                    setClientData(formState => ({
                      ...formState,
                      HIPPAConsentFormPDF: !formState.HIPPAConsentFormPDF,
                      HIPPAConsentFormUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      HIPPAConsentFormPDF: !formState.HIPPAConsentFormPDF,
                      HIPPAConsentFormUploadDate: crearFecha()
                    }))
                    if(clientData.HIPPAConsentFormScan || !clientData.HIPPAConsentFormPDF){
                      setClientData(formState => ({
                        ...formState,
                        HIPPAConsentFormUploadDate: crearFecha()
                      }))
                    }
                  }
                }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.HIPPAConsentFormPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.HIPPAConsentForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HIPPAConsentFormUploadDate === "" || clientData.HIPPAConsentFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        HIPPAConsentFormPDF: !clientData.HIPPAConsentFormPDF,
                        HIPPAConsentFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        HIPPAConsentFormPDF: !clientData.HIPPAConsentFormPDF,
                      })
                  }
                  }
                  checked={clientData.HIPPAConsentFormPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.HIPPAConsentFormScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.HIPPAConsentFormScan ?
                  setClientData(formState => ({
                    ...formState,
                    HIPPAConsentFormScan: !formState.HIPPAConsentFormScan,
                    HIPPAConsentFormUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    HIPPAConsentFormScan: !formState.HIPPAConsentFormScan,
                    HIPPAConsentFormUploadDate: crearFecha()
                  }))
                  if(clientData.HIPPAConsentFormPDF || !clientData.HIPPAConsentFormScan){
                    setClientData(formState => ({
                      ...formState,
                      HIPPAConsentFormUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.HIPPAConsentFormScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.HIPPAConsentForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HIPPAConsentFormUploadDate === "" || clientData.HIPPAConsentFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        HIPPAConsentFormScan: !clientData.HIPPAConsentFormScan,
                        HIPPAConsentFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        HIPPAConsentFormScan: !clientData.HIPPAConsentFormScan,
                      })
                  }
                  }
                  checked={clientData.HIPPAConsentFormUploadDate ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-pink grid gap-5 py-2 rounded-lg my-2 ${clientData.NYCDOHMHNoticeOfPrivacyPractices? '' :'pointer-events-none'} `} >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.NYCDOHMHNoticeOfPrivacyPractices? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.NYCDOHMHNoticeOfPrivacyPractices ?
                  setClientData(formState => ({
                    ...formState,
                    NYCDOHMHNoticeOfPrivacyPractices: !formState.NYCDOHMHNoticeOfPrivacyPractices,
                    NYCDOHMHNoticeOfPrivacyPracticesDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    NYCDOHMHNoticeOfPrivacyPractices: !formState.NYCDOHMHNoticeOfPrivacyPractices,
                    NYCDOHMHNoticeOfPrivacyPracticesDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.NYCDOHMHNoticeOfPrivacyPractices ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.NYCDOHMHNoticeOfPrivacyPractices && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate === "" || clientData.NYCDOHMHNoticeOfPrivacyPracticesDate === null ? (
                      setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPractices: !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                        NYCDOHMHNoticeOfPrivacyPracticesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPractices: !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                      })
                  }
                  }
                  checked={clientData.NYCDOHMHNoticeOfPrivacyPractices ? 'checked' : false}
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
                  className={MSAStyles.inputDate}
                  value={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate &&
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate.split('T')[0]
                  }
                  disabled={clientData.NYCDOHMHNoticeOfPrivacyPracticesDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPracticesDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="NYCDOHMHNoticeOfPrivacyPractices"
                  className={`${MSAStyles.inputDate} {${clientData.NYCDOHMHNoticeOfPrivacyPractices && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate &&
                  clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate.split('T')[0]
                }
                disabled={clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    NYCDOHMHNoticeOfPrivacyPracticesUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.NYCDOHMHNoticeOfPrivacyPracticesPDF? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.NYCDOHMHNoticeOfPrivacyPracticesPDF ?
                  setClientData(formState => ({
                    ...formState,
                    NYCDOHMHNoticeOfPrivacyPracticesPDF: !formState.NYCDOHMHNoticeOfPrivacyPracticesPDF,
                    NYCDOHMHNoticeOfPrivacyPracticesUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    NYCDOHMHNoticeOfPrivacyPracticesPDF: !formState.NYCDOHMHNoticeOfPrivacyPracticesPDF,
                    NYCDOHMHNoticeOfPrivacyPracticesUploadDate: crearFecha()
                  }))
                  if(!clientData.NYCDOHMHNoticeOfPrivacyPracticesPDF || clientData.NYCDOHMHNoticeOfPrivacyPracticesScan){
                    setClientData(formState => ({
                      ...formState,
                      NYCDOHMHNoticeOfPrivacyPracticesUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.NYCDOHMHNoticeOfPrivacyPracticesPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.NYCDOHMHNoticeOfPrivacyPractices && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate === "" || clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPracticesPDF: !clientData.NYCDOHMHNoticeOfPrivacyPracticesPDF,
                        NYCDOHMHNoticeOfPrivacyPracticesUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPracticesPDF: !clientData.NYCDOHMHNoticeOfPrivacyPracticesPDF,
                      })
                  }
                  }
                  checked={clientData.NYCDOHMHNoticeOfPrivacyPracticesPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.NYCDOHMHNoticeOfPrivacyPracticesScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.NYCDOHMHNoticeOfPrivacyPracticesScan ?
                  setClientData(formState => ({
                    ...formState,
                    NYCDOHMHNoticeOfPrivacyPracticesScan: !formState.NYCDOHMHNoticeOfPrivacyPracticesScan,
                    NYCDOHMHNoticeOfPrivacyPracticesUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    NYCDOHMHNoticeOfPrivacyPracticesScan: !formState.NYCDOHMHNoticeOfPrivacyPracticesScan,
                    NYCDOHMHNoticeOfPrivacyPracticesUploadDate: crearFecha()
                  }))
                  if(clientData.NYCDOHMHNoticeOfPrivacyPracticesPDF || !clientData.NYCDOHMHNoticeOfPrivacyPracticesScan){
                    setClientData(formState => ({
                      ...formState,
                      NYCDOHMHNoticeOfPrivacyPracticesUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.NYCDOHMHNoticeOfPrivacyPracticesScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.NYCDOHMHNoticeOfPrivacyPractices && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate === "" || clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPracticesScan: !clientData.NYCDOHMHNoticeOfPrivacyPracticesScan,
                        NYCDOHMHNoticeOfPrivacyPracticesUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPracticesScan: !clientData.NYCDOHMHNoticeOfPrivacyPracticesScan,
                      })
                  }
                  }
                  checked={clientData.NYCDOHMHNoticeOfPrivacyPracticesScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-pink grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEOutreachRetentionTrackingForm? '' :'pointer-events-none'} `} >
            <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEOutreachRetentionTrackingForm? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.LNEOutreachRetentionTrackingForm ?
                  setClientData(formState => ({
                    ...formState,
                    LNEOutreachRetentionTrackingForm: !formState.LNEOutreachRetentionTrackingForm,
                    LNEOutreachRetentionTrackingFormDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEOutreachRetentionTrackingForm: !formState.LNEOutreachRetentionTrackingForm,
                    LNEOutreachRetentionTrackingFormDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEOutreachRetentionTrackingForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEOutreachRetentionTrackingForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEOutreachRetentionTrackingFormDate === "" || clientData.LNEOutreachRetentionTrackingFormDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEOutreachRetentionTrackingForm: !clientData.LNEOutreachRetentionTrackingForm,
                        LNEOutreachRetentionTrackingFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEOutreachRetentionTrackingForm: !clientData.LNEOutreachRetentionTrackingForm,
                      })
                  }
                  }
                  checked={clientData.LNEOutreachRetentionTrackingForm ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE Outreach Retention/Tracking Form </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEOutreachRetentionTrackingForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEOutreachRetentionTrackingFormDate &&
                    clientData.LNEOutreachRetentionTrackingFormDate.split('T')[0]
                  }
                  disabled={clientData.LNEOutreachRetentionTrackingFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEOutreachRetentionTrackingFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.linkage_navigation_folder_url ? data[0]?.linkage_navigation_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEOutreachRetentionTrackingForm"
                  className={`${MSAStyles.inputDate} {${clientData.LNEOutreachRetentionTrackingForm && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LNEOutreachRetentionTrackingFormUploadDate &&
                  clientData.LNEOutreachRetentionTrackingFormUploadDate.split('T')[0]
                }
                disabled={clientData.LNEOutreachRetentionTrackingFormUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LNEOutreachRetentionTrackingFormUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEOutreachRetentionTrackingFormPDF? 'pointer-events-none' :""}`}
             onClick={() => {
              clientData.LNEOutreachRetentionTrackingFormPDF ?
                setClientData(formState => ({
                  ...formState,
                  LNEOutreachRetentionTrackingFormPDF: !formState.LNEOutreachRetentionTrackingFormPDF,
                  LNEOutreachRetentionTrackingFormUploadDate: ""
                })) :
                setClientData(formState => ({
                  ...formState,
                  LNEOutreachRetentionTrackingFormPDF: !formState.LNEOutreachRetentionTrackingFormPDF,
                  LNEOutreachRetentionTrackingFormUploadDate: crearFecha()
                }))
                if(clientData.LNEOutreachRetentionTrackingFormScan || !clientData.LNEOutreachRetentionTrackingFormPDF){
                  setClientData(formState => ({
                    ...formState,
                    LNEOutreachRetentionTrackingFormUploadDate: crearFecha()
                  }))
                }
              }
            }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEOutreachRetentionTrackingFormPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEOutreachRetentionTrackingForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEOutreachRetentionTrackingFormUploadDate === "" || clientData.LNEOutreachRetentionTrackingFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEOutreachRetentionTrackingFormPDF: !clientData.LNEOutreachRetentionTrackingFormPDF,
                        LNEOutreachRetentionTrackingFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEOutreachRetentionTrackingFormPDF: !clientData.LNEOutreachRetentionTrackingFormPDF,
                      })
                  }
                  }
                  checked={clientData.LNEOutreachRetentionTrackingFormPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEOutreachRetentionTrackingFormScan? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.LNEOutreachRetentionTrackingFormScan ?
                  setClientData(formState => ({
                    ...formState,
                    LNEOutreachRetentionTrackingFormScan: !formState.LNEOutreachRetentionTrackingFormScan,
                    LNEOutreachRetentionTrackingFormUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEOutreachRetentionTrackingFormScan: !formState.LNEOutreachRetentionTrackingFormScan,
                    LNEOutreachRetentionTrackingFormUploadDate: crearFecha()
                  }))
                  if(clientData.LNEOutreachRetentionTrackingFormPDF || !clientData.LNEOutreachRetentionTrackingFormScan){
                    setClientData(formState => ({
                      ...formState,
                      LNEOutreachRetentionTrackingFormUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEOutreachRetentionTrackingFormScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEOutreachRetentionTrackingForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEOutreachRetentionTrackingFormUploadDate === "" || clientData.LNEOutreachRetentionTrackingFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEOutreachRetentionTrackingFormScan: !clientData.LNEOutreachRetentionTrackingFormScan,
                        LNEOutreachRetentionTrackingFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEOutreachRetentionTrackingFormScan: !clientData.LNEOutreachRetentionTrackingFormScan,
                      })
                  }
                  }
                  checked={clientData.LNEOutreachRetentionTrackingFormScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-pink grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEReferralInformation? '' :'pointer-events-none'}`} >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEReferralInformation? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.LNEReferralInformation ?
                  setClientData(formState => ({
                    ...formState,
                    LNEReferralInformation: !formState.LNEReferralInformation,
                    LNEReferralInformationDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEReferralInformation: !formState.LNEReferralInformation,
                    LNEReferralInformationDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEReferralInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEReferralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEReferralInformationDate === "" || clientData.LNEReferralInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEReferralInformation: !clientData.LNEReferralInformation,
                        LNEReferralInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEReferralInformation: !clientData.LNEReferralInformation,
                      })
                  }
                  }
                  checked={clientData.LNEReferralInformation ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE Referral Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEReferralInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEReferralInformationDate &&
                    clientData.LNEReferralInformationDate.split('T')[0]
                  }
                  disabled={clientData.LNEReferralInformationDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEReferralInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.linkage_navigation_folder_url ? data[0]?.linkage_navigation_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEReferralInformation"
                  className={`${MSAStyles.inputDate} {${clientData.LNEReferralInformation && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LNEReferralInformationUploadDate &&
                  clientData.LNEReferralInformationUploadDate.split('T')[0]
                }
                disabled={clientData.LNEReferralInformationUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LNEReferralInformationUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEReferralInformationPDF? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.LNEReferralInformationPDF ?
                  setClientData(formState => ({
                    ...formState,
                    LNEReferralInformationPDF: !formState.LNEReferralInformationPDF,
                    LNEReferralInformationUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEReferralInformationPDF: !formState.LNEReferralInformationPDF,
                    LNEReferralInformationUploadDate: crearFecha()
                  }))
                  if(clientData.LNEReferralInformationScan || !clientData.LNEReferralInformationPDF){
                    setClientData(formState => ({
                      ...formState,
                      LNEReferralInformationUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEReferralInformationPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEReferralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEReferralInformationUploadDate === "" || clientData.LNEReferralInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEReferralInformationPDF: !clientData.LNEReferralInformationPDF,
                        LNEReferralInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEReferralInformationPDF: !clientData.LNEReferralInformationPDF,
                      })
                  }
                  }
                  checked={clientData.LNEReferralInformationPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEReferralInformationScan? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.LNEReferralInformationScan ?
                  setClientData(formState => ({
                    ...formState,
                    LNEReferralInformationScan: !formState.LNEReferralInformationScan,
                    LNEReferralInformationUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEReferralInformationScan: !formState.LNEReferralInformationScan,
                    LNEReferralInformationUploadDate: crearFecha()
                  }))
                  if(!clientData.LNEReferralInformationScan || !clientData.LNEReferralInformationPDF){
                    setClientData(formState => ({
                      ...formState,
                      LNEReferralInformationUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEReferralInformationScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEReferralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEReferralInformationUploadDate === "" || clientData.LNEReferralInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEReferralInformationScan: !clientData.LNEReferralInformationScan,
                        LNEReferralInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEReferralInformationScan: !clientData.LNEReferralInformationScan,
                      })
                  }
                  }
                  checked={clientData.LNEReferralInformationScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-pink grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEClientReferralForm? '' :'pointer-events-none'}`} >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientReferralForm? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.LNEClientReferralForm ?
                  setClientData(formState => ({
                    ...formState,
                    LNEClientReferralForm: !formState.LNEClientReferralForm,
                    LNEClientReferralFormDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEClientReferralForm: !formState.LNEClientReferralForm,
                    LNEClientReferralFormDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientReferralForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEClientReferralForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientReferralFormDate === "" || clientData.LNEClientReferralFormDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientReferralForm: !clientData.LNEClientReferralForm,
                        LNEClientReferralFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientReferralForm: !clientData.LNEClientReferralForm,
                      })
                  }
                  }
                  checked={clientData.LNEClientReferralForm ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE Client Referral Form </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientReferralForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEClientReferralFormDate &&
                    clientData.LNEClientReferralFormDate.split('T')[0]
                  }
                  disabled={clientData.LNEClientReferralFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientReferralFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.linkage_navigation_folder_url ? data[0]?.linkage_navigation_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientReferralForm"
                  className={`${MSAStyles.inputDate} {${clientData.LNEClientReferralForm && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LNEClientReferralFormUploadDate &&
                  clientData.LNEClientReferralFormUploadDate.split('T')[0]
                }
                disabled={clientData.LNEClientReferralFormUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LNEClientReferralFormUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientReferralFormPDF? 'pointer-events-none' :""}`}
             onClick={() => {
              clientData.LNEClientReferralFormPDF ?
                setClientData(formState => ({
                  ...formState,
                  LNEClientReferralFormPDF: !formState.LNEClientReferralFormPDF,
                  LNEClientReferralFormUploadDate: ""
                })) :
                setClientData(formState => ({
                  ...formState,
                  LNEClientReferralFormPDF: !formState.LNEClientReferralFormPDF,
                  LNEClientReferralFormUploadDate: crearFecha()
                }))
                if(!clientData.LNEClientReferralFormPDF || clientData.LNEClientReferralFormScan){
                  setClientData(formState => ({
                    ...formState,
                    LNEClientReferralFormUploadDate: crearFecha()
                  }))
                }
              }
            }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientReferralFormPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEClientReferralForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientReferralFormUploadDate === "" || clientData.LNEClientReferralFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientReferralFormPDF: !clientData.LNEClientReferralFormPDF,
                        LNEClientReferralFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientReferralFormPDF: !clientData.LNEClientReferralFormPDF,
                      })
                  }
                  }
                  
                  checked={clientData.LNEClientReferralFormPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientReferralFormScan? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.LNEClientReferralFormScan ?
                  setClientData(formState => ({
                    ...formState,
                    LNEClientReferralFormScan: !formState.LNEClientReferralFormScan,
                    LNEClientReferralFormUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEClientReferralFormScan: !formState.LNEClientReferralFormScan,
                    LNEClientReferralFormUploadDate: crearFecha()
                  }))
                  if(!clientData.LNEClientReferralFormScan || clientData.LNEClientReferralFormPDF){
                    setClientData(formState => ({
                      ...formState,
                      LNEClientReferralFormUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientReferralFormScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEClientReferralForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientReferralFormUploadDate === "" || clientData.LNEClientReferralFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientReferralFormScan: !clientData.LNEClientReferralFormScan,
                        LNEClientReferralFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientReferralFormScan: !clientData.LNEClientReferralFormScan,
                      })
                  }
                  }
                  checked={clientData.LNEClientReferralFormScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEHNSEligibilityForm? '' :'pointer-events-none'}`} >
            <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEHNSEligibilityForm? 'pointer-events-none' :""}`}
                 onClick={() => {
                clientData.LNEHNSEligibilityForm ?
                  setClientData(formState => ({
                    ...formState,
                    LNEHNSEligibilityForm: !formState.LNEHNSEligibilityForm,
                    LNEHNSEligibilityFormDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEHNSEligibilityForm: !formState.LNEHNSEligibilityForm,
                    LNEHNSEligibilityFormDate: crearFecha()
                  }))
                }
               }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEHNSEligibilityForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEHNSEligibilityForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEHNSEligibilityFormDate === "" || clientData.LNEHNSEligibilityFormDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEHNSEligibilityForm: !clientData.LNEHNSEligibilityForm,
                        LNEHNSEligibilityFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEHNSEligibilityForm: !clientData.LNEHNSEligibilityForm,
                      })
                  }
                  }
                  checked={clientData.LNEHNSEligibilityForm ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE HNS Eligibility Form </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEHNSEligibilityForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEHNSEligibilityFormDate &&
                    clientData.LNEHNSEligibilityFormDate.split('T')[0]
                  }
                  disabled={clientData.LNEHNSEligibilityFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEHNSEligibilityFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEHNSEligibilityForm"
                  className={`${MSAStyles.inputDate} {${clientData.LNEHNSEligibilityForm && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LNEHNSEligibilityFormUploadDate &&
                  clientData.LNEHNSEligibilityFormUploadDate.split('T')[0]
                }
                disabled={clientData.LNEHNSEligibilityFormUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LNEHNSEligibilityFormUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEHNSEligibilityFormPDF? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.LNEHNSEligibilityFormPDF ?
                  setClientData(formState => ({
                    ...formState,
                    LNEHNSEligibilityFormPDF: !formState.LNEHNSEligibilityFormPDF,
                    LNEHNSEligibilityFormUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LNEHNSEligibilityFormPDF: !formState.LNEHNSEligibilityFormPDF,
                    LNEHNSEligibilityFormUploadDate: crearFecha()
                  }))
                  if(!clientData.LNEHNSEligibilityFormPDF || clientData.LNEHNSEligibilityFormScan){
                    setClientData(formState => ({
                      ...formState,
                      LNEHNSEligibilityFormUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEHNSEligibilityFormPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEHNSEligibilityForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEHNSEligibilityFormUploadDate === "" || clientData.LNEHNSEligibilityFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEHNSEligibilityFormPDF: !clientData.LNEHNSEligibilityFormPDF,
                        LNEHNSEligibilityFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEHNSEligibilityFormPDF: !clientData.LNEHNSEligibilityFormPDF,
                      })
                  }
                  }
                  checked={clientData.LNEHNSEligibilityFormPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEHNSEligibilityFormScan? 'pointer-events-none' :""}`}
                onClick={() => {
                  clientData.LNEHNSEligibilityFormScan ?
                    setClientData(formState => ({
                      ...formState,
                      LNEHNSEligibilityFormScan: !formState.LNEHNSEligibilityFormScan,
                      LNEHNSEligibilityFormUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      LNEHNSEligibilityFormScan: !formState.LNEHNSEligibilityFormScan,
                      LNEHNSEligibilityFormUploadDate: crearFecha()
                    }))
                    if(!clientData.LNEHNSEligibilityFormScan || clientData.LNEHNSEligibilityFormPDF){
                      setClientData(formState => ({
                        ...formState,
                        LNEHNSEligibilityFormUploadDate: crearFecha()
                      }))
                    }
                  }
                }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEHNSEligibilityFormScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LNEHNSEligibilityForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEHNSEligibilityFormUploadDate === "" || clientData.LNEHNSEligibilityFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEHNSEligibilityFormScan: !clientData.LNEHNSEligibilityFormScan,
                        LNEHNSEligibilityFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEHNSEligibilityFormScan: !clientData.LNEHNSEligibilityFormScan,
                      })
                  }
                  }
                  checked={clientData.LNEHNSEligibilityFormScan ? 'checked' : false}
                />
              </div>
            </div>
          </section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5"
                onClick={() => handleMsaform()}
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

export default EditMsaFormPage;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientid}`
    );

    const data = await response.json();
    return { props: { data } };
  },
});
