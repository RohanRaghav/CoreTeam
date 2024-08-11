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
        <ul class="assessment-list">
        {assessments.map((assessment) => (
          <li key={assessment._id} class="assessment-item">
            <div class="assessment-content">
              <a
                href={`/api/assessments/${assessment._id}`}
                target="_blank"
                rel="noopener noreferrer"
                class="assessment-link"
              >
                Click this to access the file uploaded by {assessment.username}
              </a>
              <button
                class="download-button"
                onClick={() => window.open(`/api/assessments/${assessment._id}`, '_blank')}
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
