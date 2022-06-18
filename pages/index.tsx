import { observer } from "mobx-react";
import React, { ChangeEvent, useReducer, useState } from "react";

import Link from "next/link";
import store from "../store/store";
import { Hotel } from "../models/HotelModel";
import { EmptyListStatus } from "../enums/EmptyListStatus";
import Loader from "../components/Loader";
import HotelCard from "../components/HotelCard";
import ErrorBoundary from "../components/ErrorBoundary";
import SortFilterKeys from "../keys/SortFilter";
const Hotels = observer((props: any) => {
  const prepareHotelsJSX = () => {
    return store.filteredHotels.map(((p: Hotel, index: number) => <div key={p.name} id={"hotelId" + index}><Link href={`/${p.name}`}><a><HotelCard {...p} ></HotelCard></a></Link></div>))
  }
  const prepareEmptyHotelsJSX = () => {
    switch (store.emptyListStatus) {
      case EmptyListStatus.NoSearch:
        return <div className="flex justify-center items-center mt-16 col-span-2 px-32 border-2 border-gray-50 text-gray-500 mb-2 rounded" style={{ fontSize: "1.5em" }}>Please search for date of reservasion.</div>
      case EmptyListStatus.Fetching:
        return <div className="flex justify-center items-center mt-16 col-span-2 px-32 border-2 border-gray-50 text-gray-500 mb-2 rounded"><Loader></Loader></div>
      case EmptyListStatus.EmptyFilter:
        return <div className="flex justify-center items-center mt-16 col-span-2 px-32 border-2 border-gray-50 text-gray-500 mb-2 rounded" style={{ fontSize: "1.5em" }}>No hotels found. :(</div>

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
    store.setSortFilter(SortFilterKeys.ByName)
    store.sortHotelsByName()
  }

  const sortByPrice = () => {
    store.setSortFilter(SortFilterKeys.ByPrice)
    store.sortHotelsByPrice()
  }
  let nameFilter
  let priceFilter
  nameFilter = store.sortFilter[0]
  priceFilter = store.sortFilter[1]

  let hotelsAvailable = store.filteredHotels.length

  return (
    <ErrorBoundary>
      {store.firstSearch ?
        <div className="border-2 border-gray-500 rounded w-full mt-3 fadeIn">
          <div className="text-center bg-gray-500 w-full text-white p-4" style={{ backgroundColor: "#424242" }}>Hotels Listing</div>
          <div className="grid xs:grid-cols-2 sm:grid-cols-12 my-5 p-2">
            <div className="w-full col-span-4">
            </div>
            <div className="w-full col-auto sm:col-span-2">
              <div className="p-2 w-full">Total Night: {store.numOfNights > 0 ? store.numOfNights : 0}</div>
            </div>
            <div className="mx-2 w-10/12 col-auto sm:col-span-3">
              <button id="sortByName" onClick={() => { sortByName() }} className={`p-2 border-2 border-gray-500 rounded w-full " ${nameFilter.enabled ? "bg-slate-500 text-white" : "bg-white"} `}>
                <div className="flex justify-around">
                  <div className="font-bold">Sort By Name</div><img className={`self-center p-0 w-4 h-4 mx-1 ${nameFilter.descending ? "-scale-y-100" : ""} `} src="arrow-down.png" alt="arrow icon" />
                </div>
              </button>
            </div>
            <div className="mx-2 w-10/12 col-auto sm:col-span-3">
              <button id="sortByPrice" onClick={() => { sortByPrice() }} className={`p-2 border-2 border-gray-500 rounded w-full  ${priceFilter.enabled ? "bg-slate-500 text-white" : "bg-white"}`}>
                <div className="flex justify-around">
                  <div className="font-bold">Sort By Price</div><img className={`self-center p-0 w-4 h-4 mx-1 ${priceFilter.descending ? "-scale-y-100" : ""} `} src="arrow-down.png" alt="arrow icon" />
                </div>
              </button>
            </div>
          </div>
          <div className="grid xs:grid-cols-1 sm:grid-cols-3 fadeIn">

            <div className="flex items-center flex-col fadeIn">
              <div className="p-5 border-gray-400 my-5 w-full">
                <div className="flex justify-center">
                  <input id="hotelSearchByName" placeholder="Hotel Name" className="flex justify-center w-full border-2 border-gray-400 p-3 rounded-full -mb-9 max-w-xl" type={"text"} onChange={(evt) => { getHotelsfilteredByName(evt) }}></input>
                </div>
              </div>
              <div className="p-5 border-gray-400 h-32 mt-2">
                <label>Price Filter</label>
                <div className="flex justify-center">Current Price: {store.currentPrice}</div>
                <div className="flex justify-center">
                  <div className="">{store.lowerPriceLimit}</div>
                  <input id="priceRange" className="flex justify-center" style={{ width: "17vw" }} type={"range"} min={store.lowerPriceLimit} max={store.upperPriceLimit} onChange={(evt) => { getHotelsfilteredByPrice(evt) }}></input>
                  <div className="">{store.upperPriceLimit}</div>
                </div>
              </div>
            </div>

            {hotelsAvailable ?
              <div className="grid xs:grid-cols-2 sm:grid-cols-2 col-span-2 overflow-auto h-full">{prepareHotelsJSX()}</div> :
              <div className="grid xs:grid-cols-2 sm:grid-cols-2 sm:col-span-4 overflow-auto h-full">{prepareEmptyHotelsJSX()}</div>}

          </div>
        </div>
        : null}
    </ErrorBoundary>
  )
})
/* export async function getServerSideProps() {
  let da = await fetch('https://run.mocky.io/v3/48244d7b-52e9-4b5f-b122-bd763e53fa5c')
    let data = await da.text()
    const convertToArray = data.split("\n");
    convertToArray.splice(convertToArray.length - 2, 2);
    const joinArr = convertToArray.join("\n");
    const result = joinArr + "}]";
    store.setHotelsList([...(JSON.parse(result))])
    return {props:{hotels: [...(JSON.parse(result))]}}
} */

export default Hotels;



