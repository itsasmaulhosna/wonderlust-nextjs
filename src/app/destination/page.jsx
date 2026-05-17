import DestinationCard from "@/components/DestinationCard";


const DestinationPage =async () => {
    const res =await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`);
    console.log(process.env.NEXT_PUBLIC_SERVER_URL);
    const destinations =await res.json()
    console.log(destinations);
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8"> All Destinations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                destinations.map(destination=><DestinationCard key={destination._id} destination={destination} />)
            }
            </div>
        </div>
    );
};

export default DestinationPage;