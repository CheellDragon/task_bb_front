import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function History({data}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Request ID</TableCell>
            <TableCell align="right">User ID</TableCell>
            <TableCell align="right">Action Column</TableCell>
            <TableCell align="right">Prev Data</TableCell>
            <TableCell align="right">New Data</TableCell>
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
              <TableCell align="right">{row.prevData}</TableCell>
              <TableCell align="right">{row.newData}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
