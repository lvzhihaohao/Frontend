import {data} from '../data/wallet.json'
export const FETCH_wallet_INFO = 'FETCH_wallet_INFO'
export const getAllwalletInfo = () => {
    return (dispatch) => {
      dispatch({
        type: "FETCH_wallet_INFO",
        payload: data
      })
    }
}