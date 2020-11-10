import React, {useState} from "react";
import {Box, Button, TextField} from "@material-ui/core";
import {Formik} from "formik";
import * as Yup from "yup";
import Container from "@material-ui/core/Container";
import classes from './NewSliderFrom.module.css'
import ProgressBar from "../ProgressBar/ProgressBar";
import ImageViewerOne from "../ImageViewer/ImageViewerOne";

const NewSliderFrom = (props) => {
    const [name, setName] = useState();
    const fileSelectHandler = event => {
        const fd = new FormData();
        fd.append('photo', event.target.files[0], event.target.files[0].name);
        fd.append('name', name);
        console.log("name :", name);
        props.addPhoto(fd);

    }

    let progress = "";
    if (props.photoLoaded && props.photoTotal) {
        progress = <ProgressBar variant="determinate" value={Math.round(props.photoLoaded / props.photoTotal * 100)}/>;
    }

    let imageView = "";
    if (props.photoList) {
        imageView = <ImageViewerOne images={props.photoList}/>
    }

    return (

        <Box display="flex"
             flexDirection="column"
             height="100%"
             justifyContent="center">

            <Container maxWidth="lg">
                <Formik
                    initialValues={{
                        sliderUrl: '',
                        title: '',

                    }}
                    validationSchema={
                        Yup.object().shape({
                            sliderUrl: Yup.string().required('Category  is required'),
                            title: Yup.string().required('Brand  is required'),

                        })

                    }

                    onSubmit={(values, isSubmitting) => {
                        try {

                            const data = {
                                sliderUrl: values.sliderUrl,
                                title: values.title,
                                image: props.photoList.photoUrl
                            }
                            props.addSlider(data);


                        } catch (e) {
                            console.log('error : ', e)
                            //props.errorModalHandler(e);
                        }

                    }}

                >
                    {({
                          errors,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          isSubmitting,
                          touched,
                          values
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Box mt={2}>
                                <TextField
                                    error={Boolean(touched.title && errors.title)}
                                    fullWidth
                                    helperText={touched.title && errors.title}
                                    label="Title"
                                    margin="normal"
                                    name="title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    variant="outlined"

                                />
                            </Box>

                            <Box mt={2}>
                                <TextField
                                    error={Boolean(touched.sliderUrl && errors.sliderUrl)}
                                    helperText={touched.sliderUrl && errors.sliderUrl}
                                    fullWidth
                                    label="Slider Url"
                                    margin="normal"
                                    name="sliderUrl"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.sliderUrl}
                                    variant="outlined"
                                />
                            </Box>

                            <Box mt={2}>
                                <div className={classes.leftBox}>
                                    <div className={classes.uploadBtn}>
                                        <label htmlFor="upload-photo">
                                            <input
                                                style={{display: 'none'}}
                                                id="upload-photo"
                                                name="upload-photo"
                                                onChange={fileSelectHandler}
                                                type="file"
                                            />
                                            <Button color="secondary" variant="contained" component="span">
                                                Fotograf Ekle 1170x620
                                            </Button>
                                        </label>
                                    </div>
                                    <div className={classes.progress}>
                                        {progress}
                                    </div>
                                </div>


                            </Box>
                            <Box mt={2}>
                                {imageView}
                            </Box>
                            <Box mt={2}>
                                <Button
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    New Slider
                                </Button>
                            </Box>

                        </form>
                    )}
                </Formik>
            </Container>
        </Box>
    )
}

export default NewSliderFrom;