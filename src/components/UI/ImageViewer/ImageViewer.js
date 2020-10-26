import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const ImageViewer = (props) => {
    const classes = useStyles();
    let list = "";
    if (props.images) {
        list = <GridList className={classes.gridList} cols={2.5}> {props.images.map((tile, index) => (
            <GridListTile key={index}>
                <img src={tile.img} alt={tile.title}/>
                <GridListTileBar

                    actionIcon={
                        <IconButton aria-label={`star ${tile.title}`}>
                            <StarBorderIcon className={classes.title}/>
                        </IconButton>
                    }
                />
            </GridListTile>

        ))}
        </GridList>
    }
    return (

        <div className={classes.root}>
            {list}
        </div>
    );
}
export default ImageViewer;