import React, {useState} from "react";import Container from "@material-ui/core/Container";import {Formik} from "formik";import * as Yup from "yup";import {Box, Button, TextField} from "@material-ui/core";import classes from "../Slider/NewSliderFrom.module.css";import ProgressBar from "../ProgressBar/ProgressBar";import ImageViewerTwo from "../ImageViewer/ImageViewerTwo";const NewBrandForm = (props) => {    const [name, setName] = useState();    const logoHandler = event => {        const fd = new FormData();        fd.append('photo', event.target.files[0], event.target.files[0].name);        fd.append('name', name);        console.log("name :", name);        props.addBrandLogo(fd);    }    const priceListHandler = event => {        const fd = new FormData();        fd.append('photo', event.target.files[0], event.target.files[0].name);        fd.append('name', name);        console.log("name :", name);        props.addBrandPriceList(fd);    }    let progressPriceList = "";    if (props.priceListLoaded && props.priceListTotal) {        progressPriceList =            <ProgressBar variant="determinate" value={Math.round(props.priceListLoaded / props.priceListTotal * 100)}/>;    }    let progressLogo = "";    if (props.logoLoaded && props.logoTotal) {        progressLogo =            <ProgressBar variant="determinate" value={Math.round(props.logoLoaded / props.logoTotal * 100)}/>;    }    let logoView = "";    if (props.logoUrl) {        logoView = <ImageViewerTwo images={props.logoUrl}/>    }    let priceListView = "";    console.log("props.priceListUrl :", props.priceListUrl)    if (props.priceListUrl) {        priceListView = props.priceListUrl    }    return (        <Box            display="flex"            flexDirection="column"            height="100%"            justifyContent="center"        >            <Container maxWidth="sm">                <Formik                    initialValues={{                        brandName: '',                        discount: 0.0,                    }}                    validationSchema={                        Yup.object().shape({                            brandName: Yup.string().max(255).required('Brand name is required'),                        })                    }                    onSubmit={(values, isSubmitting) => {                        try {                            const data = {                                brandName: values.brandName,                                discount: values.discount,                                lang: "TR",                                logo: props.logoUrl,                                priceList: props.priceListUrl                            };                            props.addBrand(data);                            isSubmitting.setSubmitting(false);                        } catch (e) {                            console.log('error : ', e)                            props.errorModalHandler(e);                        }                    }}                >                    {({                          errors,                          handleBlur,                          handleChange,                          handleSubmit,                          isSubmitting,                          touched,                          values                      }) => (                        <form onSubmit={handleSubmit}>                            <Box m={2}>                                <TextField                                    error={Boolean(touched.brandName && errors.brandName)}                                    fullWidth                                    helperText={touched.brandName && errors.brandName}                                    label="Brand name"                                    margin="normal"                                    name="brandName"                                    onBlur={handleBlur}                                    onChange={handleChange}                                    value={values.brandName}                                    variant="outlined"                                />                            </Box>                            <Box m={2}>                                <TextField                                    fullWidth                                    error={Boolean(touched.discount && errors.discount)}                                    helperText={touched.discount && errors.discount}                                    label="Discount"                                    margin="normal"                                    name="discount"                                    type="number"                                    onBlur={handleBlur}                                    onChange={handleChange}                                    value={values.discount}                                    variant="outlined"                                />                            </Box>                            <Box mt={2}>                                <div className={classes.leftBox}>                                    <div className={classes.uploadBtn}>                                        <label htmlFor="logo">                                            <input                                                style={{display: 'none'}}                                                id="logo"                                                name="logo"                                                onChange={logoHandler}                                                type="file"                                                accept=".jpeg,.jpg,.png"                                            />                                            <Button color="secondary" variant="contained" component="span">                                                Logo Ekle                                            </Button>                                        </label>                                    </div>                                    <div className={classes.progress}>                                        {progressLogo}                                    </div>                                </div>                            </Box>                            <Box mt={2}>                                {logoView}                            </Box>                            <Box mt={2}>                                <div className={classes.leftBox}>                                    <div className={classes.uploadBtn}>                                        <label htmlFor="priceList">                                            <input                                                style={{display: 'none'}}                                                id="priceList"                                                name="priceList"                                                onChange={priceListHandler}                                                type="file"                                                accept=".pdf"                                            />                                            <Button color="secondary" variant="contained" component="span">                                                Fiyat Listesi Ekle                                            </Button>                                        </label>                                    </div>                                    <div className={classes.progress}>                                        {progressPriceList}                                    </div>                                </div>                            </Box>                            <Box mt={2}>                                <TextField                                    fullWidth                                    label="Price List "                                    margin="normal"                                    name="priceListView"                                    value={priceListView}                                    variant="outlined"                                    disabled="true"                                />                            </Box>                            <Box my={2}>                                <Button                                    color="primary"                                    disabled={isSubmitting}                                    fullWidth                                    size="large"                                    type="submit"                                    variant="contained"                                >                                    New Brand                                </Button>                            </Box>                        </form>                    )}                </Formik>            </Container>        </Box>    );}export default NewBrandForm;