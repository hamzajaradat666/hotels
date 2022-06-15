import { observer } from "mobx-react";
import React, { ChangeEvent, useReducer, useState } from "react";
import HotelCard from "../../components/HotelCard";

import store from "../../store/store";
import Link from "next/link";
import { Hotel } from "../../models/HotelModel";
import { EmptyListStatus } from "../../enums/EmptyListStatus";
import Loader from "../../components/Loader";
const Hotels = observer((props: any) => {
  const [filter, dispatchFilter] = useReducer((state: any, action: any) => {
    let defaultFilter = [...state]
    defaultFilter = [...defaultFilter.map(filter => {
      return { ...filter, enabled: false }
    })]

    switch (action) {
      case "nameFilter":
        defaultFilter[0].enabled = true
        defaultFilter[0].asc = !defaultFilter[0].asc
        return [...defaultFilter]
      case "priceFilter":
        defaultFilter[1].enabled = true
        defaultFilter[1].asc = !defaultFilter[1].asc
        return [...defaultFilter]
    }
  }, [
    { type: "nameFilter", asc: false, enabled: false },
    { type: "priceFilter", asc: false, enabled: false }
  ])

  const prepareHotelsJSX = () => {
    return store.filteredHotels.map(((p: Hotel, index: number) => <div key={index} id={"hotelId" + index}><Link href={`/hotels/${p.name}`}><a><HotelCard {...p} ></HotelCard></a></Link></div>))
  }
  const prepareEmptyHotelsJSX = () => {
    switch (store.emptyListStatus) {
      case EmptyListStatus.NoSearch:
        return <div className="flex justify-center items-center mt-16 col-span-2 px-32" style={{ fontSize: "2em" }}>Please search for date of reservasion.</div>
      case EmptyListStatus.Fetching:
        return <div className="flex justify-center items-center mt-16 col-span-2 px-32"><Loader></Loader></div>
      case EmptyListStatus.EmptyFilter:
        return <div className="flex justify-center items-center mt-16 col-span-2 px-32" style={{ fontSize: "2em" }}>No hotels found. :(</div>

    }
  }
  const getHotelsfilteredByPrice = (evt: ChangeEvent<HTMLInputElement>) => {
    store.currentPrice = evt.target.value
    store.filterHotels()
  }

  const getHotelsfilteredByName = (evt: ChangeEvent<HTMLInputElement>) => {
    store.nameFilter = evt.target.value
    store.filterHotels()
  }

  const sortByName = () => {
    dispatchFilter("nameFilter")
    store.setFilter(filter)
    store.sortHotelsByName()
  }

  const sortByPrice = () => {
    dispatchFilter("priceFilter")
    store.setFilter(filter)

    store.sortHotelsByPrice()
  }
  let nameFilter
  let priceFilter
  if (filter) {
    nameFilter = filter[0]
    priceFilter = filter[1]
  }

  return (
    <>

      <div className="border-2 border-gray-500 rounded w-full mt-3">
        <div className="text-center bg-gray-500 w-full text-white p-4">Hotels Listing</div>
        <div className="grid xs:grid-cols-2 sm:grid-cols-12 my-5 p-2">
          <div className="w-full col-span-4">
          </div>
          <div className="w-full col-auto sm:col-span-2">
            <div className="p-2 w-full">Total Night: {store.numOfNights}</div>
          </div>
          <div className="mx-2 w-10/12 col-auto sm:col-span-3">
            <button onClick={() => { sortByName() }} className={`p-2 border-2 border-gray-500 rounded w-full " ${nameFilter.enabled ? "bg-white" : "bg-red-100"} `}>
              <div className="flex justify-around">
                <div className="font-bold">Sort By Name</div><img className={`self-center p-0 w-4 h-4 mx-1 ${nameFilter.asc ? "-scale-y-100" : ""} `} src="arrow-down.png" />
              </div>
            </button>
          </div>
          <div className="mx-2 w-10/12 col-auto sm:col-span-3">
            <button onClick={() => { sortByPrice() }} className={`p-2 border-2 border-gray-500 rounded w-full  ${priceFilter.enabled ? "bg-white" : "bg-red-100"}`}>
              <div className="flex justify-around">
                <div className="font-bold">Sort By Price</div><img className={`self-center p-0 w-4 h-4 mx-1 ${priceFilter.asc ? "-scale-y-100" : ""} `} src="arrow-down.png" />
              </div>
            </button>
          </div>
        </div>
        <div className="grid xs:grid-cols-1 sm:grid-cols-3 ">
          <div className="flex items-center flex-col">
            <div className="p-5 border-gray-400 my-5 w-full">
              <div className="flex justify-center">
                <input id="hotelSearchByName" placeholder="Hotel Name" className="flex justify-center w-full border-2 border-gray-400 p-3 rounded-full -mb-9" type={"text"} onChange={(evt) => { getHotelsfilteredByName(evt) }}></input>
              </div>
            </div>
            <div className="p-5 border-gray-400 h-32 mt-2">
              <label>Price Filter</label>
              <div className="flex justify-center">Current Price: {store.currentPrice}</div>
              <div className="flex justify-center">
                <div className="">{store.lowerPriceLimit}</div>
                <input id="priceRange" className="flex justify-center w-full" type={"range"} min={store.lowerPriceLimit} max={store.upperPriceLimit} onChange={(evt) => { getHotelsfilteredByPrice(evt) }}></input>
                <div className="">{store.upperPriceLimit}</div>
              </div>
            </div>
          </div>

          {store.filteredHotels.length ?
            <div className="grid xs:grid-cols-2 sm:grid-cols-2 col-span-2 overflow-auto h-full">{prepareHotelsJSX()}</div> :
            prepareEmptyHotelsJSX()}

        </div>
      </div>

    </>
  )
})


export default Hotels;
/* 
    <div className="">
          <label>Price Filter</label>
          <div className="flex justify-center">Current Price: {currentPrice}</div>
            <MultiRangeSlider
              min={0}
              max={1000}
              onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
            />
        </div> 
        
        export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const json = await res.json()
  return {
    props: {
      stars: json
    }
  };
}
        
        */