import { FETCH_wallet_INFO } from '../actions/wallet.actions'
let initailState = []
function walletInfo(state = initailState, action) {
  switch (action.type) { 
    case FETCH_wallet_INFO:
      return [
        ...state,
        ...action.payload
      ];
    default:
      return state;
  }
}

export default walletInfo;