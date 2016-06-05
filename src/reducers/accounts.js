const initialState = {
  hsbc_uk:    {slug: 'hsbc_uk',    name: "HSBC UK",    balance: 200,  currency: 'GBP'},
  hsbc_au:    {slug: 'hsbc_au',    name: "HSBC AU",    balance: 1000, currency: 'AUD'},
  wellsfargo: {slug: 'wellsfargo', name: "Wellsfargo", balance: 500,  currency: 'USD'}
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}
