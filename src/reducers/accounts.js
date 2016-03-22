const initialState = [
  {id: 1, name: "HSBC UK",    balance: 200,  currency: 'GBP'},
  {id: 2, name: "HSBC AU",    balance: 1000, currency: 'AUD'},
  {id: 3, name: "Wellsfargo", balance: 500,  currency: 'USD'}
]

export default function accounts(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}
