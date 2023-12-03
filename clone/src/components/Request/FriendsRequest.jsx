import React from 'react';
import { request } from '../../util/Request';
import person from '../../img/person1.jpg'

const FriendRequest = ({ requestId, friend, onRespond,fetchRequests,fetchFriends }) => {

  const token = localStorage.getItem("token");

  const handleRespond = async (response) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      }

      const data = await request(`/friend/respond/${requestId}/${response}`, 'PUT', headers, { requestId, response });
      console.log(data);
      onRespond(requestId, response);
    } catch (error) {
      console.error('Error responding to friend request:', error);
    }
  };
  const hanldeAcceptRequest=async()=>{
    try {
      const headers = {'Authorization': `Bearer ${token}`}
      let data = await request(`/user/accept-request/${friend?._id}`, "PUT", headers)
     if(data) {fetchRequests(); fetchFriends()}
    } catch (error) {
      console.error(error)
    }
  }

  const handleRejectRequest = async () => {
    try {
      const headers = {'Authorization': `Bearer ${token}`}
      let data = await request(`/user/reject-request/${friend?._id}`, "PUT", headers)
      if(data) {fetchRequests();}
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="d-flex friend-request justify-content-between">
      <div className="d-flex  align-items-center gap-1">
        <img src={friend?.profilePic ? `http://localhost:3001/images/` + friend?.profilePic : person} className="personImg img-fluid" alt='person' />
        <h5> {friend.username} </h5>
      </div>
      <div className="d-flex gap-2">
        <button className='btn btn-primary' onClick={() => hanldeAcceptRequest()}>Accept</button>
        <button className='btn btn-primary' onClick={() => handleRejectRequest()}>Reject</button>
      </div>
    </div>
  );
};

export default FriendRequest;
