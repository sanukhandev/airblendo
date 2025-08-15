import React from "react";

type CardType = {
  cardIcon: React.ReactNode;
  cardName: string;
};

const SectionCard = ({ cardIcon, cardName }: CardType) => {
  return (
    <div className="flex bg-[#CBFCC6] rounded-lg relative overflow-hidden">
      <div className="absolute hidden lg:block md:mt-[28] md:ml-[-23] h-8 w-8 rounded-full bg-white"></div>
      <div className="flex p-3 md:p-6 lg:p-8 gap-3 md:gap-5 items-center w-full">
        <div className="pr-2 md:pr-3 border-r border-black flex-shrink-0">
          {cardIcon}
        </div>
        <h1 className="font-regular text-sm md:text-base lg:text-md break-words">
          {cardName}
        </h1>
      </div>
      {/* <div className="absolute hidden lg:block md:mt-[90] md:ml-[55] h-10 w-10 rounded-full bg-white"></div> */}
    </div>
  );
};
export default SectionCard;
