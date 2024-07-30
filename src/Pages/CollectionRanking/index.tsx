import React from "react";
import Layout from "../../Components/Shared/Layout/Layout";
import CollectionRanking from "../../Components/CollectionRanking/CollectionRanking";

const index = () => {
  return (
    <Layout bgImgClass={"marketPlaceBgImg"}>
      <CollectionRanking />
    </Layout>
  );
};

export default index;
