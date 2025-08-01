import Search from "@/components/Search";
import CityCard from "@/components/CityCard";
import SectionCard from "@/components/SectionCard";
import { CreditCard, HandCoins, PlaneTakeoff, Hotel } from "lucide-react";
import Image from "next/image";
import Book from "../../../public/images/bg-image.jpg";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="mx-auto">
      <div className="home-page">
        <div className="flex flex-col h-[90vh] sm:justify-between relative md:p-10 p-5">
          <>
            <div className="p-5  text-white rounded-xl">
              <h1 className="text-2xl hidden md:block md:text-4xl font-bold">
                Explore somewhere interesting <br /> Enjoy the vibes!
              </h1>
            </div>
            <div className="md:block">
              <Search />
            </div>
          </>
        </div>
      </div>
      <div className="container mx-auto mt-24 px-5 md:p-0 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-blue-900 text-center">
          Top Destinations
        </h1>
        <p className="mt-4 text-base text-center text-gray-700">
          Much places suits your mood. Explore somewhere interesting and enjoy
          the vibes!
        </p>
        <div className="mt-8 w-full">
          <CityCard />
        </div>
      </div>
      <div className="container mx-auto mt-24 flex flex-col items-center px-10 md:px-0">
        <h1 className="text-5xl text-center text-blue-900 font-bold">
          Why book with us
        </h1>

        <div className="mt-8 grid lg:grid-cols-4 grid-cols-2 gap-5">
          <>
            <SectionCard
              cardIcon={<CreditCard size={25} />}
              cardName="Pay in Installments"
            />
          </>
          <>
            {" "}
            <SectionCard
              cardIcon={<HandCoins size={25} />}
              cardName="Secure Payment"
            />
          </>
          <>
            <SectionCard
              cardIcon={<PlaneTakeoff size={25} />}
              cardName="Over 200 Airlines"
            />
          </>
          <>
            {" "}
            <SectionCard
              cardIcon={<Hotel size={25} />}
              cardName="Hotels worldwides"
            />
          </>{" "}
        </div>
      </div>
      <div className="mt-24 container bg-gray-100 mx-auto grid md:grid-cols-2 grid-cols-1 rounded-lg py-10 md:py-0 px-10 md:px-0">
        <Image src={Book} alt="booking" className="rounded-l-lg" />
        <span className="flex flex-col md:items-start items-center justify-center px-5">
          <h1 className="text-5xl text-center font-bold mt-3">
            Plan your next Vacation
          </h1>
          <p className="mt-4 text-center">
            Choose from our 1000+ Destinations. Enjoy hustle free vacation
          </p>
          <Button className="pointer mt-4"> Book Now</Button>
        </span>
      </div>
    </div>
  );
}
