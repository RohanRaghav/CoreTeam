import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Designation, setDesignation] = useState('');
    const [PhNumber, setPhNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmition = () => {
        navigate('/Dashboard');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { username, Designation, PhNumber, Email };

        console.log('Submitting data:', JSON.stringify(data, null, 2));
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('Designation', Designation);

        try {
            const response = await axios.post('https://new-server-psi.vercel.app/submit-memberinfo', data);
            console.log('Server response:', response.data);
            handleSubmition();
        } catch (error) {
            if (error.response) {
                console.error('Error submitting form:', error.response.data);
            } else {
                console.error('Error submitting form:', error.message);
            }
        }
    };

    return (
        <div>
            <div className="forming">
                <div className='formhandle'>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label className='info'>
                            Username:
                            <input
                                type="text"
                                placeholder='Name'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='input'
                                required
                            />
                        </label>
                        <br />
                        <label className='info'>
                            Designation:
                            <input
                                type="text"
                                className='input'
                                placeholder='Designation'
                                value={Designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required
                            />
                        </label>
                        <label className='info'>
                            Email:
                            <input
                                type="text"
                                placeholder='Example@gmail.com'
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='input'
                                required
                            />
                        </label>
                        <div className="ui-wrapper">
                            <div className="input-wrapper">
                                <legend>
                                    <label htmlFor="phonenumber">
                                        Phonenumber*
                                    </label>
                                </legend>
                                <div className="textfield">
                                    <input
                                        pattern="\d+"
                                        maxLength="10"
                                        id="phonenumber"
                                        type="text"
                                        value={PhNumber}
                                        onChange={(e) => setPhNumber(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ alignItems: 'center' }}>
                            <button type="submit" className='infobtn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;
