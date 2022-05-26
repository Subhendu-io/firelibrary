import { useState } from 'react';

import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Ebook from '../models/Ebook';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

export default function BookCard(props) {
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleCloseEdit = (isEdited) => {
        if (isEdited) {
            props.refreshData();
        }
        setOpenEdit(false);
    };

    const handleCloseDelete = (isDeleted) => {
        if (isDeleted) {
            props.refreshData();
        }
        setOpenDelete(false);
    };

    return (
      <tr>
        <th><b>{props.ebook.title}</b></th>
        <td>{props.ebook.author}</td>
        <td>{props.ebook.genre}</td>
        <td>
          <Rating name="read-only" value={props.ebook.review} readOnly />
        </td>
        <td>
          {props.ebook.favorite === 1 ? (
              <span><FavoriteIcon sx={{ color: 'red' }} /></span>
          ) : (
              <span><FavoriteBorderIcon sx={{ color: 'action' }} /></span>
          )}
        </td>
        <td>
          <IconButton onClick={() => setOpenEdit(true)} color="primary" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setOpenDelete(true)} color="error" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </td>
        <DeleteModal open={openDelete} ebook={props.ebook} onClose={handleCloseDelete} />
        <EditModal open={openEdit} ebook={props.ebook} onClose={handleCloseEdit} />
      </tr>
    )
}

BookCard.propTypes = {
    ebook: Ebook
}