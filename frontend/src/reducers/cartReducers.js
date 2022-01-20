import { CART_ADD_ITEM,CART_REMOVE_ITEM,CART_REMOVE_ITEMS} from "../constants/cartConstants"

export const cartReducer=(state={cartItems:[]},action)=>{
    switch(action.type){
        case CART_REMOVE_ITEM:
            return {...state,cartItems:state.cartItems.filter(x=>x.product!==action.payload)}
        case CART_REMOVE_ITEMS:
            return {...state,cartItems:[]}
        case CART_ADD_ITEM:
            const item=action.payload

            const itemExists=state.cartItems.find((x1) => x1.product===item.product)
            if(itemExists){
                return{
                    ...state,
                    cartItems:state.cartItems.map((x2)=>x2.product===itemExists.product?item:x2)
                }
            }
            else{
                return {...state,cartItems:[...state.cartItems,
                item]}
            }
        default:
            return state
    }
}