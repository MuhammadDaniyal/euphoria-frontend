import { useState, useRef, useEffect } from "react";
import PDF from "../../assets/images/pdf.jpg";
import ProposalDetailCard from "./ProposalDetailCard";
import { useNavigate, useParams } from "react-router-dom";
import { getJson, patchJson } from "../../helpers/apiInstance";
import { succesToastify, errorToastify } from "../../utils/toast";
import {
  Vote,
  endVote,
  getAdd,
  singleVoting,
  sthm,
} from "../../helpers/functions/page";

interface _proposal {
  active: boolean;
  votesFor: number;
  votesAgainst: number;
  timeLeft: number;
  _res: number;
}

const SingleProposal = () => {
  const [singleProposaldata, setSingleProposaldata] = useState<any>();
  const [proposal, setProposal] = useState<_proposal>();
  const [state, setState] = useState<boolean>(true);
  const [add, setadd] = useState("");
  const { walletAddress } = useParams();
  const navigate = useNavigate();

  const fetchSingleProposalData = async (walletAddress: any) => {
    try {
      const response = await getJson(
        `${process.env.BASE_URL}/api/profile/${walletAddress}`
      );
      const data = await singleVoting(walletAddress);
      console.log("sip===>", data);
      setProposal(data);

      if (response) {
        setSingleProposaldata(response);
        // succesToastify("Fetch Succesfully");
        // console.log("socced")
        // alert("succed")
      }
    } catch (error) {
      // console.log((error as {reason:string}).reason)
      if (error && (error as { reason: string }).reason) {
        errorToastify((error as { reason: string }).reason);
      } else if (error && (error as { message: string }).message) {
        errorToastify((error as { message: string }).message);
      } else {
        if (error) {
          errorToastify(String(error));
        }
      }
    }
  };

  useEffect(() => {
    fetchSingleProposalData(walletAddress);
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      const addd = await getAdd();
      setadd(addd);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!proposal) return;

    const timer = setInterval(() => {
      setProposal((prevProposal) => {
        if (prevProposal && prevProposal.timeLeft > 0) {
          return {
            ...prevProposal,
            timeLeft: Number(prevProposal.timeLeft) - 1,
          };
        }
        return prevProposal;
      });
    }, 950);

    return () => clearInterval(timer);
  }, [proposal]);

  const vote = async (cast: boolean) => {
    try {
      const Vot = await Vote(walletAddress, cast);
      await Vot.wait();
      setState(!state);
    } catch (error) {
      if (errorToastify((error as { reason: string }).reason)) {
        errorToastify((error as { reason: string }).reason);
      }
      // alert(error)
      console.log(error);
    }
  };

  const handleClaim = async () => {
    try {
      const dataA: _proposal = await singleVoting(walletAddress);

      if (dataA.active) {
        const trans = await endVote(walletAddress);
        await trans.wait();
      }

      const data: _proposal = await singleVoting(walletAddress);

      if (Number(data._res) == 1 && walletAddress) {
        // console.log("recieved Status"+Number(data._res))
        const obj = { status: "accepted" };
        await patchJson(walletAddress, obj);
        succesToastify("Profile Approved");
        navigate(`/profile/${walletAddress}`);
      } else if (Number(data._res) == 2 && walletAddress) {
        // console.log("recieved Status"+Number(data._res))
        const obj = { status: "rejected" };
        await patchJson(walletAddress, obj);
        errorToastify("Profile Rejected, better luck next time.");
        setTimeout(() => {
          navigate(`/`);
        }, 10000 / 2);
      } else {
        errorToastify("recieved Status" + Number(data._res));
      }
    } catch (error) {
      // console.log((error as {reason:string}).reason)
      if (error && (error as { reason: string }).reason) {
        errorToastify((error as { reason: string }).reason);
      } else if (
        error &&
        (error as { message: string }).message ==
          "Request failed with status code 404"
      ) {
        errorToastify((error as { message: string }).message);
        navigate(`/`);
      } else if (error && (error as { message: string }).message) {
        errorToastify((error as { message: string }).message);
      } else {
        errorToastify(String(error));
      }
    }
  };

  return (
    <>
      {/* main */}
      <section className=" w-full mx-auto h-screen flex items-center">
        <div className="w-[90%] md:w-[80%] flex flex-col justify-center items-center gap-6 text-white mx-auto bg-[#1f2045] py-10 rounded-2xl">
          <div
            className=" w-[180px] border-[10px] border-slate-900 bg-slate-900 rounded-[50%] h-fit
          transition-all duration-300 ease-in-out transform-gpu hover:scale-105 hover:border-[10px] hover:border-[#00a3ff] absolute top-24"
          >
            <img
              src={singleProposaldata && singleProposaldata.profilePic}
              alt=""
              className=" w-full h-[250px] md:h-[150px] rounded-[50%]"
            />
          </div>
          <div className="w-full md:w-[85%] flex flex-col gap-4 mt-24">
            <div className=" flex justify-center items-center">
              <h3 className=" text-[22px] md:text-[34px] font-bold capitalize">
                {singleProposaldata && singleProposaldata.name}
              </h3>
            </div>

            <div className="flex  gap-4 mt-2 w-full">
              {/* first */}
              <div className=" flex-1 flex justify-between items-center bg-[#212e48] py-4 px-[12px] rounded-md text-sm font-medium">
                <span>Wallet Address</span>
                <span className=" text-right text-base font-semibold">
                  {singleProposaldata && singleProposaldata.walletAddress}
                </span>
              </div>
              <div className=" flex-1 flex justify-between items-center bg-[#212e48] py-4 px-[12px] rounded-md text-sm font-medium">
                <span>Voting Expires In</span>
                <span className=" text-right text-base font-semibold">
                  {proposal && sthm(Number(proposal?.timeLeft))}
                </span>
              </div>
              <div className=" flex-1 flex justify-between items-center bg-[#212e48] py-4 px-[12px] rounded-md text-sm font-medium">
                <div className=" flex gap-2 items-center">
                  <img
                    className=" rounded-[50%] border-[3px] border-[#ffffff14] transition-all duration-200 ease-in-out transform-gpu group-hover:border-none group-hover:scale-105"
                    src={PDF}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>KYC Document</span>
                </div>
                <span className=" text-right text-base font-semibold cursor-pointer">
                  <a
                    href={singleProposaldata && singleProposaldata.kycDocument}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </span>
              </div>
            </div>

            <div className=" flex flex-col gap-[8px] group">
              <h3 className=" text-lg font-semibold text-[#cfcfcf]">Details</h3>
              <div className=" flex items-center gap-3">
                {singleProposaldata && proposal && (
                  <ProposalDetailCard
                    details={singleProposaldata}
                    Bdata={proposal}
                    st={state}
                  />
                )}
              </div>
            </div>

            {proposal && add.toLowerCase() != walletAddress?.toLowerCase() && Number(proposal?.timeLeft) > 0 ? (
              <div className=" flex justify-between gap-6">
                <button
                  onClick={() => vote(true)}
                  className=" bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-[45px] py-2 px-4 rounded-[10px] tracking-[0.5px]
          hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105 flex-1"
                >
                  Vote Yes
                </button>
                <button
                  onClick={() => vote(false)}
                  className=" bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-[45px] py-2 px-4 rounded-[10px] tracking-[0.5px]
               hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105 flex-1"
                >
                  Vote No
                </button>
              </div>
            ) : (
              <div className=" flex justify-between gap-6">
                {proposal &&
                add.toLowerCase() == walletAddress?.toLowerCase() &&
                Number(proposal?.timeLeft) == 0 ? (
                  <button
                    onClick={handleClaim}
                    className=" bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-[45px] py-2 px-4 rounded-[10px] tracking-[0.5px]
               hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105 flex-1"
                  >
                    Claim Now
                  </button>
                ) : (
                  <button
                    className=" bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-[45px] py-2 px-4 rounded-[10px] tracking-[0.5px]
               hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105 flex-1"
                  >
                    Voting in progress
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProposal;
