import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { getJson } from "../../helpers/apiInstance";
import { activeVoting, getVotingDur } from "../../helpers/functions/page";

// interface Proposal {
//   id: number;
//   s_no: string;
//   purpose: string;
//   walletAddress: string;
//   vote_yes: string;
//   vote_no: string;
//   expiry_date: string;
// }
interface Proposal {
  id: number;
  s_no: string;
  purpose: string;
  walletAddress: string;
  vote_yes: string;
  vote_no: string;
  expiry_date: string;
}

interface ActiveVoting {
  celebrity: string;
  startTime: number;
  votesFor: number;
  votesAgainst: number;
  active: boolean;
  res: number;
}



const ProposalsTable = () => {
  const [rows, setRows] = useState<any>("");
  const [data, setData] = useState<any>("");
  const [durr, setDur] = useState<number>(0)





  const fetchProposalsData = async () => {
    try {
        // Fetch proposals data
        const response: any[] = await getJson(`http://localhost:8000/api/profile/celebrities?status=pending`);
        // console.log("response", response);

        if (response && Array.isArray(response)) {
            // Transform the proposals data
            const transformedData: Proposal[] = response.map((item: any, index: number) => ({
                id: index + 1,
                s_no: (index + 1).toString(),
                purpose: item.name,
                walletAddress: item.walletAddress,
                vote_yes: "-", // Default values
                vote_no: "-",  // Default values
                expiry_date: "-", // Default values
            }));

            // Fetch active voting data
            const activeVotingData: ActiveVoting[] = await activeVoting();
            // console.log("votingData==>", activeVotingData);

            // Merge the data based on wallet address
            const mergedData: Proposal[] = transformedData.map(proposal => {
                const activeVoting = activeVotingData.find(voting => voting.celebrity.toLowerCase() === proposal.walletAddress.toLowerCase());
                if (activeVoting) {
                    // const expiryTime = (Number(activeVoting.startTime) + 24 * 60 * 60) * 1000;
                    const expiryTime = (Number(activeVoting.startTime) + durr) * 1000;
                    const expiryDate = new Date(expiryTime).toLocaleString();
                    return {
                        ...proposal,
                        vote_yes: Number(activeVoting.votesFor).toString(),
                        vote_no: Number(activeVoting.votesAgainst).toString(),
                        expiry_date: expiryTime.toString(),
                    };
                }
                return proposal;
            });

            // Function to update countdown timers
            const updateCountdownTimers = () => {
                const updatedData: Proposal[] = mergedData.map(proposal => {
                    const expiryTimestamp = parseInt(proposal.expiry_date, 10);
                    if (!isNaN(expiryTimestamp)) {
                        const now = Date.now();
                        const timeRemaining = expiryTimestamp - now;
                        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
                        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                        const countdown = `${hours}h ${minutes}m ${seconds}s`;

                        return {
                            ...proposal,
                            expiry_date: timeRemaining > 0 ? countdown : "Expired",
                        };
                    }
                    return proposal;
                });
                setRows(updatedData);
            };

            // Initial set of merged data
            setRows(mergedData);
            // console.log("mergedData==>", mergedData);

            // Update countdown timers every second
            const timerInterval = setInterval(updateCountdownTimers, 1000);

            // Clear interval when component is unmounted or data is fetched again
            return () => clearInterval(timerInterval);
        } else {
            console.error('Invalid response data:', response);
        }
    } catch (error) {
        console.error('Error fetching proposals data:', error);
    }
};

  








// working good
  // const fetchProposalsData = async () => {
  //   try {
  //     // Fetch proposals data
  //     const response = await getJson("http://localhost:8000/api/profile/celebrities?status=pending");
  //     console.log("response", response);
  
  //     if (response && Array.isArray(response)) {
  //       // Transform the proposals data
  //       const transformedData: Proposal[] = response.map((item: any, index: number) => ({
  //         id: index + 1,
  //         s_no: (index + 1).toString(),
  //         purpose: item.name,
  //         walletAddress: item.walletAddress,
  //         vote_yes: "-", // Default values
  //         vote_no: "-",   // Default values
  //         expiry_date: "-", // Default values
  //       }));
  
  //       // Fetch active voting data
  //       const activeVotingData: ActiveVoting[] = await activeVoting();
  //       console.log("votingData==>", activeVotingData);
  
  //       // Merge the data based on wallet address
  //       const mergedData: Proposal[] = transformedData.map(proposal => {
  //         const activeVoting = activeVotingData.find(voting => voting.celebrity.toLowerCase() === proposal.walletAddress.toLowerCase());
  //         if (activeVoting) {
  //           const expiryDate = new Date((Number(activeVoting.startTime) + 24 * 60 * 60) * 1000).toLocaleString();
  //           console.log("expiryDate==>",expiryDate)
  //           return {
  //             ...proposal,
  //             vote_yes: Number(activeVoting.votesFor).toString(),
  //             vote_no: Number(activeVoting.votesAgainst).toString(),
  //             expiry_date: (expiryDate).toString(),
  //           };
  //         }
  //         return proposal;
  //       });
  
  //       // Set the merged data in the state
  //       setRows(mergedData);
  //       console.log("mergedData==>", mergedData);
  //     } else {
  //       console.error('Invalid response data:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching proposals data:', error);
  //   }
  // };



  // const fetchProposalsData = async () => {
  //   const response = await getJson(
  //     "http://localhost:8000/api/profile/celebrities?status=pending"
  //   );
  //   if (response) {
  //     // setData(response);
  //     const transformedData = response.map((item: any, index: number) => ({
  //       id: index + 1,
  //       s_no: (index + 1).toString(),
  //       purpose: item.name,
  //       walletAddress: item.walletAddress,
  //       vote_yes: "10",
  //       vote_no: "5",
  //       expiry_date: "2 days",
  //     }));
  //     const data=await activeVoting();
  //     setData(data);

  //     setRows(transformedData);
  //   }
  // };



  // const fetchProposalsData = async () => {
  //   try {
  //     // Fetch proposals data
  //     const response = await getJson("http://localhost:8000/api/profile/celebrities?status=pending");
  //     console.log("response",response)
  //     if (response) {
  //       // Transform the proposals data
  //       const transformedData: Proposal[] = response.map((item: any, index: number) => ({
  //         id: index + 1,
  //         s_no: (index + 1).toString(),
  //         purpose: item.name,
  //         walletAddress: item.walletAddress,
  //         vote_yes: "-", // Default values
  //         vote_no: "-",   // Default values
  //         expiry_date: "-", // Default values
  //       }));
  
  //       // Fetch active voting data
  //       const activeVotingData: ActiveVoting[] = await activeVoting();
  //       console.log("votingData==>",activeVotingData)
  
  //       // Merge the data based on wallet address
  //       const mergedData: Proposal[] = transformedData.map(proposal => {
  //         const activeVoting = activeVotingData.find(voting => voting.celebrity === proposal.walletAddress.toLowerCase());
  //         console.log("active Voting==>",activeVoting)
  //         if (activeVoting) {
  //           const expiryDate = new Date((activeVoting.startTime + 24 * 60 * 60) * 1000).toLocaleString();
  //           return {
  //             ...proposal,
  //             vote_yes: activeVoting.votesFor.toString(),
  //             vote_no: activeVoting.votesAgainst.toString(),
  //             expiry_date: expiryDate,
  //           };
  //         }
  //         return proposal;
  //       });
  
  //       // Set the merged data in the state
  //       setRows(mergedData);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching proposals data:', error);
  //   }
  // };
  


  useEffect(() => {
    const fetchData=async()=>
      {
        const dur:any=await getVotingDur()
        console.log("durat=>",dur)
        setDur(Number(dur))
        
      }
      fetchData();
  }, []);
  
  useEffect(() => {durr && fetchProposalsData();}, [durr]);
  

  const columns: GridColDef[] = [
    {
      field: "s_no",
      headerName: "S.No:",
      // width: 70,
      headerAlign: "center",
      align: "center",
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "purpose",
      headerName: "Purpose of Proposal",
      width: 600,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Link
          to={`/proposal/${params.row.walletAddress}`}
          className="flex items-center font-bold cursor-pointer capitalize"
        >
          {params.value} : Customized Page
        </Link>
      ),
    },
    {
      field: "vote_yes",
      headerName: "Votes for yes",
      sortable: false,
      headerAlign: "center",
      align: "center",
      width: 130,
      disableColumnMenu: true,
      renderCell: (params) => (
        <p className="font-semibold">
          {params.value} <span className=" opacity-80"></span>
        </p>
      ),
    },
    {
      field: "vote_no",
      headerName: "Votes for no",
      sortable: false,
      headerAlign: "center",
      align: "center",
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: "expiry_date",
      headerName: "expires in",
      headerAlign: "center",
      align: "center",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "view",
      headerName: "",
      sortable: false,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderCell: (params) => (
        <Link
          to={`/proposal/${params.row.walletAddress}`}
          className="flex items-center font-bold cursor-pointer capitalize"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          border: "none",
          borderRadius: "10px",
          // marginTop: "18px",
          color: "#fff",
        }}
        className=" text-white"
      >
        <DataGrid
          sx={{
            border: "none",
            color: "white",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "13px",
              fontWeight: "600",
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-columnHeader": {
              fontSize: "14px",
              border: "none",
              backgroundColor: "transparent !important",
            },
            "& .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus":
              {
                outline: "none",
              },
            "& .MuiDataGrid-cell": {
              outline: "none",
            },
            "& .MuiDataGrid-cell, .MuiDataGrid-withBorderColor": {
              border: "none",
              fontWeight: "600",
            },
            "& .css-qvtrhg-MuiDataGrid-virtualScroller": {
              border: "2px solid gray",
              borderRadius: "12px",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              transition: "all ease-in-out 200ms",
            },
          }}
          rows={rows}
          columns={columns}
          hideFooterPagination={true}
        />
      </div>
    </>
  );
};

export default ProposalsTable;