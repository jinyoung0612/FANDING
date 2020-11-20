import firebase from "firebase/app";

export const paymentInput = (Input) => {
  const firestore = firebase.firestore();
  //   const user = firebase.auth().currentUser.email;

  return (dispatch, getState) => {
    firestore.collection("payments").doc().set({
      product_name: Input.product_name,
      product_amount: Input.product_amount,
      buyer_email: Input.buyer_email,
      buyer_name: Input.buyer_name,
      buyer_tel: Input.buyer_tel,
      buyer_addr: Input.buyer_addr,
      buyer_postcode: Input.buyer_postcode,
    });
  };
};
