import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import db from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import "./PlansScreen.css";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);

  //To access the customers
  useEffect(() => {
    const q = query(collection(db, "customers", user.uid, "subscriptions"));

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_start:
            subscription.data().current_period_start.seconds,
          current_period_end: subscription.data().current_period_end.seconds,
        });
      });
    });
  }, [user.uid]);

  //To access the products
  useEffect(() => {
    const db = getFirestore();

    const q = query(collection(db, "products"), where("active", "==", true));
    const unsub = onSnapshot(q, async (querySnapshot) => {
      const products = {};
      for (const productDoc of querySnapshot.docs) {
        products[productDoc.id] = productDoc.data();

        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        for (const price of priceSnap.docs) {
          products[productDoc.id].price = {
            priceId: price.id,
            priceData: price.data(),
          };
        }
      }
      setProducts(products);
    });
  }, []);

  //Function for checkout to payment gateway(stripe)
  const loadCheckout = async (productId, priceId) => {
    setLoading(true);
    setLoadingProductId(productId); // Set the loading state for this product

    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occurred: ${error.message}`);
        setLoading(false);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51MYuHVSAw3OFK8Q62tYv3WaXkjBPLaUTepXiCjO9jQFttktbIWWVi0QPZdgTGY1BxXYiLLjyerlXmeWEr4HBtkzM00IoE3wcvS"
        );
        stripe.redirectToCheckout({ sessionId });
      }
      setLoadingProductId(null); // Reset the loading state for this product
    });
  };

  return (
    <div className="plansScreen">
      {subscription && (
        <p className="plansScreen__renewal">
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        const isLoading = loadingProductId === productId; // Check if this button is loading

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>

              <h6>{productData.description}</h6>
            </div>

            {/* Right side of the screen => button for plans subs */}

            {/* IF NOT CURRENT PACKAGE SUBSCRIBED THEN ONLY THE BUTTON WILL TRIGGER THE FUNCTION */}
            <button
              onClick={() =>
                !isCurrentPackage &&
                loadCheckout(productId, productData.price.priceId)
              }
            >
              {isLoading ? (<AiOutlineLoading3Quarters className="plansScreen__loading" />) : isCurrentPackage ? ("Current Plan") : ("Subscribe")}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
