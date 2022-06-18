import Link from "next/link";
import { useRouter } from "next/router";

function HotelDetails() {
    const router = useRouter()
    console.log(router.query);
    return (
        <div className="p-1 sm:p-12 fadeIn'">
            <div className='text-gray-500' style={{ fontSize: "2em" }}>
                <h1>No Hotel Details Provided</h1>
            </div>
            <div className='text-gray-500 mt-10 text-blue-400 underline cursor-pointer' style={{ fontSize: "1em" }}>
                <Link href={`/`}><a><h1> &#x2190; Back to hotels listings</h1></a></Link>
            </div>
        </div>
    )
}

export default HotelDetails;
