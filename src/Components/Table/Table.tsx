
import { CustomersContext } from "@/Context/CustomersContext";
import { ICustomersData, ICustomersDetails, ICustomersTransactionsData } from "@/InterFaces";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart4, Loader } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Table = () => {

  const navigate = useNavigate()
  const [customersTableDetails, setCustomersTableDetails] = useState<(ICustomersDetails)[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<(ICustomersDetails)[]>([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerAmount, setCustomerAmount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // @ts-ignore
  let { customersData, customersTransactionsData } = useContext(CustomersContext);

  useEffect(() => {
    customersDetails();
  }, []);

  const customersDetails = async () => {
    setIsLoading(true)
    const [customers, transactions] = await Promise.all([

      customersData(),
      customersTransactionsData(),

    ]).finally(() => setIsLoading(false));

    if (customers && transactions) {
      const customersWithTransactions = customers?.map((customer: ICustomersData) => {
        const customerTransactions = transactions?.filter((transaction: ICustomersTransactionsData) =>
          transaction?.customer_id == customer?.id
        );

        const transactionsCount = customerTransactions.length;

        const totalAmount = customerTransactions.reduce(
          (sum: number, transaction: ICustomersTransactionsData) => sum + transaction.amount, 0)
        return { ...customer, transactionsCount, totalAmount };
      }
      );
      setCustomersTableDetails(customersWithTransactions);
      setFilteredCustomers(customersWithTransactions);
    }
  }


  const handleSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value)
  }

  const handleSearchByAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerAmount(parseInt(e.target.value))
  }


  useEffect(() => {
    if (customerName) {
      const filteredByName = customersTableDetails?.filter((customer) => customer.name.toLowerCase().includes(customerName.toLowerCase()))
      setFilteredCustomers(filteredByName)
      return;
    } else {
      setFilteredCustomers(customersTableDetails)
    }

    if (customerAmount) {
      const filteredByAmount = customersTableDetails?.filter((customer) => customer.totalAmount == customerAmount)
      setFilteredCustomers(filteredByAmount)
      return;
    } else {
      setFilteredCustomers(customersTableDetails)
    }
  }, [customerName, customersTableDetails, customerAmount])


  const handelCustomerTransactions = ({ id, name }: ICustomersData) => {
    navigate(`user/${id}`, { state: { id, name } })
  }

  return (
    <>
      <section className="container flex flex-col items-center justify-center h-full gap-4">
        <h1 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
          Customer transactions
        </h1>

        <div className="flex flex-col md:flex-row justify-center px-4 space-x-0 w-full md:space-x-4 [&_input]:mt-2 [&_input]:py-1 [&_input]:pl-3 [&_input]:border-2 [&_input]:border-white [&_input]:rounded-md [&_input]:outline-none">
          <input className=" focus-within:border-green-500 focus-within: focus-within:ring-1 focus-within:ring-green-500"
            type="search" onChange={handleSearchByName} value={customerName} placeholder=" Search By Name..." />
          <input className=" focus-within:border-green-500 focus-within: focus-within:ring-1 focus-within:ring-green-500"
            type="number" onChange={handleSearchByAmount} value={customerAmount} placeholder=" Search By Amount..." />
        </div>
        <div className="  rounded-lg shadow-lg mx-4 w-full ">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100  [&_th]:text-sm [&_th]:sm:text-lg [&_th]:uppercase [&_th]:w-1/4 [&_th]:px-4  [&_th]:py-4 [&_th]:font-bold [&_th]:text-center [&_th]:text-gray-600">
                <th >Id </th>
                <th >Name </th>
                <th className="hidden" >transactions Count </th>
                <th >Total amount </th>
                <th >More Details </th>
              </tr>
            </thead>


            <tbody className="bg-white w-full ">
              {isLoading ? <div className="bg-white w-[400%] h-80 flex items-center justify-center"><Loader className=" text-slate-700 animate-spin size-40" /></div> :
                <AnimatePresence initial={false} >
                  {filteredCustomers?.map(
                    ({ id, name, totalAmount, transactionsCount }: ICustomersDetails, index: number) => (
                      <motion.tr key={id} className="[&_td]:text-sm  [&_td]:sm:text-lg  [&_td]:px-4 [&_td]:py-4 [&_td]:border-b-2 [&_td]:text-center [&_td]:border-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ layout: { type: "spring" } }}
                        layout>
                        <td>{index + 1}</td>
                        <td>{name} </td>
                        <td className="hidden">{transactionsCount} </td>
                        <td>{totalAmount} </td>
                        <td><button onClick={() => handelCustomerTransactions({ id, name })}><BarChart4 className="size-6 shrink-0 text-green-600" /> </button></td>
                      </motion.tr>
                    )
                  )}
                </AnimatePresence>

              }
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Table;
