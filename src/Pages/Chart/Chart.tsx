import { CustomersContext } from '@/Context/CustomersContext';
import { ICustomersTransactionsData } from '@/InterFaces';
import { Loader } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const Chart = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //@ts-ignore
  let { customersTransactionsData } = useContext(CustomersContext);
  useEffect(() => {

    getTransactionDetails()

  }, [])

  const [customerDetails, setCustomerDetails] = useState()
  const getTransactionDetails = async () => {
    setIsLoading(true)
    const details = await customersTransactionsData()
    setIsLoading(false)
    const moreDetails = details?.filter((customer: ICustomersTransactionsData) => customer.customer_id == state.id)
    const chartData = moreDetails?.map((item: ICustomersTransactionsData) => {
      const { id, customer_id, ...rest } = item;
      return rest;
    })
    setCustomerDetails(chartData)
  }



  return <>
    <main className="h-screen  bg-gradient-to-tr from-slate-600 via-slate-700 to-slate-800 flex flex-col space-y-10 items-center justify-center">
      <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
        {state?.name} Transactions
      </h2>
      {isLoading ? <div className="bg-white w-full md:w-4/6 h-80 flex items-center justify-center rounded-lg"><Loader className="text-slate-700 animate-spin size-40" /></div> :
        <div className=' flex items-center justify-center w-full md:w-4/6 bg-white rounded-lg'>
          <ResponsiveContainer width="99%" height={400}>
            <BarChart
              data={customerDetails}
              barSize={15}
              margin={{
                top: 50,
                right: 30,
                left: 30,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" scale="point" padding={{ left: 100, right: 100 }} />
              <YAxis />
              <Tooltip contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
                labelStyle={{ display: "none" }}
                cursor={{ fill: "none" }} />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="amount" fill="#8884d8" background={{ fill: '#eee' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>}
      <button onClick={() => navigate('/')} className='bg-[#8884d8] px-5 py-1.5 rounded-md font-bold tracking-wider text-white'> Back </button>
    </main>
  </>
}

export default Chart