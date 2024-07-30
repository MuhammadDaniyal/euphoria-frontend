import React from "react";
import { LuClipboardList } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";
import { TbPencilBolt } from "react-icons/tb";
import { FiEye, FiEyeOff } from "react-icons/fi";

const data = [
  {
    id: 1,
    icon: <LuClipboardList className=" text-3xl text-white" />,
    title: "Manage collection settings",
    description: "Edit collection details, earnings, and links.",
  },
  {
    id: 2,
    icon: <HiOutlineSparkles className=" text-3xl text-white" />,
    title: "Set up your drop",
    description: "Set up your mint schedule and presale stages.",
  },
  {
    id: 3,
    icon: <TbPencilBolt className=" text-3xl text-white" />,
    title: "Prepare designs",
    description: "Customize your pages and upload all assets.",
  },
];

const SideContent = () => {
  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl bg-slate-700 p-7 max-w-[320px]">
        {/* first div */}
        <div>
          <p className="text-lg font-semibold mb-4">
            After you deploy your contract you’ll be able to:
          </p>
          <div className="flex flex-col gap-4">
            {data.map((item, i) => {
              return (
                <div className=" flex">
                  {item.icon}
                  <div className=" ml-[16px]">
                    <h4 className="text-[15px] font-medium mb-1 text-secondary">
                      {item.title}
                    </h4>
                    <p className="text-[13px] font-light leading-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* second div */}

        <div>
          <p className="text-lg font-semibold mb-4">
            Your community:
          </p>
          <div className="flex flex-col gap-4">
            <div className=" flex">
              <FiEyeOff className=" text-3xl text-white" />
              <div className=" ml-[16px]">
                <h4 className="text-[15px] font-medium mb-1 text-secondary">
                  Can’t view
                </h4>
                <p className="text-[13px] font-light leading-sm">
                  Your drop page or items until you publish them.
                </p>
              </div>
            </div>

            <div className=" flex">
              <FiEye className=" text-3xl text-white" />
              <div className=" ml-[16px]">
                <h4 className="text-[15px] font-medium mb-1 text-secondary">
                  Can view
                </h4>
                <p className="text-[13px] font-light leading-sm">
                  That you’ve deployed a contract onto the blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideContent;
