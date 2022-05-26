import { useState } from 'react';

import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
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
        <div className="col-lg-3 col-md-4 col-sm-6 my-3">
            <div className="card card-ebook">
                <div className="card-body">
                    {props.ebook.favorite === 1 ? (
                        <span className='fl-right'><FavoriteIcon sx={{ color: 'red' }} /></span>
                    ) : (
                        <span className='fl-right'><FavoriteBorderIcon sx={{ color: 'action' }} /></span>
                    )}
                    <p className="card-text card-ebook-genre">{props.ebook.genre}</p>
                    <h5 className="card-title card-ebook-title">{props.ebook.title}</h5>
                    <p className="card-text card-ebook-author">by <b>{props.ebook.author}</b></p>
                    <Rating name="read-only" value={props.ebook.review} readOnly />
                </div>
                <div className='card-footer mt-4'>
                    <Button onClick={() => setOpenEdit(true)} startIcon={<EditIcon />} color="primary">
                        Edit
                    </Button>
                    <Button className="mx-2" onClick={() => setOpenDelete(true)} startIcon={<DeleteIcon />} color="error">
                        Delete
                    </Button>
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