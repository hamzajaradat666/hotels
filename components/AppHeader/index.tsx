import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { observer } from "mobx-react";
import store from "../../store/store";
import { EmptyListStatus } from "../../enums/EmptyListStatus";
const AppHeader = observer((props: any) => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const onChangeFromDate = (date: Date) => {
        console.log(moment(date).format("YYYY-MM-DD"));
        setFromDate(date)
    }
    const onChangeToDate = (date: Date) => {
        console.log(moment(date).format("YYYY-MM-DD"));
        setToDate(date)
    }
    const searchHotelsByDates = () => {
        store.setEmptyListStatus(EmptyListStatus.Fetching)
        store.fitlerHotelsByDates(fromDate, toDate)
    }
    return (
        <React.Fragment>
            <div className="border-2 border-gray-500 rounded w-full">
                <div className="text-center bg-gray-500 w-full text-white p-4">Search Hotels</div>
                <div className="grid xs:grid-cols-1 sm:grid-cols-3 p-5 w-full">
                    <div className="flex items-center mb-2">
                        <span className="mr-2 w-14">From</span>
                        <DatePicker input-placeholder="" id="fromDate" className="p-2 border-2 border-gray-500 rounded w-11/12" selected={fromDate} onChange={onChangeFromDate} />
                    </div>
                    <div className="flex items-center mb-2" >
                        <span className="mr-2 w-14">To</span>
                        <DatePicker input-placeholder="" id="toDate" className="p-2 border-2 border-gray-500 rounded w-11/12" selected={toDate} onChange={onChangeToDate} />
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div>
                            <button id="search" onClick={() => { searchHotelsByDates() }} className="p-2 border-2 border-gray-500 rounded w-full">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            {props.children}
        </React.Fragment>
    )
})
export default AppHeader;