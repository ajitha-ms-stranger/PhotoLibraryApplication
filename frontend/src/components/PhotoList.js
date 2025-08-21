import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Get Photo funcctionality

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/photos/')
      .then(res => {
        console.log("Photos from API:", res.data); // ✅ confirm data
        setPhotos(res.data);
        setFilteredPhotos(res.data); // ✅ show all by default
      })
      .catch(err => {
        console.error('Error fetching photos:', err);
      });
  }, []);

  // Search Photo

  const handleSearch = () => {
    const query = searchInput.toLowerCase();

    const filtered = photos.filter(photo => {
      const title = photo.title?.toLowerCase() || '';
      const description = photo.description?.toLowerCase() || '';
      const tags = photo.tags?.toLowerCase() || '';

      return title.includes(query) || description.includes(query) || tags.includes(query);
    });

    console.log("Filtered results:", filtered);
    setFilteredPhotos(filtered);
  };

  // Delete Photo

  const deletePhoto = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/photos/${id}/`)
      .then(() => {
        const updatedPhotos = photos.filter(photo => photo.id !== id);
        setPhotos(updatedPhotos);
        setFilteredPhotos(updatedPhotos);
      })
      .catch(err => {
        console.error("Delete failed:", err);
      });
  };



  return (
    <div>

      {/* SEARCH PHOTO CODE */}

        <div className='search-bar'>
              <input
                type="text"
                placeholder="Search by title, tags, or description"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
        </div>


      {/* SEARCH RESULTS PAGE */}

        {filteredPhotos.length === 0 && <p>No photos found.</p>}

        <div className='photo-grid'>
        {filteredPhotos.map(photo => (

          <div className="photo-card" key={photo.id}>
              <h3>{photo.title}</h3>
              <p><strong>Description:</strong> {photo.description}</p>
              <p><strong>Tags:</strong> {photo.tags}</p>
              <p><strong>Directory:</strong> {photo.directory}</p>
              console.log("Image path:", photo.image);
              <img
              src={photo.image.startsWith('http') ? photo.image : `http://127.0.0.1:8000${photo.image}`}
              alt={photo.title}
               style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
            />

              <button onClick={() => deletePhoto(photo.id)} style={{ marginTop: '10px' }}>Delete</button>
          </div>

        
    
        ))}
        </div>
    </div>
  );
}

export default PhotoList;


