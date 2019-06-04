import "./App.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Main from "../src/views/Main";
import Products from "./views/Products";
import Categories from "./views/Categories";
import Category from "./views/Category";
import Navigation from "../src/components/Navigation";
import ProductsPages from "./views/ProductsPages";
import Cart from "./components/Cart";
import Checkout from "./views/Checkout";
import Dashboard from "./views/Dashboard";
import ProductEdit from "./views/ProductEdit";
import Footer from "./components/Footer";
import AdminProducts from "./views/AdminProducts";
import AdminProductsAdd from "./views/AdminProductsAdd";
import AdminUsersView from "./views/AdminUsersView";
import UserEdit from "./views/UserEdit";
import AdminNavigation from "./admin_components/AdminNavigation";
import Settings from "./views/Settings";
import Setting from "./views/Setting";
import Error from "./components/Error";
import ProductsPageGet from "./components/ProductsPageGet";

class App extends Component {
  constructor(props) {
    super(props);
    this.isAdmin = this.isAdmin.bind(this);

    this.state = {
      isAdmin: false,
      loggedIn: false,
      inCartTotal: 0
    };

    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];
  }

  componentDidMount = () => {
    for (let i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  };

  setTimeout = () => {
    this.warnTimeout = setTimeout(this.warn, 14 * 60 * 1000);

    this.logoutTimeout = setTimeout(this.autoLogOut, 15 * 60 * 1000);
  };

  resetTimeout = () => {
    this.clearTimeout();
    this.setTimeout();
  };

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  warn = () => {
    console.log(
      "You will be automatically logged out in 1 minute if you remain inactive."
    );
  };

  destroy = () => {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  };

  loggedIn = loggedIn => {
    this.setState({ loggedIn: loggedIn }, () => {
      console.log(this.state.loggedIn);
    });
  };

  autoLogOut = () => {
    localStorage.removeItem("jwtToken");
    this.setState({ currentUser: "", loggedIn: false, isAdmin: false }, () => {
      this.destroy();
    });
  };

  isAdmin(isAdmin) {
    this.setState({ isAdmin: isAdmin }, () => {
      console.log("logged in as admins");
    });
  }

  render() {
    return (
      <Router>
        <div>
          {this.state.isAdmin ? (
            <div>
              <Navigation
                isAdmin={this.isAdmin}
                loggedIn={this.loggedIn}
                autoLogOut={this.autoLogOut}
                logInStatus={this.state.loggedIn}
                inCartTotal={this.state.inCartTotal}
              />
              <AdminNavigation />
            </div>
          ) : (
            <Navigation
              isAdmin={this.isAdmin}
              loggedIn={this.loggedIn}
              autoLogOut={this.autoLogOut}
              logInStatus={this.state.loggedIn}
              inCartTotal={this.state.inCartTotal}
            />
          )}
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/products" component={Products} />
            <Route
              exact
              path="/products/:product"
              component={ProductsPageGet}
            />
            <Route exact path="/categories/" component={Categories} />
            <Route exact path="/categories/:category" component={Category} />
            <Route
              path="/categories/:category/:product"
              component={ProductsPageGet}
            />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            {this.state.loggedIn ? (
              <Route exact path="/settings" component={Settings} />
            ) : (
              <Route exact path="/settings" component={Error} />
            )}
            <Route exact path="/user/:setting/:id?" component={Setting} />
            {this.state.isAdmin ? (
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route
                  exact
                  path="/dashboard/products"
                  component={AdminProducts}
                />
                <Route
                  exact
                  path="/dashboard/products/add"
                  component={AdminProductsAdd}
                />

                <Route
                  path="/dashboard/products/:product"
                  component={ProductEdit}
                />
                <Route
                  exact
                  path="/dashboard/users"
                  component={AdminUsersView}
                />
                <Route path="/dashboard/users/:user" component={UserEdit} />
              </Switch>
            ) : (
              <Error />
            )}
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
