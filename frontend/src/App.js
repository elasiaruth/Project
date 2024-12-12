import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [mediaList, setMediaList] = useState([]);
  const [newMedia, setNewMedia] = useState({ title: "", year: "", media_type: "" });
  const [filter, setFilter] = useState("");
  const [editMedia, setEditMedia] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get("/media/");
      setMediaList(response.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const handleCreateMedia = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/media/", newMedia);
      setMediaList([...mediaList, response.data]);
      setNewMedia({ title: "", year: "", media_type: "" });
    } catch (error) {
      console.error("Error creating media:", error);
    }
  };

  const handleDeleteMedia = async (id) => {
    try {
      await axios.delete(`/media/${id}/`);
      setMediaList(mediaList.filter((media) => media.id !== id));
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  const handleEditMedia = (media) => {
    setEditMedia(media);
  };

  const handleUpdateMedia = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/media/${editMedia.id}/`, editMedia);
      setMediaList(mediaList.map((media) => (media.id === editMedia.id ? response.data : media)));
      setEditMedia(null);
    } catch (error) {
      console.error("Error updating media:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredMedia = filter
    ? mediaList.filter((media) => media.media_type === filter)
    : mediaList;

  return (
    <div className="app">
      <h1>Media Management</h1>

      {editMedia ? (
        <form onSubmit={handleUpdateMedia}>
          <input
            type="text"
            placeholder="Title"
            value={editMedia.title}
            onChange={(e) => setEditMedia({ ...editMedia, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={editMedia.year}
            onChange={(e) => setEditMedia({ ...editMedia, year: e.target.value })}
            required
          />
          <select
            value={editMedia.media_type}
            onChange={(e) => setEditMedia({ ...editMedia, media_type: e.target.value })}
            required
          >
            <option value="">Select Type</option>
            <option value="MO">Movie</option>
            <option value="SR">Series</option>
            <option value="SH">Short</option>
          </select>
          <button type="submit">Update Media</button>
          <button type="button" onClick={() => setEditMedia(null)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleCreateMedia}>
          <input
            type="text"
            placeholder="Title"
            value={newMedia.title}
            onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={newMedia.year}
            onChange={(e) => setNewMedia({ ...newMedia, year: e.target.value })}
            required
          />
          <select
            value={newMedia.media_type}
            onChange={(e) => setNewMedia({ ...newMedia, media_type: e.target.value })}
            required
          >
            <option value="">Select Type</option>
            <option value="MO">Movie</option>
            <option value="SR">Series</option>
            <option value="SH">Short</option>
          </select>
          <button type="submit">Add Media</button>
        </form>
      )}

      <div>
        <label>Filter by Type:</label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="MO">Movie</option>
          <option value="SR">Series</option>
          <option value="SH">Short</option>
        </select>
      </div>

      <ul>
        {filteredMedia.map((media) => (
          <li key={media.id}>
            {media.title} ({media.year}) - {media.media_type} &ensp;
            <button onClick={() => handleEditMedia(media)}>Edit</button>
            <button onClick={() => handleDeleteMedia(media.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;