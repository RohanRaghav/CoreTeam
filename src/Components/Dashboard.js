import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [assessments, setAssessments] = useState([]);
  
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

  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="dashboard">
        <h1>Notifications</h1>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const assessment = assessments.find(a => a.username === notification.username);
              return (
                <li key={notification._id}>
                  <p>{notification.username} from Department {notification.Department} {notification.Year} Year has submitted {notification.questionTitle} answer in {notification.timeTaken} seconds of Course {notification.course}.
                  </p>
                  {assessment && (
                    <p>{notification.username} has submitted their daily assessment. <a href={`/access-pdf/${assessment._id}`}>Click here to access the file uploaded by {notification.username}</a></p>
                  )}
                  <small>{new Date(notification.timestamp).toLocaleString()}</small>
                </li>
              );
            })
          ) : (
            <p>No notifications available.</p>
          )}
        </ul>
      </div>      <div className='submission-containers'>
      <div className="submission-slotss">
        <a href='/UploadMarks'>
          <div className="submission-slote">
          <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
	 viewBox="0 0 512 512">
<g>
	<g>
		<path d="M506.08,181.074L371.343,46.341c-3.79-3.791-8.93-5.92-14.29-5.92H208.842c-11.162,0-20.211,9.049-20.211,20.211v390.737
			c0,11.162,9.049,20.211,20.211,20.211h282.947c11.162,0,20.211-9.049,20.211-20.211V195.364
			C512,190.005,509.87,184.863,506.08,181.074z M377.263,109.422l65.734,65.731h-65.734V109.422z M471.579,431.158H229.053V80.842
			h107.789v114.522c0,11.162,9.049,20.211,20.211,20.211h114.526V431.158z"/>
	</g>
</g>
<g>
	<g>
		<path d="M410.947,350.316H289.684c-11.162,0-20.211,9.049-20.211,20.211c0,11.162,9.049,20.211,20.211,20.211h121.263
			c11.162,0,20.211-9.049,20.211-20.211C431.158,359.365,422.109,350.316,410.947,350.316z"/>
	</g>
</g>
<g>
	<g>
		<path d="M410.947,269.474H289.684c-11.162,0-20.211,9.049-20.211,20.211c0,11.162,9.049,20.211,20.211,20.211h121.263
			c11.162,0,20.211-9.049,20.211-20.211C431.158,278.523,422.109,269.474,410.947,269.474z"/>
	</g>
</g>
<g>
	<g>
		<path d="M87.579,40.421c-27.214,0-50.296,18.024-57.941,42.76c-2.816-1.487-6.021-2.339-9.428-2.339
			C9.049,80.842,0,89.891,0,101.053v80.842c0,11.162,9.049,20.211,20.211,20.211c2.366,0,4.627-0.427,6.737-1.175v210.017
			c0,5.36,2.13,10.501,5.919,14.29l40.421,40.421c3.946,3.946,9.119,5.92,14.292,5.92c5.173,0,10.345-1.974,14.29-5.92
			l40.421-40.421c3.79-3.789,5.92-8.93,5.92-14.29V101.053C148.211,67.619,121.011,40.421,87.579,40.421z M107.789,402.576
			l-20.211,20.211l-20.211-20.211V269.474h40.421V402.576z M107.789,229.053H67.368v-128c0-11.145,9.066-20.211,20.211-20.211
			c11.144,0,20.211,9.065,20.211,20.211V229.053z"/>
	</g>
</g>
</svg>
            <form>
              <label style={{color:'black'}}>
              Click here to check marks.
              </label><br />
              <div style={{paddingTop:30}}>
              </div>
            </form>
          </div>
          </a>
      </div>
      <div className="submission-slotss">
      <a href='/PDFList'>
          <div className="submission-slote">
          <svg fill="#000000" width="80px" height="80px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path d="M1468.214 0v551.145L840.27 1179.089c-31.623 31.623-49.693 74.54-49.693 119.715v395.289h395.288c45.176 0 88.093-18.07 119.716-49.694l162.633-162.633v438.206H0V0h1468.214Zm129.428 581.3c22.137-22.136 57.825-22.136 79.962 0l225.879 225.879c22.023 22.023 22.023 57.712 0 79.848l-677.638 677.637c-10.616 10.503-24.96 16.49-39.98 16.49H903.516v-282.35c0-15.02 5.986-29.364 16.49-39.867Zm-920.005 548.095H338.82v112.94h338.818v-112.94Zm225.88-225.879H338.818v112.94h564.697v-112.94Zm734.106-202.5-89.561 89.56 146.03 146.031 89.562-89.56-146.031-146.031Zm-508.228-362.197H338.82v338.818h790.576V338.82Z" fillRule="evenodd"/>
</svg>

            <form>
              <label style={{color:'black'}}>
              Check submitted assessment by students.
              </label><br />
              <div style={{paddingTop:30}}>
              </div>
            </form>
          </div>
        </a>
      </div>
      <div className="submission-slotss">
      <a href='/UploadQuestion'>
          <div className="submission-slote">
          <svg fill="#000000" height="80px" width="80px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
	 viewBox="0 0 204 204">
