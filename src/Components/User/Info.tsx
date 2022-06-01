import { useAppSelector } from '../../Store/HookStore';
import { RootState } from '../../Store';
import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableBody
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Info() {
  const userData = useAppSelector((state: RootState) => state.users.data);

  if (userData == null) {
    return (
      <Box sx={{ m: 3 }}>
        <Typography variant="h4">Đang lấy dữ liệu ...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" component="div">
        Hi <strong>{userData?.fullname}</strong>
      </Typography>
      <Link to="/auth/logout">Logout</Link>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>hash</TableCell>
              <TableCell>email</TableCell>
              <TableCell>fullname</TableCell>
              <TableCell>birthday</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{userData?.id}</TableCell>
              <TableCell>{userData?.hash}</TableCell>
              <TableCell>{userData?.email}</TableCell>
              <TableCell>{userData?.fullname}</TableCell>
              <TableCell>{userData?.birthday}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
