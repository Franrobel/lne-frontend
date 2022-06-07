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

    ProgressNote: data[0].progressnoteid ==="" || data[0].progressnoteid ===null? false:true,
    ProgressNoteDate: data[0].progressnotedate , 
    ProgressNoteUploadDate: data[0].progressnoteuploaddate || null, 
    ProgressNoteScan: data[0].progressnotescan || data[0].progressnotescan ===null? false:true, 
    ProgressNotePDF: data[0].progressnotepdf || data[0].progressnotepdf ===null? false:true,

    StatusChangesForm:data[0].statuschangesform ==="0" || data[0].statuschangesform ===null? false : true, 
    StatusChangesFormDate:data[0].statuschangesformdate, 
    StatusChangesFormUploadDate:data[0].statuschangesformuploaddate, 
    StatusChangesFormScan:data[0].statuschangesformscan ==="0" || data[0].statuschangesformscan ===null? false : true, 
    StatusChangesFormPDF:data[0].statuschangesformpdf ==="0" || data[0].statuschangesformpdf ===null? false : true,

    ComprehensiveRiskBehaviorAssessmentUpdates: data[0].comprehensiveriskbehaviorassessmentupdates ==="0"|| data[0].comprehensiveriskbehaviorassessmentupdates===null? false:true,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate: data[0].comprehensiveriskbehaviorassessmentdate, 
    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate: data[0].comprehensiveriskbehaviorassessmentuploaddate, 
    ComprehensiveRiskBehaviorAssessmentUpdatesFormScan: data[0].comprehensiveriskbehaviorassessmentupdatesformscan==="0"|| data[0].comprehensiveriskbehaviorassessmentupdatesformscan===null? false:true,  
    ComprehensiveRiskBehaviorAssessmentUpdatesPDF: data[0].comprehensiveriskbehaviorassessmentpdf === "0"|| data[0].comprehensiveriskbehaviorassessmentpdf ===null? false:true,
    
    M11QForm:data[0].m11qform ==="0" || data[0].m11qform ===null? false : true, 
    M11QFormDate:data[0].m11qformdate, 
    M11QFormUploadDate:data[0].m11qformuploaddate, 
    M11QFormScan:data[0].m11qformscan ==="0" || data[0].m11qformscan ===null? false : true, 
    M11QFormPDF:data[0].m11qformpdf ==="0" || data[0].m11qformpdf ===null? false : true,
    
    CD4VLReports:data[0].cd4vlreports ==="0" || data[0].cd4vlreports ===null? false : true,
    CD4VLReportsDate:data[0].cd4vlreportsdate, 
    CD4VLReportsUploadDate:data[0].cd4vlreportsuploaddate, 
    CD4VLReportsScan:data[0].cd4vlreportsscan ==="0" || data[0].cd4vlreportsscan ===null? false : true, 
    CD4VLReportsPDF:data[0].cd4vlreportspdf ==="0" || data[0].cd4vlreportspdf ===null? false : true,
    
    InitialTreatmentAdherenceIntake:data[0].initialtreatmentadherenceintake ==="0" || data[0].initialtreatmentadherenceintake ===null? false : true, 
    InitialTreatmentAdherenceIntakeDate:data[0].initialtreatmentadherenceintakedate, 
    InitialTreatmentAdherenceIntakeUploadDate:data[0].initialtreatmentadherenceintakeuploaddate, 
    InitialTreatmentAdherenceIntakeScan:data[0].initialtreatmentadherenceintakescan ==="0" || data[0].initialtreatmentadherenceintakescan ===null? false : true, 
    InitialTreatmentAdherenceIntakePDF:data[0].initialtreatmentadherenceintakepdf ==="0" || data[0].initialtreatmentadherenceintakepdf ===null? false : true, 
    
    TreatmentAdherenceUpdates:data[0].treatmentadherenceupdates ==="0" || data[0].treatmentadherenceupdates ===null? false : true,
    TreatmentAdherenceUpdatesDate:data[0].treatmentadherenceupdatesdate, 
    TreatmentAdherenceUpdatesUploadDate:data[0].treatmentadherenceupdatesuploaddate,
    TreatmentAdherenceUpdatesScan:data[0].treatmentadherenceupdatesscan ==="0" || data[0].treatmentadherenceupdatesscan ===null? false : true, 
    TreatmentAdherenceUpdatesPDF:data[0].treatmentadherenceupdatespdf ==="0" || data[0].treatmentadherenceupdatespdf ===null? false : true,

    AIRSCollateralInformation: data[0].airscollateralinformation ==="0" || data[0].airscollateralinformation ===null? false : true,
    AIRSCollateralInformationDate:data[0].airscollateralinformationdate,
    AIRSCollateralInformationPDF: data[0].airscollateralinformationpdf=== "0" || data[0].airscollateralinformationpdf=== null ? false : true,
    AIRSCollateralInformationScan: data[0].airscollateralinformationscan=== "0" || data[0].airscollateralinformationscan=== null ? false : true,
    AIRSCollateralInformationUploadDate: data[0].airscollateralinformationuploaddate || null,

    AIRSDrugRegimen: data[0].airsdrugregimen ==="0" || data[0].airsdrugregimen ===null? false : true,
    AIRSDrugRegimenDate: data[0].airsdrugregimendate,
    AIRSDrugRegimenPDF: data[0].airsdrugregimenpdf ==="0" || data[0].airsdrugregimenpdf ===null ? false : true,
    AIRSDrugRegimenScan: data[0].airsdrugregimenscan ==="0" || data[0].airsdrugregimenscan ===null ? false : true,
    AIRSDrugRegimenUploadDate: data[0].airsdrugregimenuploaddate || null, 

    AIRSFinancialInformation: data[0].airsfinancialinformation === "0" || data[0].airsfinancialinformation === null ? false : true,
    AIRSFinancialInformationDate: data[0].airsfinancialinformationdate,
    AIRSFinancialInformationPDF: data[0].airsfinancialinformationpdf=== "0" || data[0].airsfinancialinformationpdf=== null ? false : true,
    AIRSFinancialInformationScan: data[0].airsfinancialinformationscan=== "0" || data[0].airsfinancialinformationscan===null ? false : true,
    AIRSFinancialInformationUploadDate: data[0].airsfinancialinformationuploaddate || null,

    AIRSHIVAIDSRiskHistory: data[0].airshivaidsriskhistory === "0" || data[0].airshivaidsriskhistory === null ? false : true,
    AIRSHIVAIDSRiskHistoryDate: data[0].airshivaidsriskhistorydate,
    AIRSHIVAIDSRiskHistoryPDF: data[0].airshivaidsriskhistorypdf==="0" || data[0].airshivaidsriskhistorypdf===null ? false: true, 
    AIRSHIVAIDSRiskHistoryScan: data[0].airshivaidsriskhistoryscan==="0" || data[0].airshivaidsriskhistoryscan===null ? false: true, 
    AIRSHIVAIDSRiskHistoryUploadDate: data[0].airshivaidsriskhistoryuploaddate || null,

    
    AIRSHIVMedicalProvider: data[0].airshivmedicalprovider === "0" || data[0].airshivmedicalprovider === null ? false : true,
    AIRSHIVMedicalProviderDate: data[0].airshivmedicalproviderdate,
    AIRSHIVMedicalProviderPDF: data[0].airshivmedicalproviderpdf==="0" || data[0].airshivmedicalproviderpdf===null ? false: true, 
    AIRSHIVMedicalProviderScan: data[0].airshivaidsriskhistoryscan==="0" || data[0].airshivmedicalproviderscan===null ? false: true, 
    AIRSHIVMedicalProviderUploadDate: data[0].airshivmedicalprovideruploaddate || null,

    AIRSHIVStatusHistory : data[0].airshivstatushistory === "0" || data[0].airshivstatushistory === null ? false : true,
    AIRSHIVStatusHistoryDate: data[0].airshivstatushistorydate,
    AIRSHIVStatusHistoryPDF: data[0].airshivstatushistorypdf==="0" || data[0].airshivstatushistorypdf===null ? false: true, 
    AIRSHIVStatusHistoryScan: data[0].airshivstatushistoryscan==="0" || data[0].airshivstatushistoryscan===null ? false: true, 
    AIRSHIVStatusHistoryUploadDate: data[0].airshivstatushistoryuploaddate || null,

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

    LinkageRetentionAdherenceForms: data[0].linkageretentionadherenceforms === "0" || data[0].linkageretentionadherenceforms === null ? false : true,
    LinkageRetentionAdherenceFormsDate: data[0].linkageretentionadherenceformsdate,
    LinkageRetentionAdherenceFormsPDF: data[0].linkageretentionadherenceformspdf=== "0" || data[0].linkageretentionadherenceformspdf=== null ? false : true,
    LinkageRetentionAdherenceFormsScan: data[0].linkageretentionadherenceformsscan=== "0" || data[0].linkageretentionadherenceformsscan=== null ? false : true,
    LinkageRetentionAdherenceFormsUploadDate: data[0].linkageretentionadherenceformsuploaddate || null,

    InternalReferralInformation: data[0].internalreferralinformation === "0" || data[0].internalreferralinformation === null ? false : true,
    InternalReferralInformationDate: data[0].internalreferralinformationdate,
    InternalReferralInformationPDF:  data[0].internalreferralinformationpdf=== "0" || data[0].internalreferralinformationpdf=== null ? false : true,
    InternalReferralInformationScan:  data[0].internalreferralinformationscan=== "0" || data[0].internalreferralinformationscan=== null ? false : true,
    InternalReferralInformationUploadDate: data[0].internalreferralinformationuploaddate || null,

    LNEClientReferralForm: data[0].lneclientreferralform === "0" || data[0].lneclientreferralform === null ? false : true,
    LNEClientReferralFormDate: data[0].lneclientreferralformdate,
    LNEClientReferralFormPDF: data[0].lneclientreferralformpdf=== "0" || data[0].lneclientreferralformpdf=== null ? false : true,
    LNEClientReferralFormScan: data[0].lneclientreferralformscan=== "0" || data[0].lneclientreferralformscan=== null ? false : true,
    LNEClientReferralFormUploadDate: data[0].lneclientreferralformuploaddate || null,

    LNEHNSEligibilityForm: data[0].hnseligibilityform === "0" || data[0].hnseligibilityform === null ? false : true,
    LNEHNSEligibilityFormDate: data[0].hnseligibilityformdate,
    LNEHNSEligibilityFormPDF: data[0].hnseligibilityformpdf=== "0" || data[0].hnseligibilityformpdf=== null ? false : true,
    LNEHNSEligibilityFormScan: data[0].hnseligibilityformscan=== "0" || data[0].hnseligibilityformscan=== null ? false : true,
    LNEHNSEligibilityFormUploadDate: data[0].hnseligibilityformuploaddate || null,

    HNSEligibilityForm: data[0].hnseligibilityform === "0" || data[0].hnseligibilityform === null ? false : true,
    HNSEligibilityFormDate: data[0].hnseligibilityformdate,
    HNSEligibilityFormPDF: data[0].hnseligibilityformpdf=== "0" || data[0].hnseligibilityformpdf=== null ? false : true,
    HNSEligibilityFormScan: data[0].hnseligibilityformscan=== "0" || data[0].hnseligibilityformscan=== null ? false : true,
    HNSEligibilityFormUploadDate: data[0].hnseligibilityformuploaddate || null,
    
    HNSReadinessForm:data[0].hnsreadinessform ==="0" || data[0].hnsreadinessform === null? false : true,
    HNSReadinessFormDate: data[0].hnsreadinessformdate,
    HNSReadinessFormUploadDate: data[0].hnsreadinessformuploaddate || null,
    HNSReadinessFormScan:data[0].hnsreadinessformscan ==="0" || data[0].hnsreadinessformscan === null? false : true,
    HNSReadinessFormPDF:data[0].hnsreadinessformpdf ==="0" || data[0].hnsreadinessformpdf === null? false : true,
    
    SupportGroups:data[0].supportgroups ==="0" || data[0].supportgroups === null? false : true,
    SupportGroupsDate:data[0].supportgroupsdate,
    SupportGroupsUploadDate:data[0].supportgroupsuploaddate, 
    SupportGroupsScan:data[0].supportgroupsscan ==="0" || data[0].supportgroupsscan === null? false : true, 
    SupportGroupsPDF:data[0].supportgroupspdf ==="0" || data[0].supportgroupspdf === null? false : true, 
    
    IDGForm:data[0].idgform ==="0" || data[0].idgform === null? false : true, 
    IDGFormDate:data[0].idgformdate, 
    IDGFormUploadDate:data[0].idgformuploaddate || null, 
    IDGFormScan:data[0].idgformscan ==="0" || data[0].idgformscan === null? false : true, 
    IDGFormPDF:data[0].idgformpdf ==="0" || data[0].idgformpdf === null? false : true,
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
          /* setTimeout(() => {
            router.push(`/dashboard`)
          }, 2300) */
        
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
                  });
                
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
                <p>Comprehensive Behavioral Risk Assessment <span className="text-red-500">*</span> </p>
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
              // onClick={() => {
              //   clientData.ServiceActionPlanPDF ?
              //     setClientData(formState => ({
              //       ...formState,
              //       ServiceActionPlanPDF: !formState.ServiceActionPlanPDF,
              //       ServiceActionPlanUploadDate: ""
              //     })) :
              //     setClientData(formState => ({
              //       ...formState,
              //       ServiceActionPlanPDF: !formState.ServiceActionPlanPDF,
              //       ServiceActionPlanUploadDate: crearFecha()
              //     }))
              //     if(!clientData.ServiceActionPlanPDF || clientData.ServiceActionPlanPDF){
              //       setClientData(formState => ({
              //         ...formState,
              //         ServiceActionPlanUploadDate: crearFecha()
              //       }))
              //     }
              //   }
              // } 
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ServiceActionPlanPDF ? "3" : "0"}>
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
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${clientData.ProgressNote? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ProgressNote? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.ProgressNote ?
                  setClientData(formState => ({
                    ...formState,
                    ProgressNote: !formState.ProgressNote,
                    ProgressNoteDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    ProgressNote: !formState.ProgressNote,
                    ProgressNoteDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ProgressNote ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ProgressNote && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ProgressNoteDate === "" || clientData.ProgressNoteDate === null ? (
                      setClientData({
                        ...clientData,
                        ProgressNote: !clientData.ProgressNote,
                        ProgressNoteDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ProgressNote: !clientData.ProgressNote,
                        ProgressNoteDate: ""
                      })
                  }
                  }
                  checked={clientData.ProgressNote ? 'checked' : false}
                />
              </div>
              <div>
                <p>Progress Note</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ProgressNote"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.ProgressNoteDate &&
                    clientData.ProgressNoteDate.split('T')[0]
                  }
                  disabled={clientData.ProgressNote ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      ProgressNoteDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.linkage_navigation_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ProgressNote"
                  className={`${MSAStyles.inputDate} {${(clientData.ProgressNote) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.ProgressNoteUploadDate &&
                  clientData.ProgressNoteUploadDate.split('T')[0]
                }
                disabled={clientData.ProgressNoteUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    ProgressNoteUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ProgressNotePDF? 'pointer-events-none' :""}`}
              // onClick={() => {
              //   clientData.ProgressNotePDF ?
              //     setClientData(formState => ({
              //       ...formState,
              //       ProgressNotePDF: !formState.ProgressNotePDF,
              //       ProgressNoteUploadDate: ""
              //     })) :
              //     setClientData(formState => ({
              //       ...formState,
              //       ProgressNotePDF: !formState.ProgressNotePDF,
              //       ProgressNoteUploadDate: crearFecha()
              //     }))
              //     if(!clientData.ProgressNotePDF || clientData.ProgressNotePDF){
              //       setClientData(formState => ({
              //         ...formState,
              //         ProgressNoteUploadDate: crearFecha()
              //       }))
              //     }
              //   }
              // } 
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ProgressNotePDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ProgressNote && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ProgressNoteDate === "" || clientData.ProgressNoteDate === null ? (
                      setClientData({
                        ...clientData,
                        ProgressNote: !clientData.ProgressNote,
                        ProgressNoteDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ProgressNote: !clientData.ProgressNote,
                      })
                  }
                  }
                  checked={clientData.ProgressNotePDF ? 'checked' : false}
                /> */}
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ProgressNoteScan? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.ProgressNoteScan ?
                    setClientData(formState => ({
                      ...formState,
                      ProgressNoteScan: !formState.ProgressNoteScan,
                      ProgressNoteUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      ProgressNoteScan: !formState.ProgressNoteScan,
                      ProgressNoteUploadDate: crearFecha()
                    }))}}
                    >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ProgressNoteScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ProgressNote && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ProgressNoteUploadDate === "" || clientData.ProgressNoteUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        ProgressNoteScan: !clientData.ProgressNoteScan,
                        ProgressNoteUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ProgressNoteScan: !clientData.ProgressNoteScan,
                      })
                  }
                  }
                  checked={clientData.ProgressNoteScan ? 'checked' : false}
                />
              </div>
            </div>

            <div 
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.StatusChangesForm? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.StatusChangesForm? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.StatusChangesForm ?
                  setClientData(formState => ({
                    ...formState,
                    StatusChangesForm: !formState.StatusChangesForm,
                    StatusChangesFormDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    StatusChangesForm: !formState.StatusChangesForm,
                    StatusChangesFormDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.StatusChangesForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.StatusChangesForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.StatusChangesFormDate === "" || clientData.StatusChangesFormDate === null ? (
                      setClientData({
                        ...clientData,
                        StatusChangesForm: !clientData.StatusChangesForm,
                        StatusChangesFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        StatusChangesForm: !clientData.StatusChangesForm,
                        StatusChangesFormDate: ""
                      })
                  }
                  }
                  checked={clientData.StatusChangesForm ? 'checked' : false}
                />
              </div>
              <div>
                <p>Status Changes/Closure Forms</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="StatusChangeForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.StatusChangesFormDate &&
                    clientData.StatusChangesFormDate.split('T')[0]
                  }
                  disabled={clientData.StatusChangesForm ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      StatusChangesFormDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.intake_folder_url? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="StatusChangeForm"
                  className={`${MSAStyles.inputDate} {${(clientData.StatusChangesForm) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.StatusChangesFormUploadDate &&
                  clientData.StatusChangesFormUploadDate.split('T')[0]
                }
                disabled={clientData.StatusChangesFormUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    StatusChangesFormUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.StatusChangesFormPDF? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.StatusChangesFormPDF ?
                  setClientData(formState => ({
                    ...formState,
                    StatusChangesFormPDF: !formState.StatusChangesFormPDF,
                    StatusChangesFormUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    StatusChangesFormPDF: !formState.StatusChangesFormPDF,
                    StatusChangesFormUploadDate: crearFecha()
                  }))
                  if(!clientData.StatusChangesFormPDF || clientData.StatusChangesFormPDF){
                    setClientData(formState => ({
                      ...formState,
                      StatusChangesFormUploadDate: crearFecha()
                    }))
                  }
                }
              } >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.StatusChangesFormPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.StatusChangesForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.StatusChangesFormDate === "" || clientData.StatusChangesFormDate === null ? (
                      setClientData({
                        ...clientData,
                        StatusChangesForm: !clientData.StatusChangesForm,
                        StatusChangesFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        StatusChangesForm: !clientData.StatusChangesForm,
                      })
                  }
                  }
                  checked={clientData.StatusChangesFormPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.StatusChangesFormScan? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.StatusChangesFormScan ?
                    setClientData(formState => ({
                      ...formState,
                      StatusChangesFormScan: !formState.StatusChangesFormScan,
                      StatusChangesFormUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      StatusChangesFormScan: !formState.StatusChangesFormScan,
                      StatusChangesFormUploadDate: crearFecha()
                    }))}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.StatusChangesFormScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.StatusChangesForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.StatusChangesFormUploadDate === "" || clientData.StatusChangesFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        StatusChangesFormScan: !clientData.StatusChangesFormScan,
                        StatusChangeFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        StatusChangesFormScan: !clientData.StatusChangesFormScan,
                      })
                  }
                  }
                  checked={clientData.StatusChangesFormScan ? 'checked' : false}
                />
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.ComprehensiveRiskBehaviorAssessmentUpdates? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ComprehensiveRiskBehaviorAssessmentUpdates? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.ComprehensiveRiskBehaviorAssessmentUpdates ?
                  setClientData(formState => ({
                    ...formState,
                    ComprehensiveRiskBehaviorAssessmentUpdates: !formState.ComprehensiveRiskBehaviorAssessmentUpdates,
                    ComprehensiveRiskBehaviorAssessmentUpdatesDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    ComprehensiveRiskBehaviorAssessmentUpdates: !formState.ComprehensiveRiskBehaviorAssessmentUpdates,
                    ComprehensiveRiskBehaviorAssessmentUpdatesDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ComprehensiveRiskBehaviorAssessmentUpdates ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ComprehensiveRiskBehaviorAssessmentUpdates && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate === "" || clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate === null ? (
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdates: !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdates: !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: ""
                      })
                  }
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessmentUpdates ? 'checked' : false}
                />
              </div>
              <div>
                <p>Comprehensive Behavioral Risk Assessment Updates</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate.split('T')[0]
                  }
                  disabled={clientData.ComprehensiveRiskBehaviorAssessmentUpdates ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentUpdatesDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.cbra_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  className={`${MSAStyles.inputDate} {${(clientData.ComprehensiveRiskBehaviorAssessmentUpdates) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate &&
                  clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate.split('T')[0]
                }
                disabled={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ComprehensiveRiskBehaviorAssessmentUpdatesPDF? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.ComprehensiveRiskBehaviorAssessmentUpdatesPDF ?
                  setClientData(formState => ({
                    ...formState,
                    ComprehensiveRiskBehaviorAssessmentUpdatesPDF: !formState.ComprehensiveRiskBehaviorAssessmentUpdatesPDF,
                    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    ComprehensiveRiskBehaviorAssessmentUpdatesPDF: !formState.ComprehensiveRiskBehaviorAssessmentUpdatesPDF,
                    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate: crearFecha()
                  }))
                  if(!clientData.ComprehensiveRiskBehaviorAssessmentUpdatesPDF || clientData.ComprehensiveRiskBehaviorAssessmentUpdatesPDF){
                    setClientData(formState => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate: crearFecha()
                    }))
                  }
                }
              } >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ComprehensiveRiskBehaviorAssessmentUpdates && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate === "" || clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate === null ? (
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdates: !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdates: !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                      })
                  }
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormScan? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormScan ?
                    setClientData(formState => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessmentUpdatesFormScan: !formState.ComprehensiveRiskBehaviorAssessmentUpdatesFormScan,
                      ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessmentUpdatesFormScan: !formState.ComprehensiveRiskBehaviorAssessmentUpdatesFormScan,
                      ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate: crearFecha()
                    }))}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.ComprehensiveRiskBehaviorAssessmentUpdates && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate === "" || clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdatesFormScan: !clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormScan,
                        ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdatesFormScan: !clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormScan,
                      })
                  }
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormScan ? 'checked' : false}
                />
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.M11QForm? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.M11QForm? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.M11QForm ?
                  setClientData(formState => ({
                    ...formState,
                    M11QForm: !formState.M11QForm,
                    M11QFormDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    M11QForm: !formState.M11QForm,
                    M11QFormDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.M11QForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.M11QForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.M11QFormDate === "" || clientData.M11QFormDate === null ? (
                      setClientData({
                        ...clientData,
                        M11QForm: !clientData.M11QForm,
                        M11QFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        M11QForm: !clientData.M11QForm,
                        M11QFormDate: ""
                      })
                  }
                  }
                  checked={clientData.M11QForm ? 'checked' : false}
                />
              </div>
              <div>
                <p>M11Q</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="M11QForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.M11QFormDate &&
                    clientData.M11QFormDate.split('T')[0]
                  }
                  disabled={clientData.M11QForm ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      M11QFormDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.medical_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="M11QForm"
                  className={`${MSAStyles.inputDate} {${(clientData.M11QForm) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.M11QFormUploadDate &&
                  clientData.M11QFormUploadDate.split('T')[0]
                }
                disabled={clientData.M11QFormUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    M11QFormUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.M11QFormPDF? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.M11QFormPDF ?
                  setClientData(formState => ({
                    ...formState,
                    M11QFormPDF: !formState.M11QFormPDF,
                    M11QFormUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    M11QFormPDF: !formState.M11QFormPDF,
                    M11QFormUploadDate: crearFecha()
                  }))
                  if(!clientData.M11QFormPDF || clientData.M11QFormPDF){
                    setClientData(formState => ({
                      ...formState,
                      M11QFormUploadDate: crearFecha()
                    }))
                  }
                }
              } >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.M11QFormPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.M11QForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.M11QFormDate === "" || clientData.M11QFormDate === null ? (
                      setClientData({
                        ...clientData,
                        M11QForm: !clientData.M11QForm,
                        M11QFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        M11QForm: !clientData.M11QForm,
                      })
                  }
                  }
                  checked={clientData.M11QFormPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.M11QFormScan? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.M11QFormScan ?
                    setClientData(formState => ({
                      ...formState,
                      M11QFormScan: !formState.M11QFormScan,
                      M11QFormUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      M11QFormScan: !formState.M11QFormScan,
                      M11QFormUploadDate: crearFecha()
                    }))}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.M11QFormScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.M11QForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.M11QFormUploadDate === "" || clientData.M11QFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        M11QFormScan: !clientData.M11QFormScan,
                        M11QFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        M11QFormScan: !clientData.M11QFormScan,
                      })
                  }
                  }
                  checked={clientData.M11QFormScan ? 'checked' : false}
                />
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.CD4VLReports? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.CD4VLReports? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.CD4VLReports ?
                  setClientData(formState => ({
                    ...formState,
                    CD4VLReports: !formState.CD4VLReports,
                    CD4VLReportsDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    CD4VLReports: !formState.CD4VLReports,
                    CD4VLReportsDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.CD4VLReports ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.CD4VLReports && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.CD4VLReportsDate === "" || clientData.CD4VLReportsDate === null ? (
                      setClientData({
                        ...clientData,
                        CD4VLReports: !clientData.CD4VLReports,
                        CD4VLReportsDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        CD4VLReports: !clientData.CD4VLReports,
                        CD4VLReportsDate: ""
                      })
                  }
                  }
                  checked={clientData.CD4VLReports ? 'checked' : false}
                />
              </div>
              <div>
                <p>CD4/VL Check Reports</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="CD4VLReports"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.CD4VLReportsDate &&
                    clientData.CD4VLReportsDate.split('T')[0]
                  }
                  disabled={clientData.CD4VLReports ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      CD4VLReportsDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.medical_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="CD4VLReports"
                  className={`${MSAStyles.inputDate} {${(clientData.CD4VLReports) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.CD4VLReportsUploadDate &&
                  clientData.CD4VLReportsUploadDate.split('T')[0]
                }
                disabled={clientData.CD4VLReportsUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    CD4VLReportsUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.CD4VLReportsPDF? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.CD4VLReportsPDF ?
                  setClientData(formState => ({
                    ...formState,
                    CD4VLReportsPDF: !formState.CD4VLReportsPDF,
                    CD4VLReportsUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    CD4VLReportsPDF: !formState.CD4VLReportsPDF,
                    CD4VLReportsUploadDate: crearFecha()
                  }))
                  if(!clientData.CD4VLReportsPDF || clientData.CD4VLReportsPDF){
                    setClientData(formState => ({
                      ...formState,
                      CD4VLReportsUploadDate: crearFecha()
                    }))
                  }
                }
              } >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.CD4VLReportsPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.CD4VLReports && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.CD4VLReportsDate === "" || clientData.CD4VLReportsDate === null ? (
                      setClientData({
                        ...clientData,
                        CD4VLReports: !clientData.CD4VLReports,
                        CD4VLReportsDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        CD4VLReports: !clientData.CD4VLReports,
                      })
                  }
                  }
                  checked={clientData.CD4VLReportsPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.CD4VLReportsScan? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.CD4VLReportsScan ?
                    setClientData(formState => ({
                      ...formState,
                      CD4VLReportsScan: !formState.CD4VLReportsScan,
                      CD4VLReportsUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      CD4VLReportsScan: !formState.CD4VLReportsScan,
                      CD4VLReportsUploadDate: crearFecha()
                    }))}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.CD4VLReportsScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.CD4VLReports && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.CD4VLReportsUploadDate === "" || clientData.CD4VLReportsUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        CD4VLReportsScan: !clientData.CD4VLReportsScan,
                        CD4VLReportsUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        CD4VLReportsScan: !clientData.CD4VLReportsScan,
                      })
                  }
                  }
                  checked={clientData.CD4VLReportsScan ? 'checked' : false}
                />
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.InitialTreatmentAdherenceIntake? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.InitialTreatmentAdherenceIntake? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.InitialTreatmentAdherenceIntake ?
                  setClientData(formState => ({
                    ...formState,
                    InitialTreatmentAdherenceIntake: !formState.InitialTreatmentAdherenceIntake,
                    InitialTreatmentAdherenceIntakeDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    InitialTreatmentAdherenceIntake: !formState.InitialTreatmentAdherenceIntake,
                    InitialTreatmentAdherenceIntakeDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.InitialTreatmentAdherenceIntake ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.InitialTreatmentAdherenceIntake && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InitialTreatmentAdherenceIntakeDate === "" || clientData.InitialTreatmentAdherenceIntakeDate === null ? (
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntake: !clientData.InitialTreatmentAdherenceIntake,
                        InitialTreatmentAdherenceIntakeDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntake: !clientData.InitialTreatmentAdherenceIntake,
                        InitialTreatmentAdherenceIntakeDate: ""
                      })
                  }
                  }
                  checked={clientData.InitialTreatmentAdherenceIntake ? 'checked' : false}
                />
              </div>
              <div>
                <p>Initial Treatment Adherence Intake</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="InitialTreatmentAdherenceIntake"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.InitialTreatmentAdherenceIntakeDate &&
                    clientData.InitialTreatmentAdherenceIntakeDate.split('T')[0]
                  }
                  disabled={clientData.InitialTreatmentAdherenceIntake ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      InitialTreatmentAdherenceIntakeDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.medical_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="InitialTreatmentAdherenceIntake"
                  className={`${MSAStyles.inputDate} {${(clientData.InitialTreatmentAdherenceIntake) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.InitialTreatmentAdherenceIntakeUploadDate &&
                  clientData.InitialTreatmentAdherenceIntakeUploadDate.split('T')[0]
                }
                disabled={clientData.InitialTreatmentAdherenceIntakeUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    InitialTreatmentAdherenceIntakeUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.InitialTreatmentAdherenceIntakePDF? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.InitialTreatmentAdherenceIntakePDF ?
                  setClientData(formState => ({
                    ...formState,
                    InitialTreatmentAdherenceIntakePDF: !formState.InitialTreatmentAdherenceIntakePDF,
                    InitialTreatmentAdherenceIntakeUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    InitialTreatmentAdherenceIntakePDF: !formState.InitialTreatmentAdherenceIntakePDF,
                    InitialTreatmentAdherenceIntakeUploadDate: crearFecha()
                  }))
                  if(!clientData.InitialTreatmentAdherenceIntakePDF || clientData.InitialTreatmentAdherenceIntakePDF){
                    setClientData(formState => ({
                      ...formState,
                      InitialTreatmentAdherenceIntakeUploadDate: crearFecha()
                    }))
                  }
                }
              } >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.InitialTreatmentAdherenceIntakePDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.InitialTreatmentAdherenceIntake && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InitialTreatmentAdherenceIntakeDate === "" || clientData.InitialTreatmentAdherenceIntakeDate === null ? (
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntake: !clientData.InitialTreatmentAdherenceIntake,
                        InitialTreatmentAdherenceIntakeDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntake: !clientData.InitialTreatmentAdherenceIntake,
                      })
                  }
                  }
                  checked={clientData.InitialTreatmentAdherenceIntakePDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.InitialTreatmentAdherenceIntakeScan? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.InitialTreatmentAdherenceIntakeScan ?
                    setClientData(formState => ({
                      ...formState,
                      InitialTreatmentAdherenceIntakeScan: !formState.InitialTreatmentAdherenceIntakeScan,
                      InitialTreatmentAdherenceIntakeUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      InitialTreatmentAdherenceIntakeScan: !formState.InitialTreatmentAdherenceIntakeScan,
                      InitialTreatmentAdherenceIntakeUploadDate: crearFecha()
                    }))}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.InitialTreatmentAdherenceIntakeScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.InitialTreatmentAdherenceIntake && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InitialTreatmentAdherenceIntakeUploadDate === "" || clientData.InitialTreatmentAdherenceIntakeUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntakeScan: !clientData.InitialTreatmentAdherenceIntakeScan,
                        InitialTreatmentAdherenceIntakeUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntakeScan: !clientData.InitialTreatmentAdherenceIntakeScan,
                      })
                  }
                  }
                  checked={clientData.InitialTreatmentAdherenceIntakeScan ? 'checked' : false}
                />
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.TreatmentAdherenceUpdates? '' :'pointer-events-none'}`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.InitialTreatmentAdherenceIntake? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.TreatmentAdherenceUpdates ?
                  setClientData(formState => ({
                    ...formState,
                    TreatmentAdherenceUpdates: !formState.TreatmentAdherenceUpdates,
                    TreatmentAdherenceUpdatesDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    TreatmentAdherenceUpdates: !formState.TreatmentAdherenceUpdates,
                    TreatmentAdherenceUpdatesDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.TreatmentAdherenceUpdates ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.TreatmentAdherenceUpdates && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.TreatmentAdherenceUpdatesDate === "" || clientData.TreatmentAdherenceUpdatesDate === null ? (
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdates: !clientData.TreatmentAdherenceUpdates,
                        TreatmentAdherenceUpdatesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdates: !clientData.TreatmentAdherenceUpdates,
                        TreatmentAdherenceUpdatesDate: ""
                      })
                  }
                  }
                  checked={clientData.TreatmentAdherenceUpdates ? 'checked' : false}
                />
              </div>
              <div>
                <p>Treatment Adherence Updates</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="TreatmentAdherenceUpdates"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.TreatmentAdherenceUpdatesDate &&
                    clientData.TreatmentAdherenceUpdatesDate.split('T')[0]
                  }
                  disabled={clientData.TreatmentAdherenceUpdates ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      TreatmentAdherenceUpdatesDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.medical_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="TreatmentAdherenceUpdates"
                  className={`${MSAStyles.inputDate} {${(clientData.TreatmentAdherenceUpdates) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.TreatmentAdherenceUpdatesUploadDate &&
                  clientData.TreatmentAdherenceUpdatesUploadDate.split('T')[0]
                }
                disabled={clientData.TreatmentAdherenceUpdatesUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    TreatmentAdherenceUpdatesUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.TreatmentAdherenceUpdatesPDF? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.TreatmentAdherenceUpdatesPDF ?
                  setClientData(formState => ({
                    ...formState,
                    TreatmentAdherenceUpdatesPDF: !formState.TreatmentAdherenceUpdatesPDF,
                    TreatmentAdherenceUpdatesUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    TreatmentAdherenceUpdatesPDF: !formState.TreatmentAdherenceUpdatesPDF,
                    TreatmentAdherenceUpdatesUploadDate: crearFecha()
                  }))
                  if(!clientData.TreatmentAdherenceUpdatesPDF || clientData.TreatmentAdherenceUpdatesPDF){
                    setClientData(formState => ({
                      ...formState,
                      TreatmentAdherenceUpdatesUploadDate: crearFecha()
                    }))
                  }
                }
              } >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.TreatmentAdherenceUpdatesPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.TreatmentAdherenceUpdates && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.TreatmentAdherenceUpdatesDate === "" || clientData.TreatmentAdherenceUpdatesDate === null ? (
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdates: !clientData.TreatmentAdherenceUpdates,
                        TreatmentAdherenceUpdatesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdates: !clientData.TreatmentAdherenceUpdates,
                      })
                  }
                  }
                  checked={clientData.TreatmentAdherenceUpdatesPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.TreatmentAdherenceUpdatesScan? 'pointer-events-none' :""}`}

                onClick={() => {
                  clientData.TreatmentAdherenceUpdatesScan ?
                    setClientData(formState => ({
                      ...formState,
                      TreatmentAdherenceUpdatesScan: !formState.TreatmentAdherenceUpdatesScan,
                      TreatmentAdherenceUpdatesUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      TreatmentAdherenceUpdatesScan: !formState.TreatmentAdherenceUpdatesScan,
                      TreatmentAdherenceUpdatesUploadDate: crearFecha()
                    }))}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.TreatmentAdherenceUpdatesScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.TreatmentAdherenceUpdates && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.TreatmentAdherenceUpdatesUploadDate === "" || clientData.TreatmentAdherenceUpdatesUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdatesScan: !clientData.TreatmentAdherenceUpdatesScan,
                        TreatmentAdherenceUpdatesUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdatesScan: !clientData.TreatmentAdherenceUpdatesScan,
                      })
                  }
                  }
                  checked={clientData.TreatmentAdherenceUpdatesScan ? 'checked' : false}
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
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSDrugRegimen ? '' :'pointer-events-none'}`}
            >
              <div className="ml-1 text-center flex justify-center items-center ">
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSDrugRegimen ? 'pointer-events-none' :""}`}
                  onClick={() => {
                    clientData.AIRSDrugRegimen  ?
                      setClientData(formState => ({
                        ...formState,
                        AIRSDrugRegimen : !formState.AIRSDrugRegimen ,
                        AIRSDrugRegimenDate: ""
                      })) :
                      setClientData(formState => ({
                        ...formState,
                        AIRSDrugRegimen : !formState.AIRSDrugRegimen ,
                        AIRSDrugRegimenDate: crearFecha()
                      }))
                  }}
                  disabled={clientData.AIRSDrugRegimen  ? true : false}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    strokeWidth={clientData.AIRSDrugRegimen  ? "3" : "0"}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <input
                  className={`${!clientData.AIRSDrugRegimen  && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                    name=""
                    id=""
                    onChange={(e) => {
                      clientData.AIRSDrugRegimenDate === "" || clientData.AIRSDrugRegimenDate === null ? (
                        setClientData({
                          ...clientData,
                          AIRSDrugRegimen : !clientData.AIRSDrugRegimen ,
                          AIRSDrugRegimenDate: crearFecha()
                        })) : setClientData({
                          ...clientData,
                          AIRSDrugRegimen : !clientData.AIRSDrugRegimen ,
                          AIRSDrugRegimenDate: ""
                        })
                    }
                    }
                    checked={clientData.AIRSDrugRegimen  ? 'checked' : false}
                    disabled={clientData.AIRSDrugRegimen  ? true : false}
                   
                  />
                </div>
                {/*  */}
              </div>
              <div>
                <p>AIRS Drug Regimen History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSDrugRegimenDate &&
                    clientData.AIRSDrugRegimenDate.split('T')[0]
                  }
                  disabled={clientData.AIRSDrugRegimenDate ? true : false}
                  onChange={(e) => {
                    setClientData(prevDate => ({
                      ...clientData,
                      AIRSDrugRegimenDate: prevDate.e.target.value,
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
                  className={`${MSAStyles.inputDate} {${(clientData.AIRSDrugRegimen ) ? "border-2 border-dark-blue rounded-md p-px" : ""}`}
                value={
                  clientData.AIRSDrugRegimenUploadDate &&
                  clientData.AIRSDrugRegimenUploadDate.split('T')[0]
                }
                disabled={clientData.AIRSDrugRegimenUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    AIRSDrugRegimenUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSDrugRegimenPDF ? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.AIRSDrugRegimenPDF ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSDrugRegimenPDF: !formState.AIRSDrugRegimenPDF,
                    AIRSDrugRegimenUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSDrugRegimenPDF: !formState.AIRSDrugRegimenPDF,
                    AIRSDrugRegimenUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSDrugRegimenScan || !clientData.AIRSDrugRegimenPDF){
                    setClientData(formState => ({
                      ...formState,
                      AIRSDrugRegimenUploadDate: crearFecha()
                    }))
                  }
                }
               }
               >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSDrugRegimenPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSDrugRegimenPDF && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSDrugRegimenUploadDate === "" || clientData.AIRSDrugRegimenUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSDrugRegimenPDF: !clientData.AIRSDrugRegimenPDF
                        ,
                        AIRSDrugRegimenUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSDrugRegimenPDF: !clientData.AIRSDrugRegimenPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSDrugRegimenPDF ? 'checked' : false}
                  disabled={clientData.AIRSDrugRegimenPDF ? true : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSDrugRegimenScan? 'pointer-events-none' :""}`}

                 onClick={() => {
                  clientData.AIRSDrugRegimenScan ?
                    setClientData(formState => ({
                      ...formState,
                      AIRSDrugRegimenScan: !formState.AIRSDrugRegimenScan,
                      AIRSDrugRegimenUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      AIRSDrugRegimenScan: !formState.AIRSDrugRegimenScan,
                      AIRSDrugRegimenUploadDate: crearFecha()
                    }))
                    if(!clientData.AIRSDrugRegimenScan || clientData.AIRSDrugRegimenScan){
                      setClientData(formState => ({
                        ...formState,
                        AIRSDrugRegimenUploadDate: crearFecha()
                      }))
                    }
                  }
                }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSDrugRegimenScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSDrugRegimen && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSDrugRegimenUploadDate === "" || clientData.AIRSDrugRegimenUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSDrugRegimenScan: !clientData.AIRSDrugRegimenScan,
                        AIRSDrugRegimenUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSDrugRegimenScan: !clientData.AIRSDrugRegimenScan,
                      })
                  }
                  }
                  checked={clientData.AIRSDrugRegimenScan ? 'checked' : false}
                />
              </div>
              {console.log("clientData.AIRSDrugRegimenScan",clientData.AIRSDrugRegimenScan)}
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
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSHIVMedicalProvider ? '' :'pointer-events-none'}`} >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHCVHistory? 'pointer-events-none' :""}`}
             onClick={() => {
              clientData.AIRSHIVMedicalProvider ?
                setClientData(formState => ({
                  ...formState,
                  AIRSHIVMedicalProvider: !formState.AIRSHIVMedicalProvider,
                  AIRSHIVMedicalProviderDate: ""
                })) :
                setClientData(formState => ({
                  ...formState,
                  AIRSHIVMedicalProvider: !formState.AIRSHIVMedicalProvider,
                  AIRSHIVMedicalProviderDate: crearFecha()
                }))
              }
            }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVMedicalProvider ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHIVMedicalProvider && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVMedicalProviderDate === "" || clientData.AIRSHIVMedicalProviderDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVMedicalProvider: !clientData.AIRSHIVMedicalProvider,
                        AIRSHIVMedicalProviderDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVMedicalProvider: !clientData.AIRSHIVMedicalProvider,
                      })
                  }
                  }
                  checked={clientData.AIRSHIVMedicalProvider ? 'checked' : false}
                />
              </div>
              <div>
                <p>AIRS HIV Medical Provider History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHIVMedicalProviderDate &&
                    clientData.AIRSHIVMedicalProviderDate.split('T')[0]
                  }
                  disabled={clientData.AIRSHIVMedicalProviderDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVMedicalProviderDate: e.target.value,
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
                  className={`${MSAStyles.inputDate} {${clientData.AIRSHIVMedicalProvider && "border-2 border-dark-blue rounded-md p-px"}`}
                  value={
                    clientData.AIRSHIVMedicalProviderUploadDate &&
                    clientData.AIRSHIVMedicalProviderUploadDate.split('T')[0]
                  }
                  disabled={clientData.AIRSHIVMedicalProviderUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVMedicalProviderUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVMedicalProviderPDF? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSHIVMedicalProviderPDF ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVMedicalProviderPDF: !formState.AIRSHIVMedicalProviderPDF,
                    AIRSHIVMedicalProviderUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVMedicalProviderPDF: !formState.AIRSHIVMedicalProviderPDF,
                    AIRSHIVMedicalProviderUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSHIVMedicalProviderScan || !clientData.AIRSHIVMedicalProviderPDF){
                    setClientData(formState => ({
                      ...formState,
                      AIRSHIVMedicalProviderUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVMedicalProviderPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHIVMedicalProvider && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVMedicalProviderUploadDate === "" || clientData.AIRSHIVMedicalProviderUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVMedicalProviderPDF: !clientData.AIRSHIVMedicalProviderPDF,
                        AIRSHIVMedicalProviderUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVMedicalProviderPDF: !clientData.AIRSHIVMedicalProviderPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSHIVMedicalProviderPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVMedicalProviderScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSHIVMedicalProviderScan ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVMedicalProviderScan: !formState.AIRSHIVMedicalProviderScan,
                    AIRSHIVMedicalProviderUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVMedicalProviderScan: !formState.AIRSHIVMedicalProviderScan,
                    AIRSHIVMedicalProviderUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSHIVMedicalProviderPDF || !clientData.AIRSHIVMedicalProviderScan){
                    setClientData(formState => ({
                      ...formState,
                      AIRSHIVMedicalProviderUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVMedicalProviderScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHIVMedicalProvider && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVMedicalProviderUploadDate === "" || clientData.AIRSHIVMedicalProviderUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVMedicalProviderScan: !clientData.AIRSHIVMedicalProviderScan,
                        AIRSHIVMedicalProviderUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVMedicalProviderScan: !clientData.AIRSHIVMedicalProviderScan,
                      })
                  }
                  }
                  checked={clientData.AIRSHIVMedicalProviderScan ? 'checked' : false}
                />
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${clientData.AIRSHIVStatusHistory ? '' :'pointer-events-none'}`} >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVStatusHistory? 'pointer-events-none' :""}`}
             onClick={() => {
              clientData.AIRSHIVStatusHistory ?
                setClientData(formState => ({
                  ...formState,
                  AIRSHIVStatusHistory: !formState.AIRSHIVStatusHistory,
                  AIRSHIVStatusHistoryDate: ""
                })) :
                setClientData(formState => ({
                  ...formState,
                  AIRSHIVStatusHistory: !formState.AIRSHIVStatusHistory,
                  AIRSHIVStatusHistoryDate: crearFecha()
                }))
              }
            }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVStatusHistory ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHIVStatusHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVStatusHistoryDate === "" || clientData.AIRSHIVStatusHistoryDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistory: !clientData.AIRSHIVStatusHistory,
                        AIRSHIVStatusHistoryDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVStatusHistory: !clientData.AIRSHIVStatusHistory,
                      })
                  }
                  }
                  checked={clientData.AIRSHIVStatusHistory ? 'checked' : false}
                />
              </div>
              <div>
                <p>AIRS HIV Status History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHIVStatusHistoryDate &&
                    clientData.AIRSHIVStatusHistoryDate.split('T')[0]
                  }
                  disabled={clientData.AIRSHIVStatusHistoryDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVStatusHistoryDate: e.target.value,
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
                  className={`${MSAStyles.inputDate} {${clientData.AIRSHIVStatusHistory && "border-2 border-dark-blue rounded-md p-px"}`}
                  value={
                    clientData.AIRSHIVStatusHistoryUploadDate &&
                    clientData.AIRSHIVStatusHistoryUploadDate.split('T')[0]
                  }
                  disabled={clientData.AIRSHIVStatusHistoryUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVStatusHistoryUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVStatusHistoryPDF? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSHIVStatusHistoryPDF ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVStatusHistoryPDF: !formState.AIRSHIVStatusHistoryPDF,
                    AIRSHIVStatusHistoryUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVStatusHistoryPDF: !formState.AIRSHIVStatusHistoryPDF,
                    AIRSHIVStatusHistoryUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSHIVStatusHistoryScan || !clientData.AIRSHIVStatusHistoryPDF){
                    setClientData(formState => ({
                      ...formState,
                      AIRSHIVStatusHistoryUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVStatusHistoryPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHIVStatusHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVStatusHistoryUploadDate === "" || clientData.AIRSHIVStatusHistoryUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryPDF: !clientData.AIRSHIVStatusHistoryPDF,
                        AIRSHIVStatusHistoryUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryPDF: !clientData.AIRSHIVStatusHistoryPDF,
                      })
                  }
                  }
                  checked={clientData.AIRSHIVStatusHistoryPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVStatusHistoryScan? 'pointer-events-none' :""}`}

              onClick={() => {
                clientData.AIRSHIVStatusHistoryScan ?
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVStatusHistoryScan: !formState.AIRSHIVStatusHistoryScan,
                    AIRSHIVStatusHistoryUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    AIRSHIVStatusHistoryScan: !formState.AIRSHIVStatusHistoryScan,
                    AIRSHIVStatusHistoryUploadDate: crearFecha()
                  }))
                  if(clientData.AIRSHIVStatusHistoryScan || !clientData.AIRSHIVStatusHistoryScan){
                    setClientData(formState => ({
                      ...formState,
                      AIRSHIVStatusHistoryUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVStatusHistoryScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.AIRSHIVStatusHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVStatusHistoryUploadDate === "" || clientData.AIRSHIVStatusHistoryUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryScan: !clientData.AIRSHIVStatusHistoryScan,
                        AIRSHIVStatusHistoryUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryScan: !clientData.AIRSHIVStatusHistoryScan,
                      })
                  }
                  }
                  checked={clientData.AIRSHIVStatusHistoryScan ? 'checked' : false}
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
              <a href={data[0]?.consent_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
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
               <a href={data[0]?.consents_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
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
              <a href={data[0]?.consents_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${clientData.NYCDOHMHNoticeOfPrivacyPractices? '' :'pointer-events-none'} `} >
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
              <a href={data[0]?.consents_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-pink grid gap-5 py-2 rounded-lg my-2 ${clientData.LinkageRetentionAdherenceForms? '' :'pointer-events-none'} `} >
            <div className={`ml-1 text-center flex justify-center items-center ${clientData.LinkageRetentionAdherenceForms? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.LinkageRetentionAdherenceForms ?
                  setClientData(formState => ({
                    ...formState,
                    LinkageRetentionAdherenceForms: !formState.LinkageRetentionAdherenceForms,
                    LinkageRetentionAdherenceFormsDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LinkageRetentionAdherenceForms: !formState.LinkageRetentionAdherenceForms,
                    LinkageRetentionAdherenceFormsDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LinkageRetentionAdherenceForms ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LinkageRetentionAdherenceForms && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LinkageRetentionAdherenceFormsDate === "" || clientData.LinkageRetentionAdherenceFormsDate === null ? (
                      setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceForms: !clientData.LinkageRetentionAdherenceForms,
                        LinkageRetentionAdherenceFormsDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceForms: !clientData.LinkageRetentionAdherenceForms,
                      })
                  }
                  }
                  checked={clientData.LinkageRetentionAdherenceForms ? 'checked' : false}
                />
              </div>
              <div>
                <p>Linkage, Retention, & Adherence Forms</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LinkageRetentionAdherenceForms"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LinkageRetentionAdherenceFormsDate &&
                    clientData.LinkageRetentionAdherenceFormsDate.split('T')[0]
                  }
                  disabled={clientData.LinkageRetentionAdherenceFormsDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LinkageRetentionAdherenceFormsDate: e.target.value,
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
                  id="LinkageRetentionAdherenceForms"
                  className={`${MSAStyles.inputDate} {${clientData.LinkageRetentionAdherenceForms && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.LinkageRetentionAdherenceFormsUploadDate &&
                  clientData.LinkageRetentionAdherenceFormsUploadDate.split('T')[0]
                }
                disabled={clientData.LinkageRetentionAdherenceFormsUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    LinkageRetentionAdherenceFormsUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LinkageRetentionAdherenceFormsPDF? 'pointer-events-none' :""}`}
             onClick={() => {
              clientData.LinkageRetentionAdherenceFormsPDF ?
                setClientData(formState => ({
                  ...formState,
                  LinkageRetentionAdherenceFormsPDF: !formState.LinkageRetentionAdherenceFormsPDF,
                  LinkageRetentionAdherenceFormsUploadDate: ""
                })) :
                setClientData(formState => ({
                  ...formState,
                  LinkageRetentionAdherenceFormsPDF: !formState.LinkageRetentionAdherenceFormsPDF,
                  LinkageRetentionAdherenceFormsUploadDate: crearFecha()
                }))
                if(clientData.LinkageRetentionAdherenceFormsScan || !clientData.LinkageRetentionAdherenceFormsPDF){
                  setClientData(formState => ({
                    ...formState,
                    LinkageRetentionAdherenceFormsUploadDate: crearFecha()
                  }))
                }
              }
            }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LinkageRetentionAdherenceFormsPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LinkageRetentionAdherenceForms && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LinkageRetentionAdherenceFormsUploadDate === "" || clientData.LinkageRetentionAdherenceFormsUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceFormsPDF: !clientData.LinkageRetentionAdherenceFormsPDF,
                        LinkageRetentionAdherenceFormsUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceFormsPDF: !clientData.LinkageRetentionAdherenceFormsPDF,
                      })
                  }
                  }
                  checked={clientData.LinkageRetentionAdherenceFormsPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LinkageRetentionAdherenceFormsScan? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.LinkageRetentionAdherenceFormsScan ?
                  setClientData(formState => ({
                    ...formState,
                    LinkageRetentionAdherenceFormsScan: !formState.LinkageRetentionAdherenceFormsScan,
                    LinkageRetentionAdherenceFormsUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    LinkageRetentionAdherenceFormsScan: !formState.LinkageRetentionAdherenceFormsScan,
                    LinkageRetentionAdherenceFormsUploadDate: crearFecha()
                  }))
                  if(clientData.LinkageRetentionAdherenceFormsPDF || !clientData.LinkageRetentionAdherenceFormsScan){
                    setClientData(formState => ({
                      ...formState,
                      LinkageRetentionAdherenceFormsUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LinkageRetentionAdherenceFormsScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.LinkageRetentionAdherenceForms && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LinkageRetentionAdherenceFormsUploadDate === "" || clientData.LinkageRetentionAdherenceFormsUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceFormsScan: !clientData.LinkageRetentionAdherenceFormsScan,
                        LinkageRetentionAdherenceFormsUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceFormsScan: !clientData.LinkageRetentionAdherenceFormsScan,
                      })
                  }
                  }
                  checked={clientData.LinkageRetentionAdherenceFormsScan ? 'checked' : false}
                />
              </div>
            </div>

            <div
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-pink grid gap-5 py-2 rounded-lg my-2 ${clientData.InternalReferralInformation? '' :'pointer-events-none'}`} >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.InternalReferralInformation? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.InternalReferralInformation ?
                  setClientData(formState => ({
                    ...formState,
                    InternalReferralInformation: !formState.InternalReferralInformation,
                    InternalReferralInformationDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    InternalReferralInformation: !formState.InternalReferralInformation,
                    InternalReferralInformationDate: crearFecha()
                  }))
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.InternalReferralInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.InternalReferralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InternalReferralInformationDate === "" || clientData.InternalReferralInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        InternalReferralInformation: !clientData.InternalReferralInformation,
                        InternalReferralInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        InternalReferralInformation: !clientData.InternalReferralInformation,
                      })
                  }
                  }
                  checked={clientData.InternalReferralInformation ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE Referral Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="InternalReferralInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.InternalReferralInformationDate &&
                    clientData.InternalReferralInformationDate.split('T')[0]
                  }
                  disabled={clientData.InternalReferralInformationDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      InternalReferralInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.linkage_navigation_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="InternalReferralInformation"
                  className={`${MSAStyles.inputDate} {${clientData.InternalReferralInformation && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.InternalReferralInformationUploadDate &&
                  clientData.InternalReferralInformationUploadDate.split('T')[0]
                }
                disabled={clientData.InternalReferralInformationUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    InternalReferralInformationUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.InternalReferralInformationPDF? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.InternalReferralInformationPDF ?
                  setClientData(formState => ({
                    ...formState,
                    InternalReferralInformationPDF: !formState.InternalReferralInformationPDF,
                    InternalReferralInformationUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    InternalReferralInformationPDF: !formState.InternalReferralInformationPDF,
                    InternalReferralInformationUploadDate: crearFecha()
                  }))
                  if(clientData.InternalReferralInformationScan || !clientData.InternalReferralInformationPDF){
                    setClientData(formState => ({
                      ...formState,
                      InternalReferralInformationUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.InternalReferralInformationPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.InternalReferralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InternalReferralInformationUploadDate === "" || clientData.InternalReferralInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        InternalReferralInformationPDF: !clientData.InternalReferralInformationPDF,
                        InternalReferralInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        InternalReferralInformationPDF: !clientData.InternalReferralInformationPDF,
                      })
                  }
                  }
                  checked={clientData.InternalReferralInformationPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.InternalReferralInformationScan? 'pointer-events-none' :""}`}
              onClick={() => {
                clientData.InternalReferralInformationScan ?
                  setClientData(formState => ({
                    ...formState,
                    InternalReferralInformationScan: !formState.InternalReferralInformationScan,
                    InternalReferralInformationUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    InternalReferralInformationScan: !formState.InternalReferralInformationScan,
                    InternalReferralInformationUploadDate: crearFecha()
                  }))
                  if(!clientData.InternalReferralInformationScan || !clientData.InternalReferralInformationPDF){
                    setClientData(formState => ({
                      ...formState,
                      InternalReferralInformationUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.InternalReferralInformationScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.InternalReferralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InternalReferralInformationUploadDate === "" || clientData.InternalReferralInformationUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        InternalReferralInformationScan: !clientData.InternalReferralInformationScan,
                        InternalReferralInformationUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        InternalReferralInformationScan: !clientData.InternalReferralInformationScan,
                      })
                  }
                  }
                  checked={clientData.InternalReferralInformationScan ? 'checked' : false}
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
                <p>Identification</p>
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
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
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
            className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${clientData.HNSEligibilityForm? '' :'pointer-events-none'}`} >
            <div className={`ml-1 text-center flex justify-center items-center ${clientData.HNSEligibilityForm? 'pointer-events-none' :""}`}
                 onClick={() => {
                clientData.HNSEligibilityForm ?
                  setClientData(formState => ({
                    ...formState,
                    HNSEligibilityForm: !formState.HNSEligibilityForm,
                    HNSEligibilityFormDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    HNSEligibilityForm: !formState.HNSEligibilityForm,
                    HNSEligibilityFormDate: crearFecha()
                  }))
                }
               }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.HNSEligibilityForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.HNSEligibilityForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HNSEligibilityFormDate === "" || clientData.HNSEligibilityFormDate === null ? (
                      setClientData({
                        ...clientData,
                        HNSEligibilityForm: !clientData.HNSEligibilityForm,
                        HNSEligibilityFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        HNSEligibilityForm: !clientData.HNSEligibilityForm,
                      })
                  }
                  }
                  checked={clientData.HNSEligibilityForm ? 'checked' : false}
                />
              </div>
              <div>
                <p>LNE HNS Eligibility Form </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSEligibilityForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.HNSEligibilityFormDate &&
                    clientData.HNSEligibilityFormDate.split('T')[0]
                  }
                  disabled={clientData.HNSEligibilityFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HNSEligibilityFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
              <a href={data[0]?.intake_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSEligibilityForm"
                  className={`${MSAStyles.inputDate} {${clientData.HNSEligibilityForm && "border-2 border-dark-blue rounded-md p-px"}`}
                value={
                  clientData.HNSEligibilityFormUploadDate &&
                  clientData.HNSEligibilityFormUploadDate.split('T')[0]
                }
                disabled={clientData.HNSEligibilityFormUploadDate ? true : false}
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    HNSEligibilityFormUploadDate: e.target.value,
                  });
                }}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.HNSEligibilityFormPDF? 'pointer-events-none' :""}`}
               onClick={() => {
                clientData.HNSEligibilityFormPDF ?
                  setClientData(formState => ({
                    ...formState,
                    HNSEligibilityFormPDF: !formState.HNSEligibilityFormPDF,
                    HNSEligibilityFormUploadDate: ""
                  })) :
                  setClientData(formState => ({
                    ...formState,
                    HNSEligibilityFormPDF: !formState.HNSEligibilityFormPDF,
                    HNSEligibilityFormUploadDate: crearFecha()
                  }))
                  if(!clientData.HNSEligibilityFormPDF || clientData.HNSEligibilityFormScan){
                    setClientData(formState => ({
                      ...formState,
                      HNSEligibilityFormUploadDate: crearFecha()
                    }))
                  }
                }
              }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.HNSEligibilityFormPDF ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.HNSEligibilityForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HNSEligibilityFormUploadDate === "" || clientData.HNSEligibilityFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        HNSEligibilityFormPDF: !clientData.HNSEligibilityFormPDF,
                        HNSEligibilityFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        HNSEligibilityFormPDF: !clientData.HNSEligibilityFormPDF,
                      })
                  }
                  }
                  checked={clientData.HNSEligibilityFormPDF ? 'checked' : false}
                />
              </div>
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.HNSEligibilityFormScan? 'pointer-events-none' :""}`}
                onClick={() => {
                  clientData.HNSEligibilityFormScan ?
                    setClientData(formState => ({
                      ...formState,
                      HNSEligibilityFormScan: !formState.HNSEligibilityFormScan,
                      HNSEligibilityFormUploadDate: ""
                    })) :
                    setClientData(formState => ({
                      ...formState,
                      HNSEligibilityFormScan: !formState.HNSEligibilityFormScan,
                      HNSEligibilityFormUploadDate: crearFecha()
                    }))
                    if(!clientData.HNSEligibilityFormScan || clientData.HNSEligibilityFormPDF){
                      setClientData(formState => ({
                        ...formState,
                        HNSEligibilityFormUploadDate: crearFecha()
                      }))
                    }
                  }
                }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.HNSEligibilityFormScan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <input
                  className={`${!clientData.HNSEligibilityForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HNSEligibilityFormUploadDate === "" || clientData.HNSEligibilityFormUploadDate === null ? (
                      setClientData({
                        ...clientData,
                        HNSEligibilityFormScan: !clientData.HNSEligibilityFormScan,
                        HNSEligibilityFormUploadDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        HNSEligibilityFormScan: !clientData.HNSEligibilityFormScan,
                      })
                  }
                  }
                  checked={clientData.HNSEligibilityFormScan ? 'checked' : false}
                />
              </div>
            </div>
            <div
className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${clientData.HNSReadinessForm? '' :'pointer-events-none'}`} >
<div className={`ml-1 text-center flex justify-center items-center ${clientData.HNSReadinessForm? 'pointer-events-none' :""}`}
     onClick={() => {
    clientData.HNSReadinessForm ?
      setClientData(formState => ({
        ...formState,
        HNSReadinessForm: !formState.HNSReadinessForm,
        HNSReadinessFormDate: ""
      })) :
      setClientData(formState => ({
        ...formState,
        HNSReadinessForm: !formState.HNSReadinessForm,
        HNSReadinessFormDate: crearFecha()
      }))
    }
   }>
    <svg xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={clientData.HNSReadinessForm ? "3" : "0"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <input
      className={`${!clientData.HNSReadinessForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
      type="checkbox"
      name=""
      id=""
      onChange={(e) => {
        clientData.HNSReadinessFormDate === "" || clientData.HNSReadinessFormDate === null ? (
          setClientData({
            ...clientData,
            HNSReadinessForm: !clientData.HNSReadinessForm,
            HNSReadinessFormDate: crearFecha()
          })) : setClientData({
            ...clientData,
            HNSReadinessForm: !clientData.HNSReadinessForm,
          })
      }
      }
      checked={clientData.HNSReadinessForm ? 'checked' : false}
    />
  </div>
  <div>
    <p>HNS Readiness Assessment </p>
  </div>
  <div className="text-center">
    <input
      type="date"
      id="HNSReadinessForm"
      className={MSAStyles.inputDate}
      value={
        clientData.HNSReadinessFormDate &&
        clientData.HNSReadinessFormDate.split('T')[0]
      }
      disabled={clientData.HNSReadinessFormDate ? true : false}
      onChange={(e) => {
        setClientData({
          ...clientData,
          HNSReadinessFormDate: e.target.value,
        });
      }}
    />
  </div>
  <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
  <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
  <img src={'/dropbox-folder.png'} alt="" width="34"/>
    </a>
    {/* <p className="text-dark-blue underline">Medical</p> */}
  </div>
  <div className="text-center">
    <input
      type="date"
      id="HNSReadinessForm"
      className={`${MSAStyles.inputDate} {${clientData.HNSReadinessForm && "border-2 border-dark-blue rounded-md p-px"}`}
    value={
      clientData.HNSReadinessFormUploadDate &&
      clientData.HNSReadinessFormUploadDate.split('T')[0]
    }
    disabled={clientData.HNSReadinessFormUploadDate ? true : false}
    onChange={(e) => {
      setClientData({
        ...clientData,
        HNSReadinessFormUploadDate: e.target.value,
      });
    }}
    />
  </div>
  <div className={`ml-1 text-center flex justify-center items-center ${clientData.HNSReadinessFormPDF? 'pointer-events-none' :""}`}
   onClick={() => {
    clientData.HNSReadinessFormPDF ?
      setClientData(formState => ({
        ...formState,
        HNSReadinessFormPDF: !formState.HNSReadinessFormPDF,
        HNSReadinessFormUploadDate: ""
      })) :
      setClientData(formState => ({
        ...formState,
        HNSReadinessFormPDF: !formState.HNSReadinessFormPDF,
        HNSReadinessFormUploadDate: crearFecha()
      }))
      if(!clientData.HNSReadinessFormPDF || clientData.HNSReadinessFormScan){
        setClientData(formState => ({
          ...formState,
          HNSReadinessFormUploadDate: crearFecha()
        }))
      }
    }
  }>
    <svg xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={clientData.HNSReadinessFormPDF ? "3" : "0"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <input
      className={`${!clientData.HNSReadinessForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
      type="checkbox"
      name=""
      id=""
      onChange={(e) => {
        clientData.HNSReadinessFormUploadDate === "" || clientData.HNSReadinessFormUploadDate === null ? (
          setClientData({
            ...clientData,
            HNSReadinessFormPDF: !clientData.HNSReadinessFormPDF,
            HNSReadinessFormUploadDate: crearFecha()
          })) : setClientData({
            ...clientData,
            HNSReadinessFormPDF: !clientData.HNSReadinessFormPDF,
          })
      }
      }
      checked={clientData.HNSReadinessFormPDF ? 'checked' : false}
    />
  </div>
  <div className={`ml-1 text-center flex justify-center items-center ${clientData.HNSReadinessFormScan? 'pointer-events-none' :""}`}
    onClick={() => {
      clientData.HNSReadinessFormScan ?
        setClientData(formState => ({
          ...formState,
          HNSReadinessFormScan: !formState.HNSReadinessFormScan,
          HNSReadinessFormUploadDate: ""
        })) :
        setClientData(formState => ({
          ...formState,
          HNSReadinessFormScan: !formState.HNSReadinessFormScan,
          HNSReadinessFormUploadDate: crearFecha()
        }))
        if(!clientData.HNSReadinessFormScan || clientData.HNSReadinessFormPDF){
          setClientData(formState => ({
            ...formState,
            HNSReadinessFormUploadDate: crearFecha()
          }))
        }
      }
    }>
    <svg xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={clientData.HNSReadinessFormScan ? "3" : "0"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <input
      className={`${!clientData.HNSReadinessForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
      type="checkbox"
      name=""
      id=""
      onChange={(e) => {
        clientData.HNSReadinessFormUploadDate === "" || clientData.HNSReadinessFormUploadDate === null ? (
          setClientData({
            ...clientData,
            HNSReadinessFormScan: !clientData.HNSReadinessFormScan,
            HNSReadinessFormUploadDate: crearFecha()
          })) : setClientData({
            ...clientData,
            HNSReadinessFormScan: !clientData.HNSReadinessFormScan,
          })
      }
      }
      checked={clientData.HNSReadinessFormScan ? 'checked' : false}
    />
  </div>
</div>
<div
className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${clientData.SupportGroups? '' :'pointer-events-none'}`} >
<div className={`ml-1 text-center flex justify-center items-center ${clientData.SupportGroups? 'pointer-events-none' :""}`}
     onClick={() => {
    clientData.SupportGroups ?
      setClientData(formState => ({
        ...formState,
        SupportGroups: !formState.SupportGroups,
        SupportGroupsDate: ""
      })) :
      setClientData(formState => ({
        ...formState,
        SupportGroups: !formState.SupportGroups,
        SupportGroupsDate: crearFecha()
      }))
    }
   }>
    <svg xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={clientData.SupportGroups ? "3" : "0"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <input
      className={`${!clientData.SupportGroups && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
      type="checkbox"
      name=""
      id=""
      onChange={(e) => {
        clientData.SupportGroupsDate === "" || clientData.SupportGroupsDate === null ? (
          setClientData({
            ...clientData,
            SupportGroups: !clientData.SupportGroups,
            SupportGroupsDate: crearFecha()
          })) : setClientData({
            ...clientData,
            SupportGroups: !clientData.SupportGroups,
          })
      }
      }
      checked={clientData.SupportGroups ? 'checked' : false}
    />
  </div>
  <div>
    <p>Support Groups </p>
  </div>
  <div className="text-center">
    <input
      type="date"
      id="SupportGroups"
      className={MSAStyles.inputDate}
      value={
        clientData.SupportGroupsDate &&
        clientData.SupportGroupsDate.split('T')[0]
      }
      disabled={clientData.SupportGroupsDate ? true : false}
      onChange={(e) => {
        setClientData({
          ...clientData,
          SupportGroupsDate: e.target.value,
        });
      }}
    />
  </div>
  <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
  <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
  <img src={'/dropbox-folder.png'} alt="" width="34"/>
    </a>
    {/* <p className="text-dark-blue underline">Medical</p> */}
  </div>
  <div className="text-center">
    <input
      type="date"
      id="SupportGroups"
      className={`${MSAStyles.inputDate} {${clientData.SupportGroups && "border-2 border-dark-blue rounded-md p-px"}`}
    value={
      clientData.SupportGroupsUploadDate &&
      clientData.SupportGroupsUploadDate.split('T')[0]
    }
    disabled={clientData.SupportGroupsUploadDate ? true : false}
    onChange={(e) => {
      setClientData({
        ...clientData,
        SupportGroupsUploadDate: e.target.value,
      });
    }}
    />
  </div>
  <div className={`ml-1 text-center flex justify-center items-center ${clientData.SupportGroupsPDF? 'pointer-events-none' :""}`}
   onClick={() => {
    clientData.SupportGroupsPDF ?
      setClientData(formState => ({
        ...formState,
        SupportGroupsPDF: !formState.SupportGroupsPDF,
        SupportGroupsUploadDate: ""
      })) :
      setClientData(formState => ({
        ...formState,
        SupportGroupsPDF: !formState.SupportGroupsPDF,
        SupportGroupsUploadDate: crearFecha()
      }))
      if(!clientData.SupportGroupsPDF || clientData.SupportGroupsScan){
        setClientData(formState => ({
          ...formState,
          SupportGroupsUploadDate: crearFecha()
        }))
      }
    }
  }>
    <svg xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={clientData.SupportGroupsPDF ? "3" : "0"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <input
      className={`${!clientData.SupportGroups && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
      type="checkbox"
      name=""
      id=""
      onChange={(e) => {
        clientData.SupportGroupsUploadDate === "" || clientData.SupportGroupsUploadDate === null ? (
          setClientData({
            ...clientData,
            SupportGroupsPDF: !clientData.SupportGroupsPDF,
            SupportGroupsUploadDate: crearFecha()
          })) : setClientData({
            ...clientData,
            SupportGroupsPDF: !clientData.SupportGroupsPDF,
          })
      }
      }
      checked={clientData.SupportGroupsPDF ? 'checked' : false}
    />
  </div>
  <div className={`ml-1 text-center flex justify-center items-center ${clientData.SupportGroupsScan? 'pointer-events-none' :""}`}
    onClick={() => {
      clientData.SupportGroupsScan ?
        setClientData(formState => ({
          ...formState,
          SupportGroupsScan: !formState.SupportGroupsScan,
          SupportGroupsUploadDate: ""
        })) :
        setClientData(formState => ({
          ...formState,
          SupportGroupsScan: !formState.SupportGroupsScan,
          SupportGroupsUploadDate: crearFecha()
        }))
        if(!clientData.SupportGroupsScan || clientData.SupportGroupsPDF){
          setClientData(formState => ({
            ...formState,
            SupportGroupsUploadDate: crearFecha()
          }))
        }
      }
    }>
    <svg xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={clientData.SupportGroupsScan ? "3" : "0"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <input
      className={`${!clientData.SupportGroups && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
      type="checkbox"
      name=""
      id=""
      onChange={(e) => {
        clientData.SupportGroupsUploadDate === "" || clientData.SupportGroupsUploadDate === null ? (
          setClientData({
            ...clientData,
            SupportGroupsScan: !clientData.SupportGroupsScan,
            SupportGroupsUploadDate: crearFecha()
          })) : setClientData({
            ...clientData,
            SupportGroupsScan: !clientData.SupportGroupsScan,
          })
      }
      }
      checked={clientData.SupportGroupsScan ? 'checked' : false}
    />
  </div>
</div>
            
<div
className={`${MSAStyles.formRowsContainerDesFormEdit} justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${clientData.IDGForm? '' :'pointer-events-none'}`} >
<div className={`ml-1 text-center flex justify-center items-center ${clientData.IDGForm? 'pointer-events-none' :""}`}
     onClick={() => {
    clientData.IDGForm ?
      setClientData(formState => ({
        ...formState,
        IDGForm: !formState.IDGForm,
        IDGFormDate: ""
      })) :
      setClientData(formState => ({
        ...formState,
        IDGForm: !formState.IDGForm,
        IDGFormDate: crearFecha()
      }))
    }
   }>
    <svg xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={clientData.IDGForm ? "3" : "0"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <input
      className={`${!clientData.IDGForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
      type="checkbox"
      name=""
      id=""
      onChange={(e) => {
        clientData.IDGFormDate === "" || clientData.IDGFormDate === null ? (
          setClientData({
            ...clientData,
            IDGForm: !clientData.IDGForm,
            IDGFormDate: crearFecha()
          })) : setClientData({
            ...clientData,
            IDGForm: !clientData.IDGForm,
          })
      }
      }
      checked={clientData.IDGForm ? 'checked' : false}
    />
  </div>
  <div>
    <p>IDG</p>
  </div>
  <div className="text-center">
    <input
      type="date"
      id="IDGForm"
      className={MSAStyles.inputDate}
      value={
        clientData.IDGFormDate &&
        clientData.IDGFormDate.split('T')[0]
      }
      disabled={clientData.IDGFormDate ? true : false}
      onChange={(e) => {
        setClientData({
          ...clientData,
          IDGFormDate: e.target.value,
        });
      }}
    />
  </div>
  <div className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}>
  <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
  <img src={'/dropbox-folder.png'} alt="" width="34"/>
    </a>
    {/* <p className="text-dark-blue underline">Medical</p> */}
  </div>
  <div className="text-center">
    <input
      type="date"
      id="IDGForm"
      className={`${MSAStyles.inputDate} {${clientData.IDGForm && "border-2 border-dark-blue rounded-md p-px"}`}
    value={
      clientData.IDGFormUploadDate &&
      clientData.IDGFormUploadDate.split('T')[0]
    }
    disabled={clientData.IDGFormUploadDate ? true : false}
    onChange={(e) => {
      setClientData({
        ...clientData,
        IDGFormUploadDate: e.target.value,
      });
    }}
    />
  </div>
  <div className={`ml-1 text-center flex justify-center items-center ${clientData.IDGFormPDF? 'pointer-events-none' :""}`}
   onClick={() => {
    clientData.IDGFormPDF ?
      setClientData(formState => ({
        ...formState,
        IDGFormPDF: !formState.IDGFormPDF,
        IDGFormUploadDate: ""
      })) :
      setClientData(formState => ({
        ...formState,
        IDGFormPDF: !formState.IDGFormPDF,
        IDGFormUploadDate: crearFecha()
      }))
      if(!clientData.IDGFormPDF || clientData.IDGFormScan){
        setClientData(formState => ({
          ...formState,
          IDGFormUploadDate: crearFecha()
        }))
      }
    }
  }>
    <svg xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={clientData.IDGFormPDF ? "3" : "0"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <input
      className={`${!clientData.IDGForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
      type="checkbox"
      name=""
      id=""
      onChange={(e) => {
        clientData.IDGFormUploadDate === "" || clientData.IDGFormUploadDate === null ? (
          setClientData({
            ...clientData,
            IDGFormPDF: !clientData.IDGFormPDF,
            IDGFormUploadDate: crearFecha()
          })) : setClientData({
            ...clientData,
            IDGFormPDF: !clientData.IDGFormPDF,
          })
      }
      }
      checked={clientData.IDGFormPDF ? 'checked' : false}
    />
  </div>
  <div className={`ml-1 text-center flex justify-center items-center ${clientData.IDGFormScan? 'pointer-events-none' :""}`}
    onClick={() => {
      clientData.IDGFormScan ?
        setClientData(formState => ({
          ...formState,
          IDGFormScan: !formState.IDGFormScan,
          IDGFormUploadDate: ""
        })) :
        setClientData(formState => ({
          ...formState,
          IDGFormScan: !formState.IDGFormScan,
          IDGFormUploadDate: crearFecha()
        }))
        if(!clientData.IDGFormScan || clientData.IDGFormPDF){
          setClientData(formState => ({
            ...formState,
            IDGFormUploadDate: crearFecha()
          }))
        }
      }
    }>
    <svg xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={clientData.IDGFormScan ? "3" : "0"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <input
      className={`${!clientData.IDGForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
      type="checkbox"
      name=""
      id=""
      onChange={(e) => {
        clientData.IDGFormUploadDate === "" || clientData.IDGFormUploadDate === null ? (
          setClientData({
            ...clientData,
            IDGFormScan: !clientData.IDGFormScan,
            IDGFormUploadDate: crearFecha()
          })) : setClientData({
            ...clientData,
            IDGFormScan: !clientData.IDGFormScan,
          })
      }
      }
      checked={clientData.IDGFormScan ? 'checked' : false}
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