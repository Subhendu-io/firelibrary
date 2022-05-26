import { useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

import ApiService from '../services/ApiService';
import API_ROUTES from '../configs/api.routes';

const style = {
  width: 600,
  top: '50%',
  left: '50%',
  boxShadow: 24,
  bgcolor: 'white',
  borderRadius: '8px',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
};
const genres = ['Fantasy', 'Literary', 'Mystery', 'Non-Fiction', 'Science Fiction', 'Thriller'];

const EditModal = (props) => {
  const [formError, setFormError] = useState(false);
  const [ebook, setEbook] = useState(props.ebook ? props.ebook : {
    title: '',
    author: '',
    genre: genres[0],
    review: 0,
    favorite: 0
  });

  const handleEbookChange = (event) => {
    if (event.target.name === 'favorite') {
      let appEbook = ebook;
      appEbook[event.target.name] = event.target.checked === true ? 1 : 0;
      setEbook({...appEbook});
    } else if (event.target.name === 'review') {
      let appEbook = ebook;
      appEbook[event.target.name] = Number(event.target.value);
      setEbook({...appEbook});
    } else {
      let appEbook = ebook;
      appEbook[event.target.name] = event.target.value;
      setEbook({...appEbook});
    }
  };

  function onSubmit() {
    if (!ebook.title || ebook.title === '' || !ebook.author || ebook.author === '' ) {
      setFormError(true);
    } else if (props.ebook && props.ebook.id) {
      ApiService.put(API_ROUTES.ebooks + '/' + props.ebook.id, ebook).then(result => {
        if (result.data.success) {
          props.onClose(true);
        }
      });
    } else {
      ApiService.post(API_ROUTES.ebooks, ebook).then(result => {
        if (result.data.success) {
          props.onClose(true);
        }
      });
    }
  }
  
  return (
    <Modal {...props}>
      <Box sx={style}>
        <div className='modal-header bgx-primary text-white'>
          <h5 className='m-0'>{props.ebook ? props.ebook.title : 'Create new ebook'}</h5>
        </div>
        <div className='modal-body'>
          <div className='container-fluid'>
            {formError ? (
              <Alert className="mb-3" severity="error" onClose={() => setFormError(false)}>
                <AlertTitle>Validation error</AlertTitle>
                <strong>Title</strong> and <strong>Author</strong> are required fields!
              </Alert>
            ) : (<></>)}
            <div className='row'>
              <div className="col-md-6 my-2">
                <TextField
                  required
                  name="title"
                  fullWidth
                  label="Title"
                  value={ebook.title} onChange={handleEbookChange}
                  id="title"
                  size="small"
                />
              </div>
              <div className="col-md-6 my-2">
                <FormControl fullWidth>
                  <InputLabel id="genre">Genre</InputLabel>
                  <Select
                    required
                    name="genre"
                    labelId="genre"
                    id="genre"
                    value={ebook.genre}
                    label="Age"
                    size="small"
                    onChange={handleEbookChange}
                  >
                    {genres.map(genre =>
                      <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6 my-2">
                <TextField
                  fullWidth
                  required
                  name="author"
                  id="author"
                  label="Author"
                  value={ebook.author} onChange={handleEbookChange}
                  size="small"
                />
              </div>
              <div className="col-md-12 my-2">
                <p className="text-default">Review</p>
                <Rating
                  name="review"
                  value={ebook.review}
                  onChange={handleEbookChange}
                />
              </div>
              <div className="col-md-12 my-2">
                <FormGroup>
                  <FormControlLabel name="favorite" control={<Checkbox checked={ebook.favorite === 1 ? true : false} onChange={handleEbookChange} />}  label="To to favorites" />
                </FormGroup>
              </div>
            </div>
          </div>

        </div>

        <div className='modal-footer'>
          <Button onClick={() => onSubmit()}  variant="contained" color="primary">
            Save
          </Button>
          <Button className="mx-2" onClick={() => props.onClose(false)}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
