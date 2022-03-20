import React from 'react';
import './App.css';
import CatListComponent from './components/cat-list.component';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CatComponent from './components/cat.component';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatListComponent />} />
        <Route path="/cats:id" element={<CatComponent />} />
      </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
