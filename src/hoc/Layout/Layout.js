import React, {Component} from 'react';import css from './layout.module.css'import Topbar from "../../components/TopBar/Topbar";import Navbar from "../../components/Navbar/Navbar";class Layout extends Component {    state = {        isMobileNavOpen: false    };    sideNavbarCloseHandler = () => {        this.setState({isMobileNavOpen: false});    }    sideNavbarOpenHandler = () => {        this.setState({isMobileNavOpen: true});    }    render() {        return (            <div className={css.layout}>                <Topbar onMobileNavOpen={() => this.sideNavbarOpenHandler()}/>                <Navbar                    onMobileClose={() => this.sideNavbarCloseHandler()}                    openMobile={this.state.isMobileNavOpen}                />                <div className={css.wrapper}>                    <div className={css.contentContainer}>                        <div className={css.content}>                            {this.props.children}                        </div>                    </div>                </div>            </div>        );    }}export default Layout;