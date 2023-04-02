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
import "../CardList/cardList.css"
import { Button } from '@mui/material';
import { agregarCarta } from '../../functions/functions'

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

export default function CardList(props) {
  let rows = props.cards;
  // data.map((card) => {
  //   let newCard = {
  //     id: card.id,
  //     name: card.name,
  //     type : card.type,
  //     price : card.card_prices[0].tcgplayer_price,
  //     url : card.card_images[0].image_url_small
  //   }
  //   rows.push(newCard)
  // })
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChange = (event) => {
    props.setCantidad(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1500, maxWidth: 1500, backgroundColor: "darkgrey" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ backgroundColor: "HighlightText" }}>
            <TableRow sx={{ backgroundColor: "blue" }}>
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name + row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id && typeof value === 'number'
                            ? column.format(value)
                            : (column.id === "url" ? <Link key={row.id} to={`/cardDetail/${row.id}`}><img src={row.card_images[0].image_url_small} /></Link> :
                              (column.id === "button" ? <form>
                                <label htmlFor="quantity">Cantidad: </label>
                                <input
                                  type="number"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max='99'
                                  onChange={handleChange}
                                />
                                <Button onClick={() => {
                                  agregarCarta(row, props.cantidad).then((value) => props.setCart(value))
                                }} key={row.id + "button"}>Agregar al carrito</Button></form> :
                                (column.id === "price" ? row.card_prices[0].tcgplayer_price : value)))}
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
        count={props.cards.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
