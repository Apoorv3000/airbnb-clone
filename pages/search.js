import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import InfoCards from '../components/InfoCards'
const Search = ({ searchResults }) => {
  const router = useRouter()

  const { location, startDate, endDate, noofGuests } = router.query
  const formattedStartDate = format(new Date(startDate), 'dd MMM yy')
  const formattedEndDate = format(new Date(endDate), 'dd MMM yy')
  const range = `${formattedStartDate} - ${formattedEndDate}`
  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range} | ${noofGuests} guests`} />
      <main className="flex">
        <secton className="flex-grow px-6 pt-14">
          <p className="text-xs">
            300+ Stays - {range} - for {noofGuests} guests
          </p>
          <h1 className="mb-6 text-3xl font-semibold">Stays in {location}</h1>
          <div
            className="mb-5 hidden space-x-3 
          whitespace-nowrap text-gray-500 lg:inline-flex"
          >
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults?.map(
              ({ img, title, description, star, price, total, location }) => (
                <InfoCards
                  img={img}
                  description={description}
                  price={price}
                  title={title}
                  star={star}
                  total={total}
                  location={location}
                  key={img}
                />
              )
            )}
          </div>
        </secton>
      </main>
      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )

  return {
    props: {
      searchResults,
    },
  }
}
