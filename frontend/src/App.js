import React from 'react';
import PhotoForm from './components/PhotoForm';
import PhotoList from './components/PhotoList';
import './App.css'

function App() {
  return (
    <div>
      <h1 className='Heading'>Photo Library</h1>
      <PhotoForm />
      <PhotoList />
    </div>
  );
}

export default App;
