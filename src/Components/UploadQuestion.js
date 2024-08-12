import React, { useState } from 'react';
import axios from 'axios';

const UploadQuestions = () => {
  const [questions, setQuestions] = useState([{
    title: '',
    description: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: ''
  }]);
  const [currentPage, setCurrentPage] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleQuestionChange = (e, field) => {
    const newQuestions = [...questions];
    newQuestions[currentPage][field] = e.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      title: '',
      description: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: ''
    }]);
    setCurrentPage(questions.length);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://new-server-psi.vercel.app/api/questions', { questions });
      console.log('Questions submitted:', response.data);
      setSubmissionStatus('Submitted successfully');
      
      // Clear the form
      setQuestions([{
        title: '',
        description: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: ''
      }]);
      setCurrentPage(0);
    } catch (error) {
      console.error('Error submitting questions:', error);
      setSubmissionStatus('Failed to submit questions');
    }
  };

  return (
    <div className="question-container">
      <label className="question-label">Enter the question title:</label>
      <input
        type="text"
        value={questions[currentPage].title}
        onChange={(e) => handleQuestionChange(e, 'title')}
        placeholder="Enter question title"
        className="input-text"
      />
      <br />
      <label className="question-label">Please enter the question description:</label>
      <textarea
        value={questions[currentPage].description}
        onChange={(e) => handleQuestionChange(e, 'description')}
        placeholder="Write your question here..."
        rows="4"
        cols="50"
        className="textarea"
      ></textarea>
      <br />
      <label className="question-label">Option 1:</label>
      <input
        type="text"
        value={questions[currentPage].option1}
        onChange={(e) => handleQuestionChange(e, 'option1')}
        placeholder="Enter option 1"
        className="input-text"
      />
      <br />
      <label className="question-label">Option 2:</label>
      <input
        type="text"
        value={questions[currentPage].option2}
        onChange={(e) => handleQuestionChange(e, 'option2')}
        placeholder="Enter option 2"
        className="input-text"
      />
      <br />
      <label className="question-label">Option 3:</label>
      <input
        type="text"
        value={questions[currentPage].option3}
        onChange={(e) => handleQuestionChange(e, 'option3')}
        placeholder="Enter option 3"
        className="input-text"
      />
      <br />
      <label className="question-label">Option 4:</label>
      <input
        type="text"
        value={questions[currentPage].option4}
        onChange={(e) => handleQuestionChange(e, 'option4')}
        placeholder="Enter option 4"
        className="input-text"
      />
      <br />
      <label className="question-label">Correct Answer (Enter the option number):</label>
      <input
        type="text"
        value={questions[currentPage].correctAnswer}
        onChange={(e) => handleQuestionChange(e, 'correctAnswer')}
        placeholder="Enter the correct answer"
        className="input-text"
      />
      <br />
      <div className="button-group">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="nav-button"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, questions.length - 1))}
          disabled={currentPage === questions.length - 1}
          className="nav-button"
        >
          Next
        </button>
        <button onClick={addQuestion} className="action-button">Add Question</button>
      </div>
      <div>
        <button onClick={handleSubmit} className="submit-button">Submit All Questions</button>
      </div>
      {submissionStatus && <span className="submission-status">{submissionStatus}</span>}
    </div>
  );
};

export default UploadQuestions;
