const initState = {
  paymentError: null,
};
const paymentReducer = (state = initState, action) => {
  switch (action.type) {
    case "PAYMENT_ERROR":
      console.log("payment error");
      return {
        ...state,
        paymentError: "Payment failed",
      };

    case "PAYMENT_SUCCESS":
      console.log("payment success");
      return {
        ...state,
        paymentError: null,
      };
    default:
      return state;
  }
};

export default paymentReducer;
