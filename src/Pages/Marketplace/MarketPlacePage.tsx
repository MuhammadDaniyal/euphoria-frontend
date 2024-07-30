import { useEffect, useState } from "react";
import MarketPlace from "../../Components/MarketPlace/MarketPlace";
import Layout from "../../Components/Shared/Layout/Layout";

const MarketPlacePage = () => {
  const [bgImg, setBgImg] = useState("marketPlaceBgImg");

  return (
    <Layout bgImgClass={bgImg as any}>
      <MarketPlace setBgImg={setBgImg} />
    </Layout>
  );
};

export default MarketPlacePage;
