import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Studies: React.FC = () => {
  const [studies, setStudies] = useState([
    { id: 1, title: 'Etude 1', status: 'Active', createdAt: '2023-01-01' },
    { id: 2, title: 'Etude 2', status: 'Inactive', createdAt: '2023-02-15' },
    { id: 3, title: 'Etude 3', status: 'Active', createdAt: '2023-03-20' },
  ]);
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredStudies = studies.filter(study =>
    study.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Etudes</h1>

      <div className="flex justify-between items-center mb-4">
        <TextField
          label="Rechercher"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handleClose}>Modifier</MenuItem>
            <MenuItem onClick={handleClose}>Supprimer</MenuItem>
          </Menu>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date de création</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudies.map((study) => (
              <TableRow
                key={study.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {study.title}
                </TableCell>
                <TableCell>{study.status}</TableCell>
                <TableCell>{study.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Studies;
