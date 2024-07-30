import React from "react";
import Layout from "../../Components/Shared/Layout/Layout";
import HelpPage from "../../Components/Shared/Help/HelpPage";

const index = () => {
  return (
    <Layout bgImgClass={"marketPlaceBgImg"}>
      <HelpPage />
    </Layout>
  );
};

export default index;
