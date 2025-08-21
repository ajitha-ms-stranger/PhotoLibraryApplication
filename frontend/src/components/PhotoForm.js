import React, { useState } from 'react';
import axios from 'axios';

function PhotoForm({ onUpload }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [directory, setDirectory] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('directory', directory);
    formData.append('image', image);

    axios.post('http://127.0.0.1:8000/api/photos/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      
      // Clear form
      setTitle('');
      setDescription('');
      setTags('');
      setDirectory('');
      setImage(null);
      onUpload(); // Refresh photo list
    })
    .catch(err => {
      console.error('Upload error:', err);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={tags}
        onChange={e => setTags(e.target.value)}
        placeholder="Tags"
      />
      <input
        type="text"
        value={directory}
        onChange={e => setDirectory(e.target.value)}
        placeholder="Directory"
      />
      <input
        type="file"
        onChange={e => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default PhotoForm;
