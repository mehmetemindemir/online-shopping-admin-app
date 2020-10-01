import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Collapse from '@material-ui/core/Collapse';
import {
    Box,
    Card,
    IconButton,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const MenuTbl = ({className, menu, ...rest}) => {
    const classes = useStyles();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);


    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <PerfectScrollbar>
                <Box minWidth={1050}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>ID</TableCell>
                                <TableCell>Category name</TableCell>
                                <TableCell>Sub count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.slice(0, limit).map((menu) => (
                                <Row row={menu} key={menu.categoryName}/>
                            ))}

                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={menu.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

function Row(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root} key={props.row.id}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {props.row.id}
                </TableCell>
                <TableCell>
                    <Typography color="textPrimary" variant="body1"> {props.row.categoryName}</Typography>
                </TableCell>
                <TableCell>{props.row.subCate.length}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={3}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sub Category
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Category name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.row.subCate.map((subCate) => (
                                        <TableRow key={subCate.id}>
                                            <TableCell>
                                                {subCate.id}
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textPrimary"
                                                            variant="body1"> {subCate.categoryName}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

MenuTbl.propTypes = {
    className: PropTypes.string,
    menu: PropTypes.array.isRequired
};

export default MenuTbl;
