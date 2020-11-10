import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    title2: {},

    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const ImageViewerOne = (props) => {
    const classes = useStyles();
    console.log("props.images.photoUrl :", props.images)
    return (

        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                <GridListTile key={1}>
                    <img src={props.images}/>
                </GridListTile>
            </GridList>
        </div>
    );
}
export default ImageViewerOne;