import React, { useContext } from "react";
import AppService from "./AppService";

const service = new AppService()
const apiContext = React.createContext(service)

export const useAppService = () => {
    return useContext(apiContext)
}