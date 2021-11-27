import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'

const Search = ({ searchResults }) => {
    const router = useRouter();
    const {numberOfGuests, endDate, location, startDate} = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range =`${formattedStartDate} - ${formattedEndDate}`;
    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${numberOfGuests} guests`}/>
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs"> 3000+Stays - {range} - for {numberOfGuests} guests</p>
                    <h1 className="text-xsmall font-semibold mt-2 mb-6">Stay in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap"> 
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>
                    <div className="flex flex-col">
                        {
                            searchResults.map(({img,location,description,title,price,total,star}) =>(
                                <InfoCard 
                                    key={img}
                                    total={total}
                                    img={img}
                                    location={location}
                                    description={description}
                                    title={title}
                                    price={price}
                                    star={star}
                                />
                            ))
                        }
                    </div>
                    
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Search

export async function getServerSideProps(){
    const searchResults = await fetch("https://links.papareact.com/isz").then(
        (res) => res.json());
    return {
        props:{
            searchResults, 
        }
    }
}