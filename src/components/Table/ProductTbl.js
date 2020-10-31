import React from 'react';
import clsx from 'clsx';
import {makeStyles, TableCell, TableRow,} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import PerfectScrollbar from 'react-perfect-scrollbar';
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import css from './BrandTbl.module.css'
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    },
    statusBG: {}
}));

const ProductTbl = ({className, productList, page, limit, pageChange, limitChange, changedPrdStatus, ...rest}) => {
    const classes = useStyles();
    const handleLimitChange = (event) => {
        limitChange(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        pageChange(newPage);
    };

    const handleChange = (id, status) => {
        console.log('id ', id);
        if (status === 1) {
            status = 0
        } else {
            status = 1
        }
        const data = {
            companyId: 1,
            prdId: id,
            status: status
        };
        changedPrdStatus(data);
    };
    return (

        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <PerfectScrollbar>
                <Box>
                    <Table
                        size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="left">Product name</TableCell>
                                <TableCell align="left">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productList.slice(page * limit, page * limit + limit).map((item) => (
                                <TableRow
                                    key={item.prdId}
                                    className={item.status === 1 ? css.status__active : css.status__passive}>
                                    <TableCell>
                                        <img height="100" width="100" src={item.image}/>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textPrimary"
                                                    variant="body1"> {item.productName}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={item.status === 1 ? true : false}
                                            onClick={() => handleChange(item.prdId, item.status)}
                                            className={css.switch}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={productList.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    )
        ;
};

export default ProductTbl;
