
export interface ICustomersData {
  id: number,
  name: string
}

export interface ICustomersDetails extends ICustomersData {
  transactionsCount: number;
  totalAmount: number
}

export interface ICustomersTransactionsData {
  id: number,
  customer_id: number,
  date: string,
  amount: number
}

export interface ICustomersResponse {
  customers: ICustomersData[];
  transactions: ICustomersTransactionsData[];
}