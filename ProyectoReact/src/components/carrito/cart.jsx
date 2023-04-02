import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import {eliminarCarta} from '../../functions/functions'


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'id', label: 'Id', minWidth: 100 },
  {
    id: 'type',
    label: 'Type',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'url',
    label: 'Image',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'button',
    label: '',
    minWidth: 170,
    align: 'right',
  },
];

export default function Cart(props) { 
  let rows = props.cart.productos

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    rows?.length > 0 ? (<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1500, maxWidth: 1500, backgroundColor: "darkgrey" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead  sx={{ backgroundColor: "HighlightText" }}>
            <TableRow  sx={{ backgroundColor: "blue" }}>
              {columns.map((column) => (
                <TableCell sx={{ backgroundColor: "skyblue" }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow  hover role="checkbox" tabIndex={-1} key={row.name+row.id+index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id && typeof value === 'number'
                            ? column.format(value)
                            : ( column.id === "url" ? <Link key={row.id} to={`/cardDetail/${row.id}`}><img src={row.card_images[0].image_url_small}/></Link>  : 
                            ( column.id === "button" ? <Button onClick={() =>{
                              eliminarCarta(row).then((value) => props.setCart(value))
                            } } key={row.id+"button"}>Eliminar del carrito</Button> :
                            (column.id === "price" ? row.card_prices[0].tcgplayer_price : value))) }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination sx={{ backgroundColor: "skyblue" }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>) : <h2> Tu carrito esta vacio</h2>
    
  );
}