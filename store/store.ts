import { action, makeAutoObservable, makeObservable, observable, override } from "mobx";
import moment from "moment";
import { EmptyListStatus } from "../enums/EmptyListStatus";
import SortFilterKeys from "../keys/SortFilter";
import { Hotel } from "../models/HotelModel";

const copyObjectData = (objectData: object) => {
    return JSON.parse(JSON.stringify(objectData))
}

class Store {
    hasError: boolean = false
    firstSearch: boolean = false
    hotelsList: Hotel[] = [];
    searchedHotels: Hotel[] = [];
    filteredHotels: Hotel[] = [];
    lowerPriceLimit: number = 0;
    upperPriceLimit: number = 0;
    nameFilter: string = "";
    currentPrice: string = "";
    emptyListStatus: EmptyListStatus = EmptyListStatus.NoSearch
    numOfNights: number = 0
    isSortedAscByName: boolean = true
    isSortedAscByPrice: boolean = true
    sortFilter: any = [
        { type: SortFilterKeys.ByName, descending: false, enabled: false },
        { type: SortFilterKeys.ByPrice, descending: false, enabled: false }
    ]

    setFirstSearch = (bool: boolean) => {
        this.firstSearch = false
        setTimeout(() => {
            this.firstSearch = bool
            this.currentPrice = "0"
            this.nameFilter = ""
            this.filterHotels()
        }, 0);
    }
    setFilter = (filter: any) => {
        this.sortFilter = filter
    }

    setHotelsList = (hotels: Hotel[]) => {
        this.hotelsList = hotels
    }

    getHotelsfilteredByPrice = (currentPrice: string) => {
        this.filteredHotels = [...this.searchedHotels.filter((p) => p.price >= currentPrice.toString())]
        return this.filteredHotels
    }
    getHotelsfilteredByName = (subName: string) => {
        this.filteredHotels = [...this.filteredHotels.filter((p) => p.name.toLowerCase().includes(subName.toLowerCase()))]
        return this.filteredHotels
    }
    fitlerHotelsByDates = (from: Date, to: Date) => {

        this.searchedHotels = [];
        this.filteredHotels = [];
        this.numOfNights = moment(to).diff(from, 'days')
        this.searchedHotels = [...copyObjectData(this.hotelsList).filter((hotel: Hotel) => {
            return moment(hotel.available_on).isBetween(from.getTime(), to.getTime(), 'day', '[]')
        })]
        this.filteredHotels = this.searchedHotels.map(hotel => {
            return {
                ...hotel,
                price: hotel.price = (parseInt(hotel.price) * this.numOfNights).toString()
            }

        })
        if (this.filteredHotels.length) {
            this.lowerPriceLimit = parseInt(this.filteredHotels.slice().sort((a, b) => parseInt(a.price) - parseInt(b.price))[0].price)
            this.upperPriceLimit = parseInt(this.filteredHotels.slice().sort((a, b) => parseInt(b.price) - parseInt(a.price))[0].price)
            this.filterHotels()
        }
        else
            store.setEmptyListStatus(EmptyListStatus.EmptyFilter)



    }
    sortHotelsByName = () => {
        if (!this.sortFilter[0].descending) {
            this.filteredHotels.sort((a: Hotel, b: Hotel) => {
                if (b.name > a.name) {
                    return 1;
                }
                if (b.name < a.name) {
                    return -1;
                }
                return 0
            })
        }

        else {
            this.filteredHotels.sort((a: Hotel, b: Hotel) => {
                if (b.name > a.name) {
                    return -1;
                }
                if (b.name < a.name) {
                    return 1;
                }
                return 0
            })
        }

    }
    sortHotelsByPrice = () => {
        console.log(this.sortFilter[1], "this.sortFilter[1]");
        if (!this.sortFilter[1].descending) {
            this.filteredHotels.sort((a: Hotel, b: Hotel) => {
                if (b.price > a.price) {
                    return 1;
                }
                if (b.price < a.price) {
                    return -1;
                }
                return 0
            })
        }

        else {
            this.filteredHotels.sort((a: Hotel, b: Hotel) => {
                if (b.price > a.price) {
                    return -1;
                }
                if (b.price < a.price) {
                    return 1;
                }
                return 0
            })
        }

    }

    setSortFilter = (action: string) => {
        let defaultFilter = [...this.sortFilter]
        defaultFilter = [...defaultFilter.map(filter => {
            return { ...filter, enabled: false }
        })]
        console.log(action, "Reducer");
        switch (action) {
            case SortFilterKeys.ByName:
                defaultFilter[0].enabled = true
                defaultFilter[0].descending = !defaultFilter[0].descending
                console.log(defaultFilter);
                this.sortFilter = [...defaultFilter]
                break;
            case SortFilterKeys.ByPrice:
                defaultFilter[1].enabled = true
                defaultFilter[1].descending = !defaultFilter[1].descending
                console.log(defaultFilter);
                this.sortFilter = [...defaultFilter]
                break;
        }
    }

    filterHotels = () => {
        console.log(this.sortFilter);
        this.getHotelsfilteredByPrice(store.currentPrice)
        this.getHotelsfilteredByName(store.nameFilter)

        if (this.sortFilter[0].enabled) {
            this.sortHotelsByName()
        }

        if (this.sortFilter[1].enabled) {
            this.sortHotelsByPrice()
        }


        if (this.filterHotels.length == 0)
            store.setEmptyListStatus(EmptyListStatus.EmptyFilter)
    }
    getPriceFilterLimits() {
        return {
            upper: this.upperPriceLimit,
            lower: this.lowerPriceLimit,
        }
    }

    setEmptyListStatus = (status: EmptyListStatus) => {
        this.emptyListStatus = status
    }

    constructor() {

        fetchInitialStoreState()
        makeAutoObservable(this)
    }

}
export async function fetchInitialStoreState() {
    try {
        let da = await fetch('https://run.mocky.io/v3/48244d7b-52e9-4b5f-b122-bd763e53fa5c') // make a wrong api call to see the error boundry
        let data = await da.text()
        const convertToArray = data.split("\n");
        convertToArray.splice(convertToArray.length - 2, 2);
        const joinArr = convertToArray.join("\n");
        const result = joinArr + "}]";
        store.hotelsList = [...(JSON.parse(result))]
        return {};
    } catch (error) {
        console.log("Network");
        store.hasError = true
    }
}
const store = new Store();
export default store;