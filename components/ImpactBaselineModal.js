import React, {useState} from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'


export function getDate () {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const result = `${month}/${day}/${year}`
    return result
}

const ImpactBaselineModal = ({setShowImpactBaselineModal, showImpactBaselineModal, clientId}) => {
    const router = useRouter()    

    const date = getDate()

    const [impactBaseline, setImpactBaseline] = useState({
        impactFormStartDate: "",
        barrierHIVPrimaryCare: false,
        barrierAccessingMedications: false,
        medicationAdherence: false,
        CD4ViralLoad: false,
        lastHIVTest: false,
        PrEP: false,
        unsafeSexualBehavior: false,
        substanceAbuse: false,
        riskOfOverdose: false,
        legalIssues: false,
        unstableEmployment: false,
        mentalHealthIssues: false,
        unstableHousing: false,
        foodInsecurity: false,
    })

    const onValueChange=(event)=>{
        console.log(event.target.value)
        if(event.target.value == 'true') {
            setImpactBaseline({
                ...impactBaseline,
                [event.target.name] : true
            })
        } 
        if (event.target.value == 'false') {
            setImpactBaseline({
                ...impactBaseline,
                [event.target.name] : false
            })
        }
    }
    const notifyMessage = () => {
        toast.success("Impact Baseline was created!", {
          position: toast.POSITION.TOP_CENTER,
        });
      };

    const createImpactBaselineForm=()=>{
         notifyMessage()
         setShowImpactBaselineModal(!showImpactBaselineModal)
         setTimeout(()=>{
        router.push(`/clients/${clientId}/profile`)
    },2300)
     }
    // const createImpactBaselineForm = ()=>{           
    //     axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/impact_tracker_baseline`, {
    //       impactBaseline
    //     })
    //     .then(function (response) {
    //       if(response.status===200 || response.statusText==='Ok'){
    //         notifyMessage()
    //         setShowImpactBaselineModal(!showImpactBaselineModal)

    //         setTimeout(()=>{
    //           router.push(`/clients/${clientId}/profile`)
    //         },2300)
    //       } 
    //     })
    //     .catch(function (error) {
    //           console.log(error)
    //     });
    //   }
    return (
        <>
        
            <div className="modal">
            <div className="grid grid-cols-1 justify-items-center pb-4 mt-8 md:max-w-md lg:max-w-lg mx-auto border border-blue-500 bg-white mb-8 rounded">
                <div className="grid grid-cols-1 gap-2">
                    <header id="banner-info-top shadow-xl ">
                        <div className='flex shadow-md justify-between rounded-lg p-4 m-5 items-center text-blue-500'>
                            <svg width="40" height="40" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7L12 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 17.01L12.01 16.9989" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <p className='w-4/5 text-blue-500 font-semibold'>
                                Please complete the following summary to describe the health and wellbeing of your new client.
                            </p>
                        </div>
                    </header> 
                    <div className='flex justify-between items-center font-bold mx-6 mb-5'>
                            <p className='text-xs'>Did the client mention any of the following:</p>
                            <div className='flex text-blue-500'>
                                <h5 className='mr-3'>Date</h5>
                                <p>{date}</p>
                            </div>
                    </div>   
                    <section className="">
                        <form className='w-full grid grid-cols-1 gap-3 mb-5'>
                             
                        <div id="medical-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.9 18H10.1C9.76863 18 9.5 17.7314 9.5 17.4V15.1C9.5 14.7686 9.23137 14.5 8.9 14.5H6.6C6.26863 14.5 6 14.2314 6 13.9V10.1C6 9.76863 6.26863 9.5 6.6 9.5H8.9C9.23137 9.5 9.5 9.23137 9.5 8.9V6.6C9.5 6.26863 9.76863 6 10.1 6H13.9C14.2314 6 14.5 6.26863 14.5 6.6V8.9C14.5 9.23137 14.7686 9.5 15.1 9.5H17.4C17.7314 9.5 18 9.76863 18 10.1V13.9C18 14.2314 17.7314 14.5 17.4 14.5H15.1C14.7686 14.5 14.5 14.7686 14.5 15.1V17.4C14.5 17.7314 14.2314 18 13.9 18Z" fill="#ffffff" stroke="#2278C9" strokeWidth="1.5"/>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"  stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Medical</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Barriers to accessing HIV primary care</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="barrierHIVPrimaryCare" value={true}/>
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                            <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="barrierHIVPrimaryCare" value={false}/>
                                                <label>No</label>
                                            </span>
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Barriers to accessing medications</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="barrierAccessingMedications" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="barrierAccessingMedications" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>   
                                    </div>  
                                    
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Difficulty to adhering to medications
                                            or <br/>treatment plan
                                        </p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="medicationAdherence" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="medicationAdherence" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>     
                                    </div>  
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Detectable viral load</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="CD4ViralLoad" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="CD4ViralLoad" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>     
                                    </div>  
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>More than 6 months since last HIV test</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="lastHIVTest" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="lastHIVTest" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>      
                                    </div>  
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Not knowing about PrEP or how to access it</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="PrEP" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="PrEP" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>      
                                    </div>      
                                </div>
                            </div>

                            
                            <div id="risky-behaviors-substance-use-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="#62A6E5" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.0429 21H3.95705C2.41902 21 1.45658 19.3364 2.22324 18.0031L10.2662 4.01533C11.0352 2.67792 12.9648 2.67791 13.7338 4.01532L21.7768 18.0031C22.5434 19.3364 21.581 21 20.0429 21Z" stroke="#62A6E5" strokeLinecap="round"/>
                                <path d="M12 9V13" stroke="#ffffff" strokeLinecap="round"/>
                                <path d="M12 17.01L12.01 16.9989" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                    <h5 className='font-bold pl-1'>Risky Behaviors and Substance Use</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Engaging in unsafe sexual behavior</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="unsafeSexualBehavior" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="unsafeSexualBehavior" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>      
                                    </div>
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Problems with substance use</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="substanceAbuse" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="substanceAbuse" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>      
                                    </div>    
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Fear of overdosing</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="riskOfOverdose" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="riskOfOverdose" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>      
                                    </div>        
                                </div>
                            </div>


                            <div id="legal-financial-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9.5L12 4L21 9.5" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5 20H19" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 9L14 9" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 17L6 12" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 17L10 12" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 17L14 12" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18 17L18 12" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Legal and Financial</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Legal issues</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="legalIssues" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="legalIssues" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>      
                                    </div> 
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Unstable employment or unemployed</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="unstableEmployment" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="unstableEmployment" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>      
                                    </div>    
                                </div>
                            </div>

                            <div id="mental-health-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 20L21.8243 16.1757C21.9368 16.0632 22 15.9106 22 15.7515V10.5C22 9.67157 21.3284 9 20.5 9V9C19.6716 9 19 9.67157 19 10.5V15" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18 16L18.8581 15.1419C18.949 15.051 19 14.9278 19 14.7994V14.7994C19 14.6159 18.8963 14.4482 18.7322 14.3661L18.2893 14.1447C17.5194 13.7597 16.5894 13.9106 15.9807 14.5193L15.0858 15.4142C14.7107 15.7893 14.5 16.298 14.5 16.8284V20" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 20L2.17574 16.1757C2.06321 16.0632 2 15.9106 2 15.7515V10.5C2 9.67157 2.67157 9 3.5 9V9C4.32843 9 5 9.67157 5 10.5V15" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 16L5.14187 15.1419C5.05103 15.051 5 14.9278 5 14.7994V14.7994C5 14.6159 5.10366 14.4482 5.26776 14.3661L5.71067 14.1447C6.48064 13.7597 7.41059 13.9106 8.01931 14.5193L8.91421 15.4142C9.28929 15.7893 9.5 16.298 9.5 16.8284V20" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.6667 12H10.3333V9.66667H8V6.33333H10.3333V4H13.6667V6.33333H16V9.66667H13.6667V12Z" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Mental Health</h5>
                                </div>
                                <div className='w-full bg-light-blue grid grid-cols-1'>
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Mental health issues</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="mentalHealthIssues" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="mentalHealthIssues" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>     
                                    </div>    
                                </div>
                            </div>

                            <div id="housing-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.4 17H11.6C11.2686 17 11 16.7314 11 16.4V14.6C11 14.2686 11.2686 14 11.6 14H12.4C12.7314 14 13 14.2686 13 14.6V16.4C13 16.7314 12.7314 17 12.4 17Z" fill="#2278C9" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 9.5L12 4L21 9.5" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Housing</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>An unstable housing situation</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="unstableHousing" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="unstableHousing" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>      
                                    </div>    
                                </div>
                            </div>

                             <div id="food-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1471 21.2646L12 21.2351L11.8529 21.2646C9.47627 21.7399 7.23257 21.4756 5.59352 20.1643C3.96312 18.86 2.75 16.374 2.75 12C2.75 7.52684 3.75792 5.70955 5.08541 5.04581C5.77977 4.69863 6.67771 4.59759 7.82028 4.72943C8.96149 4.86111 10.2783 5.21669 11.7628 5.71153L12.0235 5.79841L12.2785 5.69638C14.7602 4.70367 16.9909 4.3234 18.5578 5.05463C20.0271 5.7403 21.25 7.59326 21.25 12C21.25 16.374 20.0369 18.86 18.4065 20.1643C16.7674 21.4756 14.5237 21.7399 12.1471 21.2646Z" stroke="#2278C9" strokeWidth="1.5"/>
                                    <path d="M12 5.5C12 3 11 2 9 2" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 6V21" stroke="#2278C9" strokeWidth="1.5"/>
                                    <path d="M15 12L15 14" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Food</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                    <div className="flex bg-light-blue justify-between py-1 pl-12 pr-5">
                                        <p className='font-bold text-xs'>Food insecurity</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mx-2 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="foodInsecurity" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-1 md:mx-3 lg:mx-4'>
                                                <input className="mr-1 md:mr-3" type="radio" 
                                                onChange={onValueChange} name="foodInsecurity" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>      
                                    </div>    
                                </div>
                            </div>

                           
                        </form>
                    </section>
                     
                </div>
                
                <button 
                    onClick={createImpactBaselineForm}
                    className='bg-dark-blue text-white rounded-sm flex items-center px-7 py-1 text-sm'>
                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12.5L10 15.5L17 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
        
                    Save</button>

            </div>
        </div>   
         
        </>
    );
};

export default ImpactBaselineModal;