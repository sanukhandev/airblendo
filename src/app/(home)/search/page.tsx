// app/flights/search/page.tsx
import FlightCard from "@/components/FlightCard";
import SearchHeader from "@/components/SearchHeader";
import SearchFilter from "@/components/SearchFilter";
import MobileFilter from "@/components/MobileFilter";
type Props = {
  searchParams: Promise<{
    from?: string;
    to?: string;
    depart?: string;
    return?: string;
  }>;
};

export default async function SearchResults({ searchParams }: Props) {
  const { from, to, depart, return: ret } = await searchParams;

  return (
    <div className="">
      <SearchHeader from={from} to={to} depart={depart} returnDate={ret} />

      <div className="px-5 grid grid-cols-4 mt-15 gap-10">
        <div className="md:grid-col-span-1 hidden sm:block">
          <SearchFilter />
        </div>{" "}
        
              <div className="col-span-4 sm:col-span-3">
                  <span> <MobileFilter /></span>
          <h1 className="text-2xl">
            Outbound Flight <span className="text-2xl font-bold">{from}</span>{" "}
            to <span className="text-2xl font-bold">{to}</span>{" "}
          </h1>
          <FlightCard />
        </div>
      </div>
    </div>
  );
}

// Dummy API
