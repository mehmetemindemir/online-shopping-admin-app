import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Collapse from '@material-ui/core/Collapse';
import {
    Box,
    Card,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import css from "./MenuTbl.module.css";
import Switch from "@material-ui/core/Switch";


const MenuTbl = ({className, menu, menuRemoved, limit, page, pageChange, limitChange, ...rest}) => {

    const handleLimitChange = (event) => {
        limitChange(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        pageChange(newPage);
    };

    return (
        <Card
            className={className}
            {...rest}
        >
            <PerfectScrollbar>
                <Box>
                    <Table
                        size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"/>
                                <TableCell align="left">Category name</TableCell>
                                <TableCell align="left">status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.slice(page * limit, page * limit + limit).map((menu) => (
                                <Row row={menu} key={menu.categoryName} menuRemoved={menuRemoved}/>
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

    const handleChange = (id, status) => {
        console.log('id ', id);
        if (status === 1) {
            status = 0
        } else {
            status = 1
        }
        props.menuRemoved(id, status);
    };
    let openIcon = <TableCell align="left"/>;
    if (props.row.subCate.length > 0) {
        openIcon = <TableCell align="left">
            <IconButton style={{width: 50}} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon width={10}/> : <KeyboardArrowDownIcon/>}
            </IconButton>
        </TableCell>
    }

    return (
        <React.Fragment>
            <TableRow key={props.row.id} className={props.row.status === 1 ? css.status__active : css.status__passive}>
                {openIcon}
                <TableCell align="left">
                    <Typography color="textPrimary" variant="body1"> {props.row.categoryName}</Typography>
                </TableCell>
                <TableCell align="left">
                    <Switch
                        checked={props.row.status === 1 ? true : false}
                        onClick={() => handleChange(props.row.id, props.row.status)}
                        className={css.switch}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sub Category
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Category name</TableCell>
                                        <TableCell align="left">status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.row.subCate.map((subCate) => (
                                        <TableRow key={subCate.id}>
                                            <TableCell align="v">
                                                <Typography color="textPrimary"
                                                            variant="body1"> {subCate.categoryName}</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Switch
                                                    checked={subCate.status === 1 ? true : false}
                                                    onClick={() => handleChange(subCate.id, subCate.status)}
                                                    className={css.switch}
                                                />
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


export default MenuTbl;
