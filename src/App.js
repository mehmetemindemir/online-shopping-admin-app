import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import {connect} from "react-redux";
import * as actions from './store/actions/index'
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth')
});
const asyncDashboard = asyncComponent(() => {
    return import('./containers/Dashboard/Dashboard')
});
const asyncMenu = asyncComponent(() => {
    return import('./containers/Menu/Menu');
});
const asyncBrand = asyncComponent(() => {
    return import('./containers/Brand/Brand');
});
const asyncProduct = asyncComponent(() => {
    return import('./containers/Product/Product')
})

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" component={asyncAuth}/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Layout>
                    <Switch>
                        <Route path="/app/dashboard" component={asyncDashboard}/>
                        <Route path="/app/menu" component={asyncMenu}/>
                        <Route path="/app/brand" component={asyncBrand}/>
                        <Route path="/app/product" component={asyncProduct}/>
                        <Route path="/logout" component={Logout}/>
                    </Switch>
                </Layout>
            );
        }
        return (
            <div>
                {routes}
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


