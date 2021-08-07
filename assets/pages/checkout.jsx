import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  CheckoutStateContext,
  CheckoutDispatchContext,
  CHECKOUT_STEPS,
  setCheckoutStep,
  saveShippingAddress,
} from "../contexts/checkout";
import { CartStateContext } from "../contexts/cart";
import {
  AuthStateContext,
  AuthDispatchContext,
  signOut,
} from "../contexts/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "../components/core/form-controls/Input";
import { phoneRegExp } from "../constants/common";

const LoginStep = () => {
  const history = useHistory();
  const { user, isLoggedIn } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const handleContinueShopping = () => {
    history.push("/");
  };
  const handleLoginAsDiffUser = () => {
    signOut(authDispatch);
    history.push("/auth");
  };
  const handleGotoLogin = () => {
    history.push("/auth");
  };
  const handleProceed = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  return (
    <div className="detail-container">
      <div className="actions">
        <button className="outline" onClick={() => handleContinueShopping()}>
          <i className="rsc-icon-arrow_back" /> Continue Shopping
        </button>
        <button disabled={!isLoggedIn} onClick={() => handleProceed()}>
          Proceed
          <i className="rsc-icon-arrow_forward" />
        </button>
      </div>
    </div>
  );
};

const AddressStep = () => {
  const checkoutDispatch = useContext(CheckoutDispatchContext);

  const handleBackToLogin = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.AUTH);
  };
  const handleSaveAddress = (addressData) => {
    saveShippingAddress(checkoutDispatch, addressData);
  };
  return (
    <div className="detail-container">
      <h2>Shipping Address</h2>
      <Formik>
        {() => (
          <Form>
            <div className="field-group">
              <Field
                name="fullName"
                type="text"
                placeholder="Full Name"
                component={Input}
              />
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                component={Input}
              />
            </div>
            <Field
              name="addressLine"
              type="text"
              placeholder="Door No. & Street"
              component={Input}
            />
            <div className="field-group">
              <Field
                name="city"
                type="text"
                placeholder="City"
                component={Input}
              />
              <Field
                name="state"
                type="text"
                placeholder="State"
                component={Input}
              />
            </div>
            <div className="field-group">
              <Field
                name="code"
                type="text"
                placeholder="ZIP/Postal Code"
                component={Input}
              />
              <Field
                name="country"
                type="text"
                placeholder="Country"
                component={Input}
              />
            </div>
            <div className="actions">
              <button
                type="button"
                className="outline"
                onClick={() => handleBackToLogin()}
              >
                <i className="rsc-icon-arrow_back" /> Login in as Different User
              </button>
              <button type="submit">
                Save Address
                <i className="rsc-icon-arrow_forward" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const PaymentStep = () => {
  const { shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const handleBackToAddress = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  const handlePayment = () => {};
  return (
    <div className="detail-container">
      <h2>Payment</h2>
      {/* <div>
        <pre>{JSON.stringify(shippingAddress, null, 0)}</pre>
      </div> */}
      <div className="actions">
        <button
          type="button"
          className="outline"
          onClick={() => handleBackToAddress()}
        >
          <i className="rsc-icon-arrow_back" /> Back to Shipping Details
        </button>
        <button disabled={!shippingAddress} onClick={() => handlePayment()}>
          Save Address
          <i className="rsc-icon-arrow_forward" />
        </button>
      </div>
    </div>
  );
};

const Checkout = () => {
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupen] = useState("");

  const { items = [] } = useContext(CartStateContext);
  const { isLoggedIn } = useContext(AuthStateContext);
  const { step, shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const totalItems = items.length;

  const cartTotal = items
    .map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0);

  let childrenBooksCount = 0;
  let childrenBooksTotal = 0;

  let fictionBooksCount = 0;
  let fictionBooksTotal = 0;

  let discountBill = 0;

  const couponEnter = "123";

  const doubled = items.map((item) => {
    if (item.category == 1) {
      childrenBooksCount = childrenBooksCount + item.quantity;
      childrenBooksTotal = childrenBooksTotal + item.price * item.quantity;
    }

    if (item.category == 2) {
      fictionBooksCount = fictionBooksCount + item.quantity;
      fictionBooksTotal = fictionBooksTotal + item.price * item.quantity;
    }
  });

  if (childrenBooksCount >= 5) {
    const childrenBooksTotalNew =
      childrenBooksTotal - (childrenBooksTotal * 10) / 100;
    discountBill = childrenBooksTotal - childrenBooksTotalNew;
  }

  if (childrenBooksCount >= 10 || fictionBooksCount >= 10) {
    discountBill = discountBill + (cartTotal - (cartTotal * 5) / 100);
  }

  const handleClickTimeline = (nextStep) => {
    setCheckoutStep(checkoutDispatch, nextStep);
  };

  const handleChange = (event) => {
    if (event.target.value == couponEnter) {
      const coupenDis = (cartTotal * 15) / 100;
      setDiscount(coupenDis);
    } else {
      setDiscount(discountBill);
    }
    setCoupen(event.target.value);
  };

  useEffect(() => {
    setDiscount(discountBill);
  }, []);

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="order-details">
          <ul className="timeline">
            <li
              className={classNames({
                done: isLoggedIn,
                active: step === CHECKOUT_STEPS.AUTH,
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.AUTH)}
            >
              <h2>Sign In</h2>
              <i className="rsc-icon-check_circle" />
            </li>
            <li
              className={classNames({
                done: shippingAddress !== null,
                active: step === CHECKOUT_STEPS.SHIPPING,
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.SHIPPING)}
            >
              <h2>Shipping</h2>
              <i className="rsc-icon-check_circle" />
            </li>
            <li
              className={classNames({
                done: false,
                active: step === CHECKOUT_STEPS.PAYMENT,
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.PAYMENT)}
            >
              <h2>Payment</h2>
              <i className="rsc-icon-check_circle" />
            </li>
          </ul>
          {step === CHECKOUT_STEPS.AUTH && <LoginStep />}
        </div>
        <div className="order-summary">
          <h2>
            Summary
            <span>{` (${totalItems}) Items`}</span>
          </h2>
          <ul className="cart-items">
            {items.map((product) => {
              return (
                <li className="cart-item" key={product.name}>
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{product.price.toFixed(2)}</p>
                  </div>
                  <div className="product-total">
                    <p className="quantity">
                      {`${product.quantity} ${
                        product.quantity > 1 ? "Nos." : "No."
                      }`}
                    </p>
                    <p className="amount">
                      {(product.quantity * product.price).toFixed(2)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <form>
            <ul className="total-breakup">
              <li>
                <p>Subtotal</p>
                <p>{cartTotal.toFixed(2)}</p>
              </li>
              <li>
                <p>Coupon </p>
                <p>
                  <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={coupon}
                    name="coupon"
                  />
                </p>
              </li>

              <li>
                <p>Discount</p>
                <p>{discount.toFixed(2)}</p>
              </li>

              <li>
                <h2>Total</h2>
                <h2>{(cartTotal - discount).toFixed(2)}</h2>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
