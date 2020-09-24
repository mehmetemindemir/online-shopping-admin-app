import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

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
                                <TableCell>
                                    ID
                                </TableCell>
                                <TableCell>
                                    Category name
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.slice(0, limit).map((menu) => (
                                <TableRow
                                    hover
                                    key={menu.id}
                                >
                                    <TableCell>
                                        {menu.id}
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            color="textPrimary"
                                            variant="body1"
                                        >
                                            {menu.categoryName}

                                        </Typography>
                                    </TableCell>

                                </TableRow>
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

MenuTbl.propTypes = {
    className: PropTypes.string,
    menu: PropTypes.array.isRequired
};

export default MenuTbl;
