import React from "react";
import Layout from "../../Components/Shared/Layout/Layout";
import UploadNFT from "../../Components/UploadNFT/UploadNFT";

const index = () => {
  return (
    <Layout bgImgClass={"marketPlaceBgImg"}>
      <UploadNFT />
    </Layout>
  );
};

export default index;
