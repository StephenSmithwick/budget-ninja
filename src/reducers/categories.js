const initialState = [
  {slug: 'groceries',  icon: 'Cart',    name: "Groceries"},
  {slug: 'luxories',   icon: 'Watch',   name: "Luxory",     parent_slug: 'groceries'},
  {slug: 'essentials', icon: 'Explore', name: "Essentials", parent_slug: 'groceries' }
]

export default function categories(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}
