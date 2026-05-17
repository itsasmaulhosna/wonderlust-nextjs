
import Link from "next/link";
import Image from "next/image";
import DestinationCard from "./DestinationCard";

const Featured = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured`,
    {
      cache: "no-store",
    }
  );

  const destinations = await res.json();

  return (
    <section className="mt-16 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Featured Destinations
          </h1>

          <p className="mt-3 text-slate-600 max-w-2xl leading-relaxed">
            Explore the most beautiful and trending travel destinations around
            the world. Discover breathtaking places, unforgettable adventures,
            and make your next journey truly memorable.
          </p>
        </div>

        <Link href="/destination">
          <button className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all duration-300 hover:scale-105 shadow-md">
            All Destinations
          </button>
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {destinations?.map((destination) => 
          <DestinationCard key={destination._id} destination={destination}></DestinationCard>
        )}
      </div>
    </section>
  );
};

export default Featured;

