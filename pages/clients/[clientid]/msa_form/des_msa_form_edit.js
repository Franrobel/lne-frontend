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
    AIRSCollateralInformation: data[0].airscollateralinformation === "0" || data[0].airscollateralinformation === null ? false : true,
    AIRSCollateralInformationDate: data[0].airscollateralinformationdate,
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
    const initialDate = new Date().toLocaleDateString()
    const newDate = initialDate.split('/')
    const fixedDate = `${newDate[2]}-${newDate[1].length === 1 ? `0${newDate[1]}` : `${newDate[1]}`}-${newDate[0].length === 1 ? `0${newDate[0]}` : `${newDate[0]}`}`
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
            Back to client profile
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
                  <div className="flex gap-x-2 ">
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
                    <h3 className="font-black mb-5">Client</h3>
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
                  <div className="flex gap-x-2">
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
                    <h3 className="font-black mb-5">Health Care Worker</h3>
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
            <div
              id="form-head"
              className={`${MSAStyles.formRowsContainerDesFormEdit} grid gap-5 justify-center items-end rounded-tl-lg rounded-tr-lg py-1 mx-1`}
            >

              <div></div>
              <div></div>
              <p className="text-center">Date added</p>
              <p className="text-center">Dropbox Folder</p>
              <p className="text-center">Date last updated</p>
              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 font-black"
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
                <p className="text-start">PDF version uploaded</p>
              </div>
              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 font-black"
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                        AIRSIntakeFormDate: ""
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
                <svg
                  className="mr-2"
                  width="18"
                  height="18"

                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
               {/*  <p className="text-dark-blue underline">Intake</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  className={MSAStyles.inputDate}
                value={
                  clientData.AIRSIntakeFormUploadDate &&
                  clientData.AIRSIntakeFormUploadDate.split('T')[0]
                }
                disabled={clientData.AIRSIntakeFormUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    AIRSIntakeFormUploadDate: e.target.value,
                  });
                
                }}
                />

              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSIntakeFormPDF? 'pointer-events-none' :""}`}

            
                onClick={() => {
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                <svg
                  width="18"
                  height="18"
                  className="mr-2"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
          {/*       <p className="text-dark-blue underline">CRBA</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessment"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.ServiceActionPlan? '' :'pointer-events-none'}`}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                <p>Service Action Plan <span className="text-red-500">*</span> </p>
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
                <svg
                  className="mr-2"
                  width="18"
                  height="18"

                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ServiceActionPlan"
                  className={MSAStyles.inputDate}
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
              <div className="ml-1 text-center flex justify-center items-center ">
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ServiceActionPlanPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  checked={clientData.ServiceActionPlan ? 'checked' : false}
                />
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                    className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  className="mr-2"
                  width="18"
                  height="18"

                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                      })
                  }
                  }
                  checked={clientData.AIRSCollateralInformation ? 'checked' : false}
                  disabled={clientData.AIRSCollateralInformation ? true : false}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
               {/*  <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSFinancialInformation"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.medical_folder_url ? data[0]?.medical_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHIVAIDSRiskHistory"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.medical_folder_url ? data[0]?.medical_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
               {/*  <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHousingInformation"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSInsuranceInformation"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.medical_folder_url ? data[0]?.medical_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSSubstanceUseHistory"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
             className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEClientRights? '' :'pointer-events-none'}`} >

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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}

              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientRights"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEClientGrievancePolicyProcedure? '' :'pointer-events-none'}`} >

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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEProgramRules? '' :'pointer-events-none'}`} >
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
               {/*  <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEProgramRules"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEEmergencyContactConsent? '' :'pointer-events-none'}`} >
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
               {/*  <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEEmergencyContactConsent"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2  ${clientData.LNEConsentForReleaseOfConfidentialInformation? '' :'pointer-events-none'}`} >
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
               <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEConsentForReleaseOfConfidentialInformation"
                  className={MSAStyles.inputDate}
                value={
                  clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate &&
                  clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate.split('T')[0]
                }            LLNEConsentForReleaseOfConfidentialInformationUploadDate
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.HIPPAConsentForm? '' :'pointer-events-none'}`} >
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.NYCDOHMHNoticeOfPrivacyPractices? '' :'pointer-events-none'} `} >
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="NYCDOHMHNoticeOfPrivacyPractices"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEOutreachRetentionTrackingForm? '' :'pointer-events-none'} `} >
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEOutreachRetentionTrackingForm"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEReferralInformation? '' :'pointer-events-none'}`} >
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEReferralInformation"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEClientReferralForm? '' :'pointer-events-none'}`} >
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientReferralForm"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.LNEHNSEligibilityForm? '' :'pointer-events-none'}`} >
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEHNSEligibilityForm"
                  className={MSAStyles.inputDate}
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
                  className="appearance-none relative bg-white border-dark-blue rounded-md  border-2 h-6 w-6 "
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
    const  response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientid}`
    );

    const data = await  response.json();
    return { props: { data } };
  },
});