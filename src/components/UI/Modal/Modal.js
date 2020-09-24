import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Aux>

                <Dialog onClose={this.props.modalClosed} aria-labelledby="customized-dialog-title"
                        open={this.props.show}>
                    <DialogTitle id="customized-dialog-title" onClose={this.props.modalClosed}>
                        {this.props.title}
                    </DialogTitle>
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                </Dialog>


            </Aux>
        )
    }
}

export default Modal;