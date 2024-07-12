import { ICustomersData, ICustomersTransactionsData } from "@/InterFaces";
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
      const response = await axios.get<ICustomersData[]>(`http://localhost:3000/customers`)
      return response?.data

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const customersTransactionsData = async (): Promise<ICustomersTransactionsData[]> => {
    try {
      const response = await axios.get<ICustomersTransactionsData[]>(`http://localhost:3000/transactions`)
      return response?.data

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