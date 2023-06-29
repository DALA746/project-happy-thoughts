import React, { useState, useEffect } from 'react';
import { Spinner } from 'componenets/Spinner';
import moment from 'moment';

import { API_URL, LIKES_URL, DELETE_URL } from './utils/urls';

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState('');
  const [username, setUsername] = useState('');
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    getRequest();
  }, []);

  const getRequest = async () => {
    setSpinner(true);
    const response = await fetch(API_URL);
    const data = await response.json();
    setThoughts(data.response);
    setTimeout(() => setSpinner(false), 1000);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: newThought, username })
    };

    fetch(API_URL, options)
      .then((res) => res.json())
      .then(() => {
        getRequest();
        setNewThought('');
        setUsername('');
      })
      .catch((error) => {
        alert(`Something is wrong! Error message: ${error}`);
        console.log(error);
      });
  };

  const handleLikesIncrease = (thoughtId) => {
    const options = {
      method: 'POST'
    };
    fetch(LIKES_URL(thoughtId), options)
      .then((res) => res.json())
      .then(() => getRequest())
      .catch((error) => {
        alert(`Something is wrong! Error message: ${error}`);
        console.log(error);
      });
  };

  const handleDeleteMessage = (thoughtId) => {
    const options = {
      method: 'DELETE'
    };
    fetch(DELETE_URL(thoughtId), options)
      .then((res) => res.json())
      .then(() => {
        setSpinner(true);
        getRequest();
      })
      .catch((error) => {
        alert(`Something is wrong! Error message: ${error}`);
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="form">
        <h1 className="form-title">What makes you happy? &hearts;</h1>
        <textarea
          id="newThought"
          type="text"
          maxLength="140"
          value={newThought}
          placeholder="Write your happy thought here..."
          onChange={(e) => setNewThought(e.target.value)}
        />
        <p style={{ color: newThought.length > 130 ? 'red' : 'green' }}>
          {newThought.length}/140
        </p>
        <label htmlFor="Name">
          Your name:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button
          className="form-button"
          type="submit"
          disabled={newThought.length < 5 || newThought.length > 140}>
          &hearts; Send &hearts;
        </button>
      </form>

      {thoughts.map((thought) =>
        spinner ? (
          <Spinner key={thought._id} />
        ) : (
          <div key={thought._id} className="thought-card">
            <p>{thought.message}</p>
            <p style={{ fontStyle: 'italic' }}>Posted by: {thought.username}</p>
            <div className="button-container">
              <button
                className="likes-button"
                onClick={() => handleLikesIncrease(thought._id)}>
                &hearts; {thought.hearts}
              </button>

              <button
                className="likes-button"
                onClick={() => handleDeleteMessage(thought._id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
            <p className="date">{moment(thought.createdAt).fromNow()}</p>
          </div>
        )
      )}
    </>
  );
};
