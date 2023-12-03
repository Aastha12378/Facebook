import React from 'react';
import { request } from '../../util/Request';

const FriendRequest = ({ requestId, senderUsername, onRespond }) => {
  const handleRespond = async (response) => {
    try {
      const data = await request('/friend/respond', 'POST', { requestId, response });
      console.log("🚀 ~ file: FriendsRequest.jsx:8 ~ handleRespond ~ data:", data)
      onRespond(requestId, response);
    } catch (error) {
      console.error('Error responding to friend request:', error);
    }
  };

  return (
    <div className="friend-request">
      <p>{senderUsername} sent you a friend request</p>
      <button onClick={() => handleRespond('accept')}>Accept</button>
      <button onClick={() => handleRespond('reject')}>Reject</button>
    </div>
    // <div className="friend-request">
    //   <p> sent you a friend request</p>
    //   <button className='btn btn-primary' onClick={() => handleRespond('accept')}>Accept</button>
    //   <button className='btn btn-primary' onClick={() => handleRespond('reject')}>Reject</button>
    // </div>
  );
};

export default FriendRequest;
