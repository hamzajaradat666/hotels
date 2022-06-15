import { makeAutoObservable, makeObservable, observable } from "mobx";
import moment from "moment";
import { EmptyListStatus } from "../enums/EmptyListStatus";
import { Hotel } from "../models/HotelModel";

const copyObjectData = (objectData:object)=>{
    return JSON.parse(JSON.stringify(objectData))
}

class Store {
    hotelsList: Hotel[] = [];
    searchedHotels: Hotel[] = [];
    filteredHotels: Hotel[] = [];
    lowerPriceLimit: number = 0;
    upperPriceLimit: number = 0;
    nameFilter: string = "";
    currentPrice: string = "";
    emptyListStatus:EmptyListStatus = EmptyListStatus.NoSearch 
    numOfNights:number = 0
    isSortedAscByName:boolean = true
    isSortedAscByPrice:boolean = true
    sortFilter:any = [
        { type: "nameFilter", asc: false, enabled: false },
        { type: "priceFilter", asc: false, enabled: false }
      ]


    setFilter = (filter:any) => {
        this.sortFilter = filter
    }

    getHotelsfilteredByPrice = (currentPrice: string) => {
        this.filteredHotels = [...this.searchedHotels.filter((p) => p.price >= currentPrice.toString())] 
        return this.filteredHotels
    }
    getHotelsfilteredByName = (subName: string) => {
        this.filteredHotels = [...this.filteredHotels.filter((p) => p.name.toLowerCase().includes(subName.toLowerCase()))]
        return this.filteredHotels
    }
    fitlerHotelsByDates = (from:Date,to:Date) => {
        
        this.searchedHotels = [];
        this.filteredHotels = [];
        this.numOfNights = moment(to).diff(from, 'days') 
        this.searchedHotels = [...copyObjectData(this.hotelsList).filter((hotel:Hotel)=>{
            return moment(hotel.available_on).isBetween(from.getTime(),to.getTime(), 'day', '[]')             
        })]
        this.filteredHotels = this.searchedHotels.map(hotel=>{
            return {
                ...hotel,
                price:hotel.price = (parseInt(hotel.price)*this.numOfNights).toString()
            }
            
        })
        if(this.filteredHotels.length){
            this.lowerPriceLimit = parseInt(this.filteredHotels.slice().sort((a, b) => parseInt(a.price) - parseInt(b.price))[0].price)
            this.upperPriceLimit = parseInt(this.filteredHotels.slice().sort((a, b) => parseInt(b.price) - parseInt(a.price))[0].price)
            this.filterHotels()
        }
        else
        store.setEmptyListStatus(EmptyListStatus.EmptyFilter)
        
        

    }
    sortHotelsByName = () => {
        if(this.sortFilter[0].asc){
            this.filteredHotels.sort((a:Hotel,b:Hotel)=>{
                if (b.name > a.name) {
                    return 1;
                }
                if (b.name < a.name) {
                    return -1;
                }
                return 0
            })
        }
        
        else{
            this.filteredHotels.sort((a:Hotel,b:Hotel)=>{
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
        if(this.sortFilter[1].asc){
            this.filteredHotels.sort((a:Hotel,b:Hotel)=>{
                if (b.price > a.price) {
                    return 1;
                }
                if (b.price < a.price) {
                    return -1;
                }
                return 0
            })
        }
        
        else{
            this.filteredHotels.sort((a:Hotel,b:Hotel)=>{
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
    filterHotels = () => {

        this.getHotelsfilteredByPrice(store.currentPrice)
        this.getHotelsfilteredByName(store.nameFilter)

        if(!this.sortFilter[0].enabled)
        this.sortHotelsByName()
        if(!this.sortFilter[1].enabled)
        this.sortHotelsByPrice()
        
        if(this.filterHotels.length == 0)
        store.setEmptyListStatus(EmptyListStatus.EmptyFilter)
    }
    getPriceFilterLimits() {
        return {
            upper: this.upperPriceLimit,
            lower: this.lowerPriceLimit,
        }
    }

    setEmptyListStatus = (status:EmptyListStatus)=>{
        this.emptyListStatus = status
    }
   
    constructor() {

        fetchInitialStoreState()
        makeAutoObservable(this);

    }

}
export async function fetchInitialStoreState() {
    let da = await fetch('https://run.mocky.io/v3/48244d7b-52e9-4b5f-b122-bd763e53fa5c')
    let data = await da.text()
    const convertToArray = data.split("\n");
    convertToArray.splice(convertToArray.length - 2, 2);
    const joinArr = convertToArray.join("\n");
    const result = joinArr + "}]";
    store.hotelsList = [...(JSON.parse(result))]
    return {};
}
const store = new Store();
export default store;