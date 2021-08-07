import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import CommonProvider from "./contexts/common";
import ProductsProvider from "./contexts/products";
import CartProvider from "./contexts/cart";
import CheckoutProvider from "./contexts/checkout";
import RouteWrapper from "./layouts/RouteWrapper";
import AuthLayout from "./layouts/AuthLayout";
import CommonLayout from "./layouts/CommonLayout";
import AuthPage from "./pages/auth";
import HomePage from "./pages/home";
import ProductPage from "./pages/products";

import CheckoutPage from "./pages/checkout";
import "./assets/scss/style.scss";
import CategoriesProvider from "./contexts/categories";
import Products from "./pages/products";

const Index = () => {
  return (
    <AuthProvider>
      <CommonProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <CartProvider>
              <CheckoutProvider>
                <Router>
                  <Switch>
                    <RouteWrapper
                      path="/"
                      exact
                      component={HomePage}
                      layout={CommonLayout}
                    />
                    <RouteWrapper
                      path="/product/:cateId"
                      exact
                      component={ProductPage}
                      layout={CommonLayout}
                    />
                    <RouteWrapper
                      path="/checkout"
                      component={CheckoutPage}
                      layout={CommonLayout}
                    />
                    <RouteWrapper
                      path="/auth"
                      component={AuthPage}
                      layout={AuthLayout}
                    />
                  </Switch>
                </Router>
              </CheckoutProvider>
            </CartProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </CommonProvider>
    </AuthProvider>
  );
};

export default Index;
