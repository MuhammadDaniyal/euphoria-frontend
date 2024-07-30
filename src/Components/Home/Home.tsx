import React from "react";
import Carousel from "./Carousel";
import ExploreCategories from "./Categories/ExploreCategories";
import NftBanner from "../../Components/Home/HomeBannner/NftBanner";
// import Card from "./ContributorCard";
import Contributor from "./Contributors/Contributor";
import MarketPlace from "./MarketPlace";
import FAQ from "./FAQ";
import Footer from "../Shared/Footer/Footer";
import StepsCard from "./HomeBannner/StepsCard";
import HeaderSection from "../Shared/Header/HeaderSection";
import Collections from "./Collections/Collections";

const Home = () => {
  return (
    <>
      {/* <HeaderSection /> */}
      <Carousel />
      <MarketPlace />
      <ExploreCategories />
      <Collections />
      <Contributor />
      <NftBanner />
      <StepsCard />
      <Footer />
    </>
  );
};

export default Home;
