import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "rank",
    headerName: "Rank",
    // width: 70,
    headerAlign: "center",
    align: "center",
    sortable: true,
    disableColumnMenu: true,
  },
  {
    field: "collection",
    headerName: "Collection",
    width: 550,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <div className="flex items-center font-bold">
        <img
          src="https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLnJhcmlibGV1c2VyZGF0YS5jb20vaXBmcy9RbVNUckE1cGNmNzVUTlpSV1pjNUZpSnJhakp6bU1HQ3dmQ3FmVkFwRGtnY0tF"
          alt="Collection Image"
          style={{
            width: 40,
            height: 40,
            marginRight: 10,
            borderRadius: "8px",
          }}
        />
        {params.value}
      </div>
    ),
  },
  {
    field: "floorPrice",
    headerName: "Floor Price",
    sortable: false,
    headerAlign: "center",
    align: "center",
    width: 130,
    disableColumnMenu: true,
    renderCell: (params) => (
      <p className="font-semibold">
        {params.value} <span className=" opacity-80">ETH</span>
      </p>
    ),
  },
  {
    field: "totalItems",
    headerName: "Total Items",
    headerAlign: "center",
    align: "center",
    width: 120,
    sortable: true,
    disableColumnMenu: true,
  },
  {
    field: "totalVolume",
    headerName: "Total Volume",
    headerAlign: "center",
    align: "center",
    width: 120,
    sortable: true,
    disableColumnMenu: true,
  },
  {
    field: "owner",
    headerName: "Owner",
    headerAlign: "center",
    align: "center",
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <p className="text-[#af67c9] text-[13.5px] hover:underline cursor-pointer">
        @{params.value}
      </p>
    ),
  },
];

const rows = [
  {
    id: 1,
    rank: "1",
    collection: "Pudgy Penguins",
    totalItems: "1450",
    floorPrice: "3.50",
    totalVolume: "3500",
    owner: "Messi250",
  },
  {
    id: 2,
    rank: "2",
    collection: "DeGods",
    totalItems: "2100",
    floorPrice: "9.70",
    totalVolume: "5400",
    owner: "khan123",
  },
  {
    id: 3,
    rank: "3",
    collection: "BoredMilady",
    totalItems: "2100",
    floorPrice: "9.70",
    totalVolume: "5400",
    owner: "obbi2005",
  },
  {
    id: 4,
    rank: "4",
    collection: "BoringPunks",
    totalItems: "2100",
    floorPrice: "9.70",
    totalVolume: "5400",
    owner: "ahsan2002",
  },
  {
    id: 5,
    rank: "5",
    collection: "BoringPunks",
    totalItems: "2100",
    floorPrice: "9.70",
    totalVolume: "5400",
    owner: "ahsan2002",
  },
  {
    id: 6,
    rank: "6",
    collection: "BoringPunks",
    totalItems: "2100",
    floorPrice: "9.70",
    totalVolume: "5400",
    owner: "ahsan2002",
  },
];

const RankingTable = () => {
  return (
    <>
      {/* main div */}
      <div>
        {/* filter and search bar */}
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-5">
          {/* filter */}
          <div className="flex justify-between items-center px-[16px] py-[10px] rounded-xl bg-gray-700 w-40 text-[15px] font-semibold">
            <div className=" cursor-pointer opacity-80 hover:opacity-100">
              1H
            </div>
            <div className=" cursor-pointer opacity-80 hover:opacity-100">
              1D
            </div>
            <div className=" cursor-pointer opacity-80 hover:opacity-100">
              7D
            </div>
            <div className=" cursor-pointer opacity-80 hover:opacity-100">
              30D
            </div>
          </div>

          {/* search bar */}

          <div className=" relative w-[100%]">
            <BiSearchAlt className=" absolute text-2xl text-white z-50 top-2 left-4" />
            <input
              type="text"
              placeholder="Search by collection"
              name="search"
              id="search"
              className="rankingInputSearch rounded-xl w-full placeholder:text-white placeholder:text-base placeholder:font-light placeholder:tracking-wide focus:outline-none"
            />
          </div>
        </div>

        {/* table */}

        <div
          style={{
            height: "100%",
            width: "100%",
            border: "none",
            borderRadius: "10px",
            marginTop: "18px",
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
      </div>
    </>
  );
};

export default RankingTable;