<path d="M139.185,157.339h25.175l-27.223,29.022v-26.974C137.137,158.257,138.056,157.339,139.185,157.339z M108.805,44.654
	l7.761-1.004l-4.845-6.953L108.805,44.654z M179.518,5v142.339h-40.333c-6.644,0-12.048,5.405-12.048,12.048V204H29.482
	c-2.762,0-5-2.239-5-5V5c0-2.761,2.238-5,5-5h145.035C177.279,0,179.518,2.239,179.518,5z M95.746,65.76
	c0.568,0.208,1.148,0.307,1.721,0.307c2.038,0,3.953-1.256,4.694-3.281l2.765-7.546l18.084-2.34l4.595,6.594
	c0.973,1.395,2.526,2.142,4.106,2.142c0.987,0,1.984-0.292,2.854-0.898c2.266-1.579,2.822-4.695,1.244-6.96l-21.377-30.677
	c-0.008-0.011-0.019-0.02-0.027-0.031c-0.138-0.196-0.303-0.372-0.47-0.547c-0.061-0.064-0.113-0.141-0.177-0.201
	c-0.132-0.124-0.286-0.226-0.432-0.336c-0.117-0.088-0.225-0.189-0.348-0.266c-0.094-0.059-0.202-0.098-0.301-0.151
	c-0.193-0.103-0.384-0.209-0.588-0.285c-0.014-0.005-0.025-0.014-0.039-0.019c-0.117-0.043-0.237-0.057-0.354-0.091
	c-0.183-0.052-0.364-0.11-0.552-0.141c-0.166-0.028-0.33-0.03-0.496-0.04c-0.157-0.01-0.313-0.028-0.471-0.024
	c-0.169,0.005-0.333,0.034-0.5,0.056c-0.155,0.02-0.31,0.033-0.464,0.068c-0.166,0.038-0.324,0.099-0.486,0.154
	c-0.145,0.049-0.292,0.089-0.434,0.153c-0.192,0.086-0.369,0.197-0.549,0.306c-0.09,0.055-0.185,0.091-0.273,0.152
	c-0.01,0.007-0.018,0.017-0.028,0.024c-0.201,0.142-0.382,0.31-0.561,0.481c-0.061,0.058-0.132,0.107-0.19,0.167
	c-0.121,0.128-0.219,0.278-0.326,0.419c-0.092,0.121-0.197,0.234-0.276,0.362c-0.052,0.083-0.086,0.18-0.134,0.267
	c-0.111,0.205-0.222,0.409-0.303,0.626c-0.005,0.013-0.013,0.023-0.017,0.036L92.772,59.345
	C91.822,61.938,93.153,64.81,95.746,65.76z M108.899,152.339c0-2.761-2.238-5-5-5H53.25c-2.762,0-5,2.239-5,5c0,2.761,2.238,5,5,5
	h50.65C106.661,157.339,108.899,155.1,108.899,152.339z M130.157,121.839c0-2.761-2.238-5-5-5H53.25c-2.762,0-5,2.239-5,5
	c0,2.761,2.238,5,5,5h71.907C127.919,126.839,130.157,124.6,130.157,121.839z M145.75,91.339c0-2.761-2.238-5-5-5h-87.5
	c-2.762,0-5,2.239-5,5c0,2.761,2.238,5,5,5h87.5C143.512,96.339,145.75,94.1,145.75,91.339z M164.797,32.019
	c-0.354-2.737-2.852-4.672-5.601-4.317l-6.681,0.865l-0.865-6.681c-0.354-2.738-2.851-4.673-5.601-4.317
	c-2.738,0.354-4.672,2.862-4.317,5.6l0.865,6.681l-6.681,0.865c-2.738,0.354-4.672,2.861-4.317,5.6
	c0.326,2.521,2.477,4.359,4.953,4.359c0.213,0,0.43-0.014,0.648-0.042l6.681-0.865l0.865,6.681c0.326,2.521,2.477,4.359,4.953,4.359
	c0.213,0,0.43-0.014,0.647-0.042c2.738-0.354,4.672-2.862,4.317-5.6l-0.865-6.681l6.681-0.865
	C163.218,37.265,165.151,34.758,164.797,32.019z"/>
</svg>
            <form>
              <label style={{color:'black'}}>
                Upload bootcamp test questions
              </label><br />
              <div style={{paddingTop:30}}>
              </div>
            </form>
          </div>
</a>
      </div>
      <div className="submission-slotss">
      <a href='/Notify'>
          <div className="submission-slote">
          <svg fill="#000000" width="80px" height="80px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path d="M1468.214 0v551.145L840.27 1179.089c-31.623 31.623-49.693 74.54-49.693 119.715v395.289h395.288c45.176 0 88.093-18.07 119.716-49.694l162.633-162.633v438.206H0V0h1468.214Zm129.428 581.3c22.137-22.136 57.825-22.136 79.962 0l225.879 225.879c22.023 22.023 22.023 57.712 0 79.848l-677.638 677.637c-10.616 10.503-24.96 16.49-39.98 16.49H903.516v-282.35c0-15.02 5.986-29.364 16.49-39.867Zm-920.005 548.095H338.82v112.94h338.818v-112.94Zm225.88-225.879H338.818v112.94h564.697v-112.94Zm734.106-202.5-89.561 89.56 146.03 146.031 89.562-89.56-146.031-146.031Zm-508.228-362.197H338.82v338.818h790.576V338.82Z" fillRule="evenodd"/>
</svg>

            <form>
              <label style={{color:'black'}}>
              Upload guidance and important notifications for student.
              </label><br />
              <div style={{paddingTop:30}}>
              </div>
            </form>
          </div>
        </a>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
