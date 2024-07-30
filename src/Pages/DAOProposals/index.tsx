import React from "react";
import Layout from "../../Components/Shared/Layout/Layout";
import MainPage from "../../Components/DAOProposals/MainPage";

const index = () => {
  return (
    <Layout bgImgClass={"marketPlaceBgImg"}>
      <MainPage />
    </Layout>
  );
};

export default index;