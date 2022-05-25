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
        <div className="col-lg-3 col-md-4 col-sm-6 my-3">
            <div className="card">
                <div className="card-body">
                    {props.ebook.favorite === 1 ? (
                        <span className='fl-right'><FavoriteIcon sx={{ color: 'red' }} /></span>
                    ) : (
                        <span className='fl-right'><FavoriteBorderIcon sx={{ color: 'action' }} /></span>
                    )}
                    <p className="card-text">{props.ebook.genre}</p>
                    <h5 className="card-title">{props.ebook.title}</h5>
                    <p className="card-text">by {props.ebook.author}</p>
                    <Rating name="read-only" value={props.ebook.review} readOnly />
                </div>
                <div className='card-footer mt-4'>
                    <button onClick={() => setOpenEdit(true)} className="btn btn-primary">Edit</button>
                    <button onClick={() => setOpenDelete(true)} className="btn btn-danger mx-2">Delete</button>
                </div>
            </div>
            <DeleteModal open={openDelete} ebook={props.ebook} onClose={handleCloseDelete} />
            <EditModal open={openEdit} ebook={props.ebook} onClose={handleCloseEdit} />
        </div>
    )
}

BookCard.propTypes = {
    ebook: Ebook
}