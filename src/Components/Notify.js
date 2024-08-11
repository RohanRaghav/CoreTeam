import React, { useState } from 'react';

const Notify = () => {
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setFeedback('Content cannot be empty');
            return;
        }

        try {
            const response = await fetch('https://new-server-psi.vercel.app/api/uploadContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (response.ok) {
                setFeedback('Content uploaded successfully!');
                setMessage(''); // Clear the textarea after successful upload
            } else {
                setFeedback('Failed to upload content');
            }
        } catch (error) {
            console.error('Error uploading content:', error);
            setFeedback('An error occurred while uploading content');
        }
    };

    return (
        <div className="content-upload-container">
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="content" className="form-label">Enter your content:</label>
          <textarea
            id="content"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your content here..."
            rows="6"
            className="form-textarea"
          />
          <button type="submit" className="form-button">Upload Content</button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
        </div>
    );
};

export default Notify;
