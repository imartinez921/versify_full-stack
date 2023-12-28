import React, { useState } from 'react';


// Consider writing as functional Component with React Hooks

const PlaylistEditForm = ({ currentPlaylist, editPlaylist }) => {
    
    const playlistId = currentPlaylist.id;
    const userId = currentPlaylist.user_id;
    const oldTitle = currentPlaylist.title;
    const oldDescription = currentPlaylist.description;
    
    // Set our local slices of State
    const [newTitle, setNewTitle] = useState(oldTitle);
    const [newDescription, setNewDescription] = useState(oldDescription);

    // Submit button onClick action
    const handleSubmit = (e) => {
        e.preventDefault();
        const editedPlaylist = {
            title: newTitle,
            description: newDescription,
        }
        editPlaylist(editedPlaylist, playlistId);
    }

    return (
        <>
            <form className="edit-playlist-form">
                {/* <div className="playlist-art-edit"></div> */}
                {/* TODO: Enable uploading and storing user's images for playlist */}
                <div className="edit-content">
                    <label htmlFor="title">
                        <input type="text" 
                            id="title" 
                            name="title"
                            maxLength="21"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                        />
                    </label>
                    <br />
                    <label htmlFor="description">
                        <textarea id="description" 
                            name="description" 
                            maxLength="300"
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                        />
                    </label>
                    <br />
                </div>
                <button className="save-button" onClick={handleSubmit}>
                    Save
                </button>
            </form>
            {/* <div className="edit-footer">
                By proceeding, you agree to give this Spotify clone access to the 
                image you choose to upload. Please make sure you have the right to upload the image.
            </div> */}
        </>
    )
}
export default PlaylistEditForm;