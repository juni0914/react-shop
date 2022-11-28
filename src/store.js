import { configureStore, createSlice} from '@reduxjs/toolkit'


let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20}
})



let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let cart = createSlice({
    name : 'cart',
    initialState : [
      {id : 0, name : 'White and Black', count : 2},
      {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
      addCount(state, action){
        let cnt = state.findIndex((a)=>{ return a.id === action.payload })
        state[cnt].count++
      },
      addItem(state, action){
        state.push(action.payload)
      }
    }
  }) 

export let { changeName, addCount, addItem } = cart.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
   }
}) 