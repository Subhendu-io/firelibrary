import React, { useEffect, useState } from 'react';

import ApiService from '../services/ApiService';
import API_ROUTES from '../configs/api.routes';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import BookCard from '../components/BookCard';
import BookList from '../components/BookList';
import EditModal from '../components/EditModal';

export default function Album() {
    const [ebooks, setEbooks] = useState([]);
    const [viewType, setViewType] = useState('TABLE');
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        getEbooks();
    }, []);
    const getEbooks = () => {
        ApiService.get(API_ROUTES.ebooks).then(result => {
            if (result.data.success) {
                setEbooks(result.data.data);
            }
        })
    }
    const handleCloseEdit = (isAdded) => {
        if (isAdded) {
            getEbooks();
        }
        setOpenEdit(false);
    };
    const handleViewChange = (event, nextView) => {
        setViewType(nextView);
      };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main className="app-main container py-4">
            <div className="row">
                <div className="col-sm-6">
                    <h3>eBooks</h3>
                    <p>List of all the ebooks</p>
                </div>
                <div className="col-sm-6">
                    <ToggleButtonGroup
                        size="small"
                        className="fl-right"
                        value={viewType}
                        exclusive
                        onChange={handleViewChange}
                        color="primary"
                        >
                        <ToggleButton value="TABLE" aria-label="list">
                            <ViewListIcon />
                        </ToggleButton>
                        <ToggleButton value="GRID" aria-label="module">
                            <ViewModuleIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button className="fl-right mx-4" onClick={() => setOpenEdit(true)} startIcon={<AddIcon />} size="large">
                        Add new ebook
                    </Button>
                </div>
            </div>
            {ebooks.length > 0 ? (
                <section className="app-section row">
                    {viewType === 'GRID' ? (
                        ebooks.map(ebook => <BookCard key={ebook.id} ebook={ebook} refreshData={getEbooks}/>)
                    ) : (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="p-3" scope="col">Title</th>
                                    <th className="p-3" scope="col">Author</th>
                                    <th className="p-3" scope="col">Genre</th>
                                    <th className="p-3" scope="col">Review</th>
                                    <th className="p-3" scope="col">Favorite</th>
                                    <th className="p-3" scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ebooks.map(ebook => <BookList key={ebook.id} ebook={ebook} refreshData={getEbooks}/>)}
                            </tbody>
                        </table>
                    )}
                </section>
            ) : (
                <section className="app-section row">
                    <div className="col-md-12">
                        <Alert severity="info">
                            No ebooks found, <Link component="button" onClick={() => setOpenEdit(true)}>click here</Link> to create new ebook.
                        </Alert>
                    </div>
                </section>
            )}
        </main>
        <Footer />
        <EditModal open={openEdit} ebook={null} onClose={handleCloseEdit} />
    </Box>
  );
};