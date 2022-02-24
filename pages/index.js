import Head from 'next/head'
import Footer from '../components/Footer'
import LargeCard from '../components/LargeCard'
import Header from '../components/Header'
import Banner from '../components/Banner'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
export default function Home({ exploreData, cardsData }) {
  return (
    <div>
      <Head>
        <title>Airbnb clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <main className="mx-auto max-w-7xl px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="pb-5 text-2xl font-semibold lg:text-4xl">
            Explore Nearby
          </h2>

          {/* pull some data from server */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2
           lg:grid-cols-3 xl:grid-cols-4"
          >
            {exploreData?.map(({ img, location, distance }) => (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>
        <section className="pt-6">
          <h2 className="pb-5 text-2xl font-semibold lg:text-4xl">
            Live Anywhere
          </h2>
          <div className="-ml-3 flex space-x-4 overflow-scroll p-3 scrollbar-hide">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>
        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Whishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  )

  const cardsData = await fetch('https://links.papareact.com/zp1').then((res) =>
    res.json()
  )

  return {
    props: {
      exploreData,
      cardsData,
    },
  }
}
