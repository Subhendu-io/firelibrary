import React, { useState } from 'react';

import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
          <button onClick={() => setOpenEdit(true)} className="btn btn-primary">Edit</button>
          <button onClick={() => setOpenDelete(true)} className="btn btn-danger mx-2">Delete</button>
        </td>
        <DeleteModal open={openDelete} ebook={props.ebook} onClose={handleCloseDelete} />
        <EditModal open={openEdit} ebook={props.ebook} onClose={handleCloseEdit} />
      </tr>
    )
}

BookCard.propTypes = {
    ebook: Ebook
}