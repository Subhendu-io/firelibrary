import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('app-root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      {/* <Route path="ebook" element={<Ebook />} /> */}
    </Routes>
  </BrowserRouter>
);