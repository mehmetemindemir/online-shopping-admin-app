import React, {Component} from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import {connect} from "react-redux";
import * as actions from './store/actions/index'
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";

const asyncAuth=asyncComponent(()=>{
    return import('./containers/Auth/Auth')
});
const asyncDashboard=asyncComponent(()=>{
    return import('./containers/Dashboard/Dashboard')
});

class App extends Component{
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes=(
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Redirect to="/auth" />
            </Switch>
        );
        if(this.props.isAuthenticated){
            routes=(
                <Layout>
                    <Switch>
                        <Route path="/app/dashboard" exact component={asyncDashboard} />
                        <Route path="/logout"  component={Logout} />
                        <Redirect to="/app/dashboard" />
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
        onTryAutoSignup: () => dispatch( actions.authCheckState() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );


