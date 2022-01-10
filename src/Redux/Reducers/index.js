const initialState = {
  account: "",
  username: "",
  // isSwapDisabled: true,
  isSwapDisabled: {
    condition: true,
    SwapSymbol: "HTZ",
    visible: true,
  },
  htZbalance: 0,
  tradeValue: 0,
  contract: null,
  htzContract: null,
  htzSwapContract: null,
  isSufficientBalance: true,
  is2FAvisable: false,
  isTransaction: false,
  transcations: null,
  isClaimReward: false,
  isClaimRewardVisible: true,
  isTradeDisabled: true,
  isApproved: {
    isVisible: false,
    condition: false,
    success: false,
    isApprovedSwap: false,
    isClaim: false,
    isClaimVisible: false,
  },
  isSwapCurrerncyDisabled: false,
  metamaskBalance: 0,
  TradeSymbol: {
    from: "HTZ",
    to: "HTZ BEP20",
  },
  isContractSwap: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Get Account details of user
    case "GET_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
        htZbalance: action.payload.balance,
        // htZbalance: 123,
      };
    case "METAMASK_BALANCE":
      return {
        ...state,
        metamaskBalance: action.payload,
      };
    // Set Trade Value
    case "SET_TRADE_FROM_TO":
      return { ...state, tradeValue: action.payload };

    // Set Swap condition
    case "SET_SWAP":
      return {
        ...state,
        isSwapDisabled: {
          ...state.isSwapDisabled,
          condition: action.payload,
        },
      };

    //Set Contract Value
    case "SET_CONTRACT":
      return {
        ...state,
        contract: action.payload.contract,
        htzContract: action.payload.htzContract,
        metamaskBalance: action.payload.metamaskBalance,
        htzSwapContract: action.payload.htzSwapContract,
      };

    //Transfer Token
    case "TRANSFER_TOKEN":
      return {
        ...state,
        contract: action.payload,
      };

    case "GET_SUFFICIENT_BALANCE":
      return {
        ...state,
        isSufficientBalance: action.payload,
      };
    case "GET_LOGIN_DETAILS":
      return {
        ...state,
        username: action.payload.username,
        is2FAvisable: action.payload.is2FAvisable,
        isTradeDisabled: action.payload.isTradeDisabled,
      };
    case "TRANSFER_FROM_TO":
      return {
        ...state,
        isTransaction: action.payload.isTransaction,
        isTradeDisabled: action.payload.isTradeDisabled,
        isSwapDisabled: {
          ...state.isSwapDisabled,
          condition: action.payload.isSwapDisabled,
          visible: action.payload.isSwapDisabled_visible,
        },
        isClaimReward: action.payload.isClaimReward,
        isSwapCurrerncyDisabled: action.payload.isSwapCurrerncyDisabled,
      };
    case "CLAIM_HERTZ":
      return {
        ...state,
        isClaimReward: action.payload.isClaimReward,
        tradeValue: action.payload.tradeValue,
        isTradeDisabled: action.payload.isTradeDisabled,
        isSwapCurrerncyDisabled: action.payload.isSwapCurrerncyDisabled,
        isSwapDisabled: {
          ...state.isSwapDisabled,
          visible: action.payload.isSwapDisabled_visible,
        },
      };
    case "SWAP_CURRENCY":
      return {
        ...state,
        TradeSymbol: {
          from: action.payload.from,
          to: action.payload.to,
        },
        isSwapDisabled: {
          ...state.isSwapDisabled,
          visible: state.TradeSymbol.from !== "HTZ" ? true : false,
          isClaimRewardVisible: !state.isClaimRewardVisible,
        },

        isApproved: {
          ...state.isApproved,
          isVisible: state.TradeSymbol.from === "HTZ" ? true : false,
        },
      };
    case "APPROVE_CONTRACT":
      return {
        ...state,
        isApproved: {
          ...state.isApproved,
          isVisible: action.payload.isVisible,
          condition: action.payload.condition,
        },
      };

    case "APPROVE_CHECK":
      return {
        ...state,
        isApproved: {
          ...state.isApproved,
          success: action.payload.success,
          condition: action.payload.condition,
          isApprovedSwap: action.payload.isApprovedSwap,
        },
        isSwapCurrerncyDisabled: action.payload.isSwapCurrerncyDisabled,
      };

    case "APPROVE_CONDITION":
      return {
        ...state,
        isApproved: {
          ...state.isApproved,
          condition: action.payload,
        },
      };
    case "HERTZ_SWAP":
      return {
        ...state,
        isApproved: {
          ...state.isApproved,
          success: action.payload.success,
          isClaim: action.payload.isClaim,
          isClaimVisible: action.payload.isClaimVisible,
        },
        isTradeDisabled: action.payload.isTradeDisabled,
      };
    case "SWAP_CLAIM_HERTZ":
      return {
        ...state,
        isApproved: {
          ...state.isApproved,
          isClaim: action.payload.isClaim,
          isApprovedSwap: action.payload.isApprovedSwap,
          isClaimVisible: action.payload.isClaimVisible,
        },
        isSwapCurrerncyDisabled: action.payload.isSwapCurrerncyDisabled,
        tradeValue: action.payload.tradeValue,
        isTradeDisabled: action.payload.isTradeDisabled,
      };
    default:
      return state;
  }
};
