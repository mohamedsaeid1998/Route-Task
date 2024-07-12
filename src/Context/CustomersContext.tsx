import { ICustomersData, ICustomersResponse, ICustomersTransactionsData } from "@/InterFaces";
import axios from "axios";
import { createContext, ReactNode } from "react";

export interface ICustomersContext {
  customersData: () => Promise<ICustomersData[] | undefined>;
  customersTransactionsData: () => Promise<ICustomersTransactionsData[] | undefined>;

}

export const CustomersContext = createContext<ICustomersContext | ICustomersTransactionsData | undefined>(undefined);

const CustomersContextProvider = ({ children }: { children: ReactNode }) => {



  const customersData = async (): Promise<ICustomersData[]> => {
    try {
      
      const response = await axios.get<ICustomersResponse>(`https://cdn.dipdux.dev/json/00d0d514-e29f-458b-806a-06c4e789377ddb.json`)
      return response?.data?.customers 

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const customersTransactionsData = async (): Promise<ICustomersTransactionsData[]> => {
    try {

      const response = await axios.get<ICustomersResponse>(`https://cdn.dipdux.dev/json/00d0d514-e29f-458b-806a-06c4e789377ddb.json`)
      return response?.data?.transactions

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return <CustomersContext.Provider value={{ customersData, customersTransactionsData }}>
    {children}
  </CustomersContext.Provider>
}


export default CustomersContextProvider;