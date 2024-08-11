import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadMarks = ({ username }) => {
  const [fetchedNotifications, setFetchedNotifications] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://new-server-psi.vercel.app/api/notifications');
        console.log('Fetched notifications:', response.data); // Debug log
        setFetchedNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get('https://new-server-psi.vercel.app/api/assessments');
        setAssessments(response.data);
      } catch (err) {
        console.error('Error fetching assessments:', err);
        setError('Failed to load PDF files');
      }
    };

    fetchAssessments();
  }, []);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  if (error) return <div>{error}</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <center><h1>Upload Marks</h1></center>
      <div className="answers-section">
        <h2>Details for {username}</h2>
        {fetchedNotifications.length > 0 ? (
          <>
            {fetchedNotifications.slice(currentPage * 10, (currentPage + 1) * 10).map((notification, index) => (
              <div className="answer-card" key={notification._id || index}>
                <p>Name: {notification.username}</p>
                <p>UID: {notification.UID}</p>
                <p>Course: {notification.course || 'N/A'}</p>
                <p>Department: {notification.Department}</p>
                <p>Time Taken: {notification.timeTaken || 'N/A'} seconds</p>
                <p>Total Marks: {notification.totalMarks || 'N/A'}</p>
              </div>
            ))}
            <div className="pagination-buttons">
              <button onClick={handlePrevPage} disabled={currentPage === 0}>Previous Page</button>
              <button onClick={handleNextPage} disabled={(currentPage + 1) * 10 >= fetchedNotifications.length}>Next Page</button>
            </div>
          </>
        ) : (
          <p className="no-answers">No details available.</p>
        )}
      </div>
    </div>
  );
};

export default UploadMarks;