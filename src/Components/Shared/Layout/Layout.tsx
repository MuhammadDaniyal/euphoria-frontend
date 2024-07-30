import React, { ReactNode, useState } from "react";
import Sidebar from "../Sidebar";
import Footer from "../Footer/Footer";

// import AnimatedCursor from "react-animated-cursor";
import BottomToTop from "../BottomToTop/BottomToTop";
import HeaderSection from "../Header/HeaderSection";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  bgImgClass,
}: {
  children: ReactNode;
  bgImgClass: string;
}) => {
  // localStorage.setItem("bgImg", "marketPlaceBgImg");

  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  return (
      <main className={`${bgImgClass}`}>
        {/* <AnimatedCursor
        innerSize={6}
        outerSize={32}
        innerScale={1}
        outerScale={1.8}
        outerAlpha={0}
        // @ts-ignore
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "#fff",
        }}
        outerStyle={{
          border: "2px solid #fff",
        }}
      /> */}
        <BottomToTop />
        <Sidebar
          openMobileSidebar={openMobileSidebar}
          setOpenMobileSidebar={setOpenMobileSidebar}
        />
        <div className="md:ml-[70px]">
          <HeaderSection
            openMobileSidebar={openMobileSidebar}
            setOpenMobileSidebar={setOpenMobileSidebar}
          />
          {children}
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </main>
  );
};

export default Layout;
