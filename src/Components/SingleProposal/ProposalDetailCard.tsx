import React, { useState, useEffect } from "react";


interface _proposal {
  active: boolean,
  votesFor: number,
  votesAgainst: number,
  timeLeft: number,
  _res: number,
}

const ProposalDetailCard = ({ details ,Bdata,st}: {details:any,Bdata:_proposal,st:boolean}) => {
  const [data, setData] = useState<any>(details && details);

  const[Bd,setBd]=useState<_proposal>()
  const[state,setState]=useState<boolean>(false)
  const[state1,setState1]=useState<boolean>(false)

  useEffect(() => {
    setBd(Bdata && Bdata)
    setState(!state)
  }, [st,state1])

  
  useEffect(() => {
    if (Bd && isNaN(Number(Bd.votesFor))) {
      const timer = setTimeout(() => {
        setState1(prevState => !prevState);
      }, 1000);

      // Clean up the timer on component unmount or if Bd changes
      return () => clearTimeout(timer);
    }
  }, [state])
  

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">Email</span>
        <span className="text-sm tracking-[0.5px] text-white cursor-pointer">
          <a href={`mailto:${data && data?.email}`}>{data && data?.email}</a>
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">Manager Email</span>
        <span className="text-sm tracking-[0.5px] text-white cursor-pointer">
          <a href={`mailto:${data && data?.managerEmail}`}>
            {data && data?.managerEmail}
          </a>
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">Manager Number</span>
        <span className="text-sm tracking-[0.5px] text-white">
          {data && data?.managerNumber}
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">Website URL</span>
        <span className="text-sm tracking-[0.5px] text-white cursor-pointer">
          <a href={data && data?.websiteURL} target="_blank" rel="noreferrer">
            {data && data?.websiteURL}
          </a>
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">Yes</span>
        <span className="text-sm tracking-[0.5px] text-white cursor-pointer">
            {Bd && !isNaN(Number(Bd.votesFor)) ? (Number(Bd.votesFor)):"(0)"}
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">No</span>
        <span className="text-sm tracking-[0.5px] text-white cursor-pointer">
            {Bd && !isNaN(Number(Bd.votesAgainst)) ? Number(Bd.votesAgainst): "(0)" }
        </span>
      </div>
    </>
  );
};

export default ProposalDetailCard;
