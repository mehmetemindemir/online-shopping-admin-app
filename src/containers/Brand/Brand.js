import React, {Component} from 'react';import Page from "../../components/Page/Page";import * as actions from "../../store/actions/index"import axios from '../../axios-instance';import {Box, Button, IconButton, TableCell, TableRow, TextField} from "@material-ui/core";import {connect} from "react-redux";import Spinner from "../../components/UI/Spinner/Spinner";import Card from "@material-ui/core/Card";import classes from "../Menu/Menu.module.css";import Container from "@material-ui/core/Container";import {Formik} from "formik";import * as Yup from "yup";import Modal from "../../components/UI/Modal/Modal";import PerfectScrollbar from "react-perfect-scrollbar";import Table from "@material-ui/core/Table";import TableHead from "@material-ui/core/TableHead";import TableBody from "@material-ui/core/TableBody";import Typography from "@material-ui/core/Typography";import DeleteIcon from "@material-ui/icons/Delete";import TablePagination from "@material-ui/core/TablePagination";class Brand extends Component {    state = {        addBrandModal: false,        errorModal: false,        errorStr: '',        limit: 10,        page: 0    }    handleLimitChange = (event) => {        this.setState({limit: event.target.value})        console.log('limit', event.target.value)    };    handlePageChange = (event, newPage) => {        console.log('newPage', newPage);        this.setState({page: newPage});    };    addBrandHandler = () => {        this.setState({addBrandModal: true});    }    addBrandCancelHandler = () => {        this.setState({addBrandModal: false});    }    errorModalHandler = () => {        this.setState({errorModal: true})    }    errorModalCancelHandler = () => {        this.setState({errorModal: false})    }    delHandle(id) {        const delData = {            brandId: id        };        this.props.delBrand(delData)    }    componentDidMount() {        this.props.getBrand();    }    render() {        let table = "";        if (this.props.loading) {            table = <Spinner/>        }        table = this.props.error ? <p>Brand can't be loaded!</p> : <Spinner/>;        if (this.props.brandList) {            table = <Card            >                <PerfectScrollbar>                    <Box minWidth={1050}>                        <Table>                            <TableHead>                                <TableRow>                                    <TableCell>ID</TableCell>                                    <TableCell>Brand name</TableCell>                                    <TableCell>Del</TableCell>                                </TableRow>                            </TableHead>                            <TableBody>                                {this.props.brandList.slice(0, this.state.limit).map((item) => (                                    <TableRow className={classes.root} key={item.brandId}>                                        <TableCell>                                            {item.brandId}                                        </TableCell>                                        <TableCell>                                            <Typography color="textPrimary"                                                        variant="body1"> {item.brandName}</Typography>                                        </TableCell>                                        <TableCell>                                            <IconButton onClick={() => this.delHandle(item.brandId)}>                                                <DeleteIcon/>                                            </IconButton>                                        </TableCell>                                    </TableRow>                                ))}                            </TableBody>                        </Table>                    </Box>                </PerfectScrollbar>                <TablePagination                    component="div"                    count={this.props.brandList.length}                    onChangePage={this.handlePageChange}                    onChangeRowsPerPage={this.handleLimitChange}                    page={this.state.page}                    rowsPerPage={this.state.limit}                    rowsPerPageOptions={[5, 10, 25]}                />            </Card>        }        let mainBrand = <Box            display="flex"            flexDirection="column"            height="100%"            justifyContent="center"        >            <Container maxWidth="sm">                <Formik                    initialValues={{                        brandName: '',                    }}                    validationSchema={                        Yup.object().shape({                            brandName: Yup.string().max(255).required('Brand name is required'),                        })                    }                    onSubmit={(values, isSubmitting) => {                        try {                            const data = {                                brandName: values.brandName.toUpperCase(),                                lang: "TR",                                companyId: 1                            };                            this.props.addBrand(data);                            isSubmitting.setSubmitting(false);                        } catch (e) {                            this.setState({errorStr: e.error})                            this.errorModalHandler();                        }                    }}                >                    {({                          errors,                          handleBlur,                          handleChange,                          handleSubmit,                          isSubmitting,                          touched,                          values                      }) => (                        <form onSubmit={handleSubmit}>                            <Box m={3}>                            </Box>                            <TextField                                error={Boolean(touched.brandName && errors.brandName)}                                fullWidth                                helperText={touched.brandName && errors.brandName}                                label="Brand name"                                margin="normal"                                name="brandName"                                onBlur={handleBlur}                                onChange={handleChange}                                value={values.brandName}                                variant="outlined"                            />                            <Box my={2}>                                <Button                                    color="primary"                                    disabled={isSubmitting}                                    fullWidth                                    size="large"                                    type="submit"                                    variant="contained"                                >                                    New Brand                                </Button>                            </Box>                        </form>                    )}                </Formik>            </Container>        </Box>        return (            <Page title='Brand'>                <Modal show={this.state.addBrandModal} modalClosed={this.addBrandCancelHandler}                       title="Add new Brand">                    {mainBrand}                </Modal>                <Box mt={3} ml={3} mb={3}>                    <Card className={classes.card}>                        <Box m={1} className={classes.box}>                        </Box>                        <Box m={1} className={classes.box}>                            <Box m={1} className={classes.box}>                                <Button                                    color="primary"                                    onClick={this.addBrandHandler}                                    size="large"                                    type="submit"                                    variant="contained"                                >                                    New Brand                                </Button>                            </Box>                        </Box>                    </Card>                </Box>                <Box margin={3}>                    {table}                </Box>                <Modal show={this.state.errorModal} modalClosed={this.errorModalCancelHandler}                       title='!!!! Error'>                    {this.state.errorStr}                </Modal>            </Page>        );    }}const mapStateToProps = state => {    return {        loading: state.brand.loading,        error: state.brand.error,        brandList: state.brand.brandData    }}const mapDispatchToProps = dispatch => {    return {        getBrand: () => dispatch(actions.getBrand()),        addBrand: (data) => dispatch(actions.addBrand(data)),        delBrand: (data) => dispatch(actions.delBrand(data))    }}export default connect(mapStateToProps, mapDispatchToProps)(Brand, axios);