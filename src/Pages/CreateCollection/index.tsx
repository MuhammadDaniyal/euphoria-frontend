import CreateCollection from "../../Components/CreateCollection/CreateCollection";
import React from "react";
import Layout from "../../Components/Shared/Layout/Layout";

const index = () => {
  return (
    <Layout bgImgClass={"marketPlaceBgImg"}>
      <CreateCollection />
    </Layout>
  );
};

export default index;
