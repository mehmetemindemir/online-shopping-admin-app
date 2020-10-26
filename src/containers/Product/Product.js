import React, {Component} from 'react';import Page from "../../components/Page/Page";import {Box} from "@material-ui/core";import classes from './Product.module.css'import Card from "@material-ui/core/Card";import Button from "@material-ui/core/Button";import Modal from "../../components/UI/Modal/Modal";import * as actions from "../../store/actions/index"import axios from '../../axios-instance';import {connect} from "react-redux";import NewProductFrom from "../../components/UI/Product/NewProductFrom";class Product extends Component {    state = {        addProductModal: false,        errorModal: false,        errorStr: '',        message: '',        page: 0,        limit: 10,        images: []    };    addProductModalOpenHandler = () => {        this.setState({addProductModal: true});    }    addProductModalCloseHandler = () => {        this.setState({addProductModal: false});    }    componentDidMount() {        this.props.getMenu();    }    addPhoto = (data) => {        this.props.addPhoto(data);    }    componentDidUpdate(prevProps, prevState, snapshot) {        if (prevProps.photoList !== prevState.photoList && prevProps.photoList.length > 0) {            this.setState({images: [prevProps.photoList[0], ...this.state.images]});        }    }    render() {        let productContent = '';        if (this.props.menuList || this.props.photoLoaded || this.props.photoTotal || this.state.images) {            productContent = <NewProductFrom                menuList={this.props.menuList}                photoLoaded={this.props.photoLoaded}                photoTotal={this.props.photoTotal}                photoList={this.state.images}                addPhoto={this.addPhoto}            />        }        return (            <Page title='Product'>                <Modal                    show={this.state.addProductModal}                    modalClosed={this.addProductModalCloseHandler}                    title="Add New Product"                >                    {productContent}                </Modal>                <Box margin={1}>                    <Card className={classes.card}>                        <Box m={1} className={classes.box}>                        </Box>                        <Box m={1} className={classes.box}>                            <Box m={1} className={classes.box}>                                <Button                                    color='primary'                                    size="large"                                    type="submit"                                    variant="contained"                                    onClick={this.addProductModalOpenHandler}                                >                                    New Product                                </Button>                            </Box>                        </Box>                    </Card>                </Box>            </Page>        );    }}const mapStateToProps = state => {    return {        menuList: state.menu.menuData,        photoList: state.photo.photoData,        menuLoading: state.menu.loading,        photoLoading: state.photo.loading,        photoTotal: state.photo.photoTotal,        photoLoaded: state.photo.photoLoaded    }}const mapDispatchToProps = dispatch => {    return {        getMenu: () => dispatch(actions.getMenu()),        addPhoto: (data) => dispatch(actions.addPhoto(data))    }}export default connect(mapStateToProps, mapDispatchToProps)(Product, axios);