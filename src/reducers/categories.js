const initialState = [
  {id: 1, icon: 'Cart', name: "Groceries"},
  {id: 2, icon: 'Watch', name: "Luxory", parent_id: 1},
  {id: 3, icon: 'Explore', name: "Essentials", parent_id: 1 }
]

export default function categories(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}
