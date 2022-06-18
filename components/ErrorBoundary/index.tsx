import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import store from "../../store/store";

const ErrorBoundary = observer((props: any) => {
    let hasError = store.hasError
    return (
        <>
            {
                hasError ? <div className="w-full h-screen fadeIn">
                    <div className="flex bg-red-300 justify-center items-center text-center">
                          Something went wrong. Try again in a few minutes
                    </div>
                </div> : props.children
            }
        </>
    )
})
export default ErrorBoundary;