import React, { Component } from "react";


export const ComponentToPrint = React.forwardRef((props, ref) => {
  const {
    planStartDate,
    clientId,
    clientFirstName,
    clientLastName,
    userFirstName,
    userLastName,
    goal1ServiceCategory,
    goal1Summary,
    goal1Details,
    goal1TargetDate,
    goal1ActionStep1,
    goal1ActionStep2,
    goal1ActionStep3,
    goal2ServiceCategory,
    goal2Summary,
    goal2Details,
    goal2TargetDate,
    goal2ActionStep1,
    goal2ActionStep2,
    goal2ActionStep3,
    goal3ServiceCategory,
    goal3Summary,
    goal3Details,
    goal3TargetDate,
    goal3ActionStep1,
    goal3ActionStep2,
    goal3ActionStep3,
    comments,
    HCWSignature,
    HCWSignatureDate,
    supervisorSignature,
    clientSignature,
  } = props.clientData;

  return (
    <>
      <div
        ref={ref}
        className="my-5 mx-auto px-5"
        style={{ backgroundColor: "0099bb" }}
      >
        <div className="grid grid-cols-3 gap-5 justify-center items-center">
          <div></div>
          <div className="flex gap-x-1 justify-center">
             <img src="https://cdn3.iconfinder.com/data/icons/other-icons/48/paper_document-512.png" alt="" width={24}/>
        <h3 className="font-black text-center my-1 text-xs">
            Service Action Plan
          </h3>
        </div>
          
          <div className="flex justify-end">
            <img
              src="https://lanuevaesperanza.platformable.com/logo.png"
              alt=""
              className="my-3"
              width="100"
            />
          </div>
        </div>

        <p className="text-xs font-black px-5" style={{ fontSize: "8px" }}>
          Information
        </p>

        <div className="container-xl mx-auto border rounded-lg px-5 py-2">
          <div className="top-information-container grid grid-cols-3">
            <div className="information-item flex gap-x-1">
              <p className="text-xs italic" style={{ fontSize: "8px" }}>
                Date: {planStartDate}
              </p>
            </div>

            <div className="information-item flex gap-x-1 justify-center items-center">
              <p className="text-xs italic" style={{ fontSize: "10px" }}>
                Client and ID: {clientFirstName} {clientLastName?.charAt(0)}{" "}
                {clientId}
              </p>
            </div>

            <div className="information-item flex gap-x-1 justify-end items-center">
              <p className="text-xs italic" style={{ fontSize: "10px" }}>
                Health Care Worker: {userFirstName} {userLastName}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs font-black px-5 my-2" style={{ fontSize: "8px" }}>
          Client Goals
        </p>


        <div className="goals-container grid grid-cols-3 gap-5 px-5  py-2 border rounded-lg">

            <div className="goals-box">
                <h6 className="text-xs font-black " style={{ fontSize: "8px" }}>Goal 01</h6>

                <div className="grid grid-cols-3">
                    <div>
                        <span className="text-xs italic font-black" style={{ fontSize: "6px" }}>Service Category</span>
                        <p className="text-xs leading-3 h-8" style={{ fontSize: "6px" }}>{goal1ServiceCategory}</p>

                    </div>
                    <div>
                        <span className="text-xs italic font-black" style={{ fontSize: "6px" }}>Summary</span>
                        <p className="text-xs leading-3 h-8" style={{ fontSize: "6px" }}>{goal1Summary}</p>
                    </div>
                    <div>
                        <span className="text-xs italic font-black" style={{ fontSize: "6px" }}>Target Date</span>
                        <p className="text-xs leading-3" style={{ fontSize: "6px" }}>{goal1TargetDate}</p>
                    </div>
                   
                </div>
                {/* <h6 className="text-xs font-black my-4" style={{ fontSize: "8px" }}>Details</h6>
                <div className="border rounded-lg px-2 py-1"> 
                    <p className="text-xs " style={{ fontSize: "10px" }}>{goal1Details}</p>
                </div> */}
                <h6 className="text-xs font-black my-1 font-black" style={{ fontSize: "8px" }}>Action 01</h6>
                <div className="border rounded-lg px-2 py-1 h-24"> 
                    <p className="text-xs leading-3" style={{ fontSize: "7px" }}>{goal1ActionStep1}</p>
                </div>
                <h6 className="text-xs font-black my-1 font-black" style={{ fontSize: "8px" }}>Action 02</h6>
                <div className="border rounded-lg px-2 py-1 h-24"> 
                    <p className="text-xs leading-3" style={{ fontSize: "7px" }}>{goal1ActionStep2}</p>
                </div>
                <h6 className="text-xs font-black my-1 font-black" style={{ fontSize: "8px" }}>Action 03</h6>
                <div className="border rounded-lg px-2 py-1 h-24"> 
                    <p className="text-xs leading-3 " style={{ fontSize: "7px" }}>{goal1ActionStep3}</p>
                </div>

            </div> {/* goals box */}

            <div className="goals-box">
                <h6 className="text-xs font-black " style={{ fontSize: "8px" }}>Goal 02</h6>

                <div className="grid grid-cols-3">
                    <div>
                        <span className="text-xs italic font-black" style={{ fontSize: "6px" }}>Service Category</span>
                        <p className="text-xs leading-3 h-8" style={{ fontSize: "6px" }}>{goal2ServiceCategory}</p>

                    </div>
                    <div>
                        <span className="text-xs italic font-black leading-3" style={{ fontSize: "6px" }}>Summary</span>
                        <p className="text-xs leading-3 h-8" style={{ fontSize: "6px" }}>{goal2Summary}</p>
                    </div>
                    <div>
                        <span className="text-xs italic font-black" style={{ fontSize: "6px" }}>Target Date</span>
                        <p className="text-xs leading-3" style={{ fontSize: "6px" }}>{goal2TargetDate}</p>
                    </div>
                   
                </div>
                {/* <h6 className="text-xs font-black my-4" style={{ fontSize: "8px" }}>Details</h6>
                <div className="border rounded-lg px-2 py-1"> 
                    <p className="text-xs " style={{ fontSize: "10px" }}>{goal1Details}</p>
                </div> */}
                <h6 className="text-xs font-black my-1 font-black" style={{ fontSize: "8px" }}>Action 01</h6>
                <div className="border rounded-lg px-2 py-1 h-24"> 
                    <p className="text-xs leading-3" style={{ fontSize: "7px" }}>{goal2ActionStep1}</p>
                </div>
                <h6 className="text-xs font-black my-1 font-black" style={{ fontSize: "8px" }}>Action 02</h6>
                <div className="border rounded-lg px-2 py-1 h-24"> 
                    <p className="text-xs leading-3" style={{ fontSize: "7px" }}>{goal2ActionStep2}</p>
                </div>
                <h6 className="text-xs font-black my-1 font-black" style={{ fontSize: "8px" }}>Action 03</h6>
                <div className="border rounded-lg px-2 py-1 h-24"> 
                    <p className="text-xs leading-3" style={{ fontSize: "7px" }}>{goal2ActionStep3}</p>
                </div>

            </div> {/* goals box */}

            <div className="goals-box">
                <h6 className="text-xs font-black " style={{ fontSize: "8px" }}>Goal 03</h6>

                <div className="grid grid-cols-3">
                    <div>
                        <span className="text-xs italic font-black" style={{ fontSize: "6px" }}>Service Category</span>
                        <p className="text-xs leading-3 h-8" style={{ fontSize: "6px" }}>{goal3ServiceCategory}</p>

                    </div>
                    <div>
                        <span className="text-xs italic font-black" style={{ fontSize: "6px" }}>Summary</span>
                        <p className="text-xs leading-3 h-8" style={{ fontSize: "6px" }}>{goal3Summary}</p>
                    </div>
                    <div>
                        <span className="text-xs italic font-black" style={{ fontSize: "6px" }}>Target Date</span>
                        <p className="text-xs leading-3" style={{ fontSize: "6px" }}>{goal3TargetDate}</p>
                    </div>
                   
                </div>
                {/* <h6 className="text-xs font-black my-4" style={{ fontSize: "8px" }}>Details</h6>
                <div className="border rounded-lg px-2 py-1"> 
                    <p className="text-xs " style={{ fontSize: "10px" }}>{goal1Details}</p>
                </div> */}
                <h6 className="text-xs font-black my-1 font-black" style={{ fontSize: "8px" }}>Action 01</h6>
                <div className="border rounded-lg px-2 py-1 h-24"> 
                    <p className="text-xs leading-3" style={{ fontSize: "7px" }}>{goal3ActionStep1}</p>
                </div>
                <h6 className="text-xs font-black my-1 font-black" style={{ fontSize: "8px" }}>Action 02</h6>
                <div className="border rounded-lg px-2 py-1 h-24"> 
                    <p className="text-xs leading-3" style={{ fontSize: "7px" }}>{goal3ActionStep2}</p>
                </div>
                <h6 className="text-xs font-black my-1 font-black" style={{ fontSize: "8px" }}>Action 03</h6>
                <div className="border rounded-lg px-2 py-1 h-24"> 
                    <p className="text-xs leading-3" style={{ fontSize: "7px" }}>{goal3ActionStep3}</p>
                </div>

            </div> {/* goals box */}

           

        </div> {/* goals container */}

        <p className="text-xs font-black px-5 my-1" style={{ fontSize: "8px" }}>
          Additional Comments
        </p>
              
        <div className="border rounded-lg px-5 py-2 my-1">
          <p className="text-xs h-14" style={{ fontSize: "8px" }}>{comments}</p>
        </div>

        <p className="text-xs font-black px-5 my-1" style={{ fontSize: "8px" }}>
          Signatures
        </p>
              
        <div className="border rounded-lg px-5 py-2 my-1 grid grid-cols-4 gap-5">
        <div>
            <div className="border-b h-8"></div>
            <p className="text-xs italic px-5 my-1 text-center" style={{ fontSize: "8px" }}>
          Client Signature
        </p>
        </div>

        <div>
            <div className="border-b h-8"></div>
            <p className="text-xs italic px-5 my-1 text-center" style={{ fontSize: "8px" }}>
          Health Care Worker Signature
        </p>
        </div>


        <div>
            <div className="border-b h-8"></div>
            <p className="text-xs italic px-5 my-1 text-center" style={{ fontSize: "8px" }}>
          Supervisor Signature
        </p>
        </div>


        <div>
            <div className="border-b h-8"></div>
            <p className="text-xs italic px-5 my-1 text-center" style={{ fontSize: "8px" }}>
          Date
        </p>
        </div>
        </div>




      </div>
    </>
  );
});


ComponentToPrint.displayName = 'ComponentToPrint';
export default ComponentToPrint;
