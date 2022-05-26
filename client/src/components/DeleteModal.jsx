import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ApiService from '../services/ApiService';
import API_ROUTES from '../configs/api.routes';

const style = {
  width: 400,
  top: '50%',
  left: '50%',
  boxShadow: 24,
  bgcolor: 'white',
  borderRadius: '8px',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
};

const DeleteModal = (props) => {
  function onDelete(ebook) {
    ApiService.delete(API_ROUTES.ebooks + '/' + ebook.id).then(result => {
      if (result.data.success) {
        props.onClose(true);
      }
    })
  }
  
  return (
    <Modal {...props}>
      <Box sx={style}>
        <div className='modal-header bgx-danger text-white'>
          <h5 className='m-0'>Delete "{props.ebook.title}"</h5>
        </div>
        <div className='modal-body'>
          <p>By clicking <b>Delete</b> your ebook <b>{props.ebook.title}</b> by <b>{props.ebook.author}</b> will be deleted permanently, are you sure you want to delete.</p>
        </div>

        <div className='modal-footer'>
          <Button onClick={() => onDelete(props.ebook)} variant="contained" color="error">
              Delete
          </Button>
          <Button className="mx-2" onClick={() => props.onClose(false)}>
              Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
