import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
const Header = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [noofGuests, setNoofGuests] = useState('1')
  const router = useRouter()

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const resetInput = () => {
    setSearchInput('')
  }

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noofGuests,
      },
    })
  }
  return (
    <header
      className="sticky top-0 z-50 
    grid grid-cols-3 bg-white p-5 shadow-md md:px-10"
    >
      {/* left */}

      <div
        onClick={() => router.push('/')}
        className="relative my-auto 
      flex h-10 cursor-pointer items-center"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* middle */}

      <div
        className="flex items-center rounded-full py-2
       md:border-2 md:shadow-sm"
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder={placeholder || 'Start search here'}
          className="flex-grow bg-transparent pl-5 text-sm text-gray-600 
          placeholder-gray-400 outline-none"
        />
        <SearchIcon
          className="hidden h-8 cursor-pointer 
        rounded-full bg-red-400 p-2 text-white md:mx-2 md:inline-flex"
        />
      </div>

      {/* right */}

      <div
        className="flex items-center
       justify-end space-x-4 text-gray-500"
      >
        <p
          className="hidden
         cursor-pointer md:ml-2 md:inline md:text-[13px]  "
        >
          Become a host
        </p>
        <GlobeAltIcon className="h-6 " />
        <div
          className="flex items-center space-x-2 
        rounded-full border-2 p-2"
        >
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
      {searchInput && (
        <div className="col-span-3 mx-auto mt-1 flex flex-col">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#fd5861']}
            onChange={handleSelect}
          />
          <div className="mb-5 flex items-center border-b">
            <h2 className="flex-grow text-2xl font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={noofGuests}
              onChange={(e) => setNoofGuests(e.target.value)}
              min={1}
              type="number"
              className="w-12 pl-2 text-lg text-red-400 
              outline-none"
            />
          </div>
          <div className="flex justify-around">
            <button
              onClick={resetInput}
              className="  text-gray-500 transition 
              duration-200 ease-out hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="rounded-md bg-red-400
             px-4 py-2 text-white transition duration-200 
             ease-out hover:bg-red-500"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
