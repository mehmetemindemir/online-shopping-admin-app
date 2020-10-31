import React, {useState} from "react";import {Box, Button, TextField} from "@material-ui/core";import {Formik} from "formik";import * as Yup from "yup";import Container from "@material-ui/core/Container";import TextareaAutosize from "@material-ui/core/TextareaAutosize";import classes from './NewProductFrom.module.css'import ProgressBar from "../ProgressBar/ProgressBar";import ImageViewer from "../ImageViewer/ImageViewer";const NewProductFrom = (props) => {    const [name, setName] = useState();    const [subCategory, setSubCategory] = useState([]);    const fileSelectHandler = event => {        const fd = new FormData();        fd.append('photo', event.target.files[0], event.target.files[0].name);        fd.append('name', name);        console.log("name :", name);        props.addPhoto(fd);    }    let progress = "";    if (props.photoLoaded && props.photoTotal) {        progress = <ProgressBar variant="determinate" value={Math.round(props.photoLoaded / props.photoTotal * 100)}/>;    }    const addMainImage = (index) => {        props.addMainImage(index);    }    const categoryChangedHandler = (e) => {        // console.log("e :", e.target.value);        const subCat = props.menuList.filter(menu => menu.id == e.target.value);        //console.log("subCat :", subCat[0].subCate);        setSubCategory(subCat[0].subCate);    }    let imageView = "";    if (props.photoList) {        imageView = <ImageViewer images={props.photoList} addMainImage={addMainImage}/>    }    return (        <Box display="flex"             flexDirection="column"             height="100%"             justifyContent="center">            <Container maxWidth="lg">                <Formik                    initialValues={{                        productName: '',                        comment: '',                        categoryId: 0,                        subCategoryId: 0,                        price: 0.0,                        currency: "TL",                        tax: 0.0,                        discount: 0.0,                        stock: 0.0,                        stockType: "",                        brandId: 0,                        productPhotos: props.photoList                    }}                    validationSchema={                        Yup.object().shape({                            categoryId: Yup.string().required('Category  is required'),                            brandId: Yup.string().required('Brand  is required'),                            subCategoryId: Yup.string().required('Sub Category  is required'),                            productName: Yup.string().max(255).required('Product Name is required'),                            price: Yup.number().min(1, "Please enter a Price more than 0 ")                        })                    }                    onSubmit={(values, isSubmitting) => {                        try {                            let image = "";                            const indx = props.photoList.findIndex((i => i.mainPhotoFlag === 1));                            if (indx < 0) {                                image = props.photoList[0].photoUrl;                            } else {                                image = props.photoList[indx].photoUrl;                            }                            const data = {                                productName: values.productName,                                comment: values.comment,                                categoryId: values.categoryId,                                subCategoryId: values.subCategoryId,                                price: values.price,                                currency: values.currency,                                tax: values.tax,                                discount: values.discount,                                stock: values.stock,                                stockType: values.stockType,                                brandId: values.brandId,                                productPhotos: props.photoList,                                lang: "TR",                                companyId: 1,                                image: image                            };                            props.addProduct(data);                            console.log('decs: ', data);                        } catch (e) {                            console.log('error : ', e)                            //props.errorModalHandler(e);                        }                    }}                >                    {({                          errors,                          handleBlur,                          handleChange,                          handleSubmit,                          isSubmitting,                          touched,                          values                      }) => (                        <form onSubmit={handleSubmit}>                            <Box mt={2}>                                <TextField                                    error={Boolean(touched.productName && errors.productName)}                                    fullWidth                                    helperText={touched.productName && errors.productName}                                    label="Product name"                                    margin="normal"                                    name="productName"                                    onBlur={handleBlur}                                    onChange={e => {                                        handleChange(e);                                        setName(e.target.value);                                    }}                                    value={values.productName}                                    variant="outlined"                                />                            </Box>                            <Box mt={2}>                                <TextareaAutosize                                    rowsMin={10}                                    cols={60}                                    className={classes.input}                                    margin="normal"                                    name="comment"                                    placeholder="Comment name"                                    onBlur={handleBlur}                                    onChange={handleChange}                                    value={values.comment}                                />                            </Box>                            <Box mt={2}>                                <TextField                                    fullWidth                                    label="Select Category"                                    name="categoryId"                                    onChange={e => {                                        handleChange(e);                                        categoryChangedHandler(e);                                    }}                                    required                                    select                                    SelectProps={{native: true}}                                    value={values.categoryId}                                    variant="outlined"                                >                                    <option key={0} value=""></option>                                    {props.menuList.map((option) => (                                        <option key={option.id} value={option.id}>                                            {option.categoryName}                                        </option>                                    ))}                                </TextField>                            </Box>                            <Box mt={2}>                                <TextField                                    fullWidth                                    label="Select Category"                                    name="subCategoryId"                                    onChange={handleChange}                                    required                                    select                                    SelectProps={{native: true}}                                    value={values.subCategoryId}                                    variant="outlined"                                >                                    <option key={0} value=""></option>                                    {subCategory.map((option) => (                                        <option key={option.id} value={option.id}>                                            {option.categoryName}                                        </option>                                    ))}                                </TextField>                            </Box>                            <Box mt={2}>                                <div className={classes.leftBox}>                                    <TextField                                        error={Boolean(touched.price && errors.price)}                                        helperText={touched.price && errors.price}                                        label="Price"                                        margin="normal"                                        name="price"                                        type="number"                                        onBlur={handleBlur}                                        onChange={handleChange}                                        value={values.price}                                        variant="outlined"                                    />                                    <TextField                                        error={Boolean(touched.currency && errors.currency)}                                        helperText={touched.currency && errors.currency}                                        label="Currency"                                        margin="normal"                                        name="currency"                                        onBlur={handleBlur}                                        onChange={handleChange}                                        value={values.currency}                                        variant="outlined"                                    />                                </div>                            </Box>                            <Box mt={2}>                                <div className={classes.leftBox}>                                    <TextField                                        error={Boolean(touched.tax && errors.tax)}                                        type="number"                                        helperText={touched.tax && errors.tax}                                        label="Tax"                                        margin="normal"                                        name="tax"                                        onBlur={handleBlur}                                        onChange={handleChange}                                        value={values.tax}                                        variant="outlined"                                    />                                    <TextField                                        error={Boolean(touched.discount && errors.discount)}                                        helperText={touched.discount && errors.discount}                                        label="Discount"                                        margin="normal"                                        name="discount"                                        type="number"                                        onBlur={handleBlur}                                        onChange={handleChange}                                        value={values.discount}                                        variant="outlined"                                    />                                </div>                            </Box>                            <Box mt={2}>                                <div className={classes.leftBox}>                                    <TextField                                        fullWidth                                        label="Select Stock Type"                                        name="stockType"                                        onChange={handleChange}                                        required                                        select                                        SelectProps={{native: true}}                                        value={values.stockType}                                        variant="outlined"                                    >                                        <option key={0} value="1">                                            Metre                                        </option>                                        <option key={1} value="2">                                            Adet                                        </option>                                        <option key={2} value="3">                                            Koli                                        </option>                                    </TextField>                                    <TextField                                        fullWidth                                        label="Select Brand"                                        name="brandId"                                        onChange={handleChange}                                        required                                        select                                        SelectProps={{native: true}}                                        value={values.brandId}                                        variant="outlined"                                    >                                        <option key={0} value=""></option>                                        {props.brandList.map((option) => (                                            <option key={option.brandId} value={option.brandId}>                                                {option.brandName}                                            </option>                                        ))}                                    </TextField>                                </div>                            </Box>                            <Box mt={2}>                                <div className={classes.leftBox}>                                    <TextField                                        error={Boolean(touched.stock && errors.stock)}                                        helperText={touched.stock && errors.stock}                                        label="Stock"                                        margin="normal"                                        name="stock"                                        onBlur={handleBlur}                                        onChange={handleChange}                                        value={values.stock}                                        variant="outlined"                                    />                                </div>                            </Box>                            <Box mt={2}>                                <div className={classes.leftBox}>                                    <div className={classes.uploadBtn}>                                        <label htmlFor="upload-photo">                                            <input                                                style={{display: 'none'}}                                                id="upload-photo"                                                name="upload-photo"                                                onChange={fileSelectHandler}                                                type="file"                                            />                                            <Button color="secondary" variant="contained" component="span">                                                Fotograf Ekle                                            </Button>                                        </label>                                    </div>                                    <div className={classes.progress}>                                        {progress}                                    </div>                                </div>                            </Box>                            <Box mt={2}>                                {imageView}                            </Box>                            <Box mt={2}>                                <Button                                    color="primary"                                    disabled={isSubmitting}                                    fullWidth                                    size="large"                                    type="submit"                                    variant="contained"                                >                                    New Product                                </Button>                            </Box>                        </form>                    )}                </Formik>            </Container>        </Box>    )}export default NewProductFrom;