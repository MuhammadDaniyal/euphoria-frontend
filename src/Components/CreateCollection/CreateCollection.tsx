import React from "react";
import SideContent from "./SideContent";
import CollectionForm from "./CollectionForm";

const CreateCollection = () => {
  return (
    <>
      <section className=" relative w-full md:w-full flex justify-center gap-12 text-white mx-auto ">
        {/* image and  form section */}
        <div className=" w-full md:w-[65%] h-screen overflow-y-scroll scrollbarHide">
          <CollectionForm />
        </div>

        {/* side content section */}
        <div className="w-[35%] hidden md:block pt-16">
          <SideContent />
        </div>
      </section>
    </>
  );
};

export default CreateCollection;
