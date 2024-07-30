import "./App.css";
import Home from "../src/Pages/Home";
import MarketPlacePage from "./Pages/Marketplace/MarketPlacePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleNft from "./Pages/SingleNft";
import Profile from "./Pages/Profile";
import CreateCollection from "./Pages/CreateCollection";
import SingleCollection from "./Pages/SingleCollection";
import CollectionRanking from "./Pages/CollectionRanking";
import CreateProfile from "./Pages/CreateProfile";
import UploadNFT from "./Pages/UploadNft";
import HelpPage from "./Pages/Help";
import VidPage from "./Pages/Video";
import PageNotFound from "./Pages/Error";
import SingleProposal from "./Pages/SingleProposal";

import Proposals from "./Pages/DAOProposals";
function App() {
  const router = createBrowserRouter([
    { 
      path: "/",
      element: <Home />,
    },
    {
      path: "/marketplace",
      element: <MarketPlacePage />,
    },
    {
      path: "/nft/:category/:id",
      element: <SingleNft />,
    },
    {
      path: "/proposal/:walletAddress",
      element: <SingleProposal />,
    },

  {
      path: "/proposals",
      element: <Proposals />,
    },
    {
      path: "/profile/:userid",
      element: <Profile />,
    },
    {
      path: "/upload-nft/:collect/:category",
      element: <UploadNFT />,
    },
    {
      path: "/create-collection",
      element: <CreateCollection />,
    },
    {
      path: "/help",
      element: <HelpPage />,
    },
    {
      path: "/collection/:tag/:id/:state",
      element: <SingleCollection />,
    },
    {
      path: "/top-collections",
      element: <CollectionRanking />,
    },
    {
      path: "/create-profile",
      element: <CreateProfile />,
    },
    {
      path: "/create-profile/:type",
      element: <CreateProfile />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path: "/video",
      element: <VidPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
