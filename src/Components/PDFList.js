import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PDFList = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get('https://new-server-psi.vercel.app/api/assessments');
        setAssessments(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching assessments:', err);
        setError('Failed to load PDF files');
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='addjust'>
      {assessments.length > 0 ? (
        <ul className="assessment-list">
          {assessments.map((assessment) => (
            <li key={assessment._id} className="assessment-item">
              <div className="assessment-content">
                <a
                  href={assessment.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="assessment-link"
                >
                  Click this to access the file uploaded by {assessment.username} with uid: {assessment.UID} of day: {assessment.day}
                </a>
                <button
                  className="download-button"
                  onClick={() => window.open(assessment.fileUrl, '_blank')}
                >
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No PDF files available</p>
      )}
    </div>
  );
};

export default PDFList;
