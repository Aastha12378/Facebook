import React, { useEffect, useState } from 'react';
import { request } from '../../util/Request';
import FriendRequest from './FriendsRequest';
import Friends from '../friends/Friends';

const FriendRequests = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const fetchFriends = async () => {
        const friends = await request(`/user/find/userfriends/${user._id}`, "GET")
        if(friends?.data?.length>0)setFriends(friends?.data)
      }
    const fetchRequests = async () => {
        try {
            const headers = {'Authorization': `Bearer ${token}`}
            const data = await request(`/user/pendingReq/${user._id}`, 'GET', headers);
            if(data.user){
                setFriendRequests(data.pendingUsers);
                localStorage.setItem('user',JSON.stringify(data.user))
            }
        } catch (error) {
            console.error('Error fetching friend requests:', error);
        }
    };
    useEffect(() => {
        fetchRequests();
        fetchFriends()
    }, [user._id]);

    
    const handleRespond = async (requestId, response) => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            }

            const responseData = await request(`/friend/respond/${requestId}/${response}`, 'PUT', headers);

            if (responseData.success) {
                setFriendRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));
            }
        } catch (error) {
            console.error('Error responding to friend request:', error);
        }
    };

    return (
        <>
        <div className="friend-requests justify-content-between">
            <h2>Friend Requests</h2>
            {friendRequests?.length>0 ? friendRequests?.map((request) => (
                <FriendRequest key={request._id} requestId={request._id}
                    friend={request} onRespond={handleRespond} fetchRequests={fetchRequests} fetchFriends={fetchFriends}/>))
                    :<h5 style={{ textAlign: 'center' }}>You have no friend requests</h5>}
        </div>
        <Friends friends={friends}/>
</>
    );
};

export default FriendRequests;
