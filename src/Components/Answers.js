import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Answers = () => {
    const [notifications, setNotifications] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://new-server-psi.vercel.app/api/notifications');
        console.log('Fetched notifications:', response.data); // Debug log
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications');
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      
    </div>
  )
}

export default Answers
