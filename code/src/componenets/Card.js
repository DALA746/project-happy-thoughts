import React from 'react';
import moment from 'moment';

export const Card = (thought, handleDeleteMessage, handleLikesIncrease) => {
  return (
    <div key={thought.thought._id} className='thought-card'>
      <p>{thought.thought.message}</p>
      <p style={{ fontStyle: 'italic' }}>
        Posted by: {thought.thought.username}
      </p>
      <div className='button-container'>
        <button
          className='likes-button'
          onClick={() => handleLikesIncrease(thought.thought._id)}>
          &hearts; {thought.thought.hearts}
        </button>

        <button
          className='likes-button'
          onClick={() => handleDeleteMessage(thought.thought._id)}>
          <i className='fas fa-trash-alt'></i>
        </button>
      </div>
      <p className='date'>{moment(thought.thought.createdAt).fromNow()}</p>
    </div>
  );
};
