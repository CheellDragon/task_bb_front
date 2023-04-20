import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const History = ({data}) => {
  const statuses = {
    0: "Создан",
    1: "Ошибка",
    2: "Закрыт",
    3: "Отменен"
  }
  data.map((row) => {
    console.log(row);
    return null;
  });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">ID заявки</TableCell>
            <TableCell align="right">ID пользователя</TableCell>
            <TableCell align="right">Действие</TableCell>
            <TableCell align="right">Старое значение</TableCell>
            <TableCell align="right">Новое значение</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.requestID}</TableCell>
              <TableCell align="right">{row.userID}</TableCell>
              <TableCell align="right">{row.actionColumn}</TableCell>
              {
                row.actionColumn.substr(0,6) === "Статус"
                  ? <>
                    <TableCell align="right">{statuses[row.prevData]}</TableCell>
                    <TableCell align="right">{statuses[row.newData]}</TableCell>
                  </>
                  : <>
                  <TableCell align="right">{row.prevData}</TableCell>
                  <TableCell align="right">{row.newData}</TableCell>
                </>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default History;
