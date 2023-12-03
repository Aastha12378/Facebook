import React, { useEffect, useState } from 'react';
import { request } from '../../util/Request';
import FriendRequest from './FriendsRequest';

const FriendRequests = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`
                }
                const data = await request(`/friend/request/${user._id}`, 'GET', headers);
                setFriendRequests(data);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };
        fetchFriendRequests();
    }, [user._id]);


    const handleRespond = (requestId, response) => {
        // console.log("🚀 ~ file: FriendRequests.js.jsx:29 ~ handleRespond ~ handleRespond:", handleRespond)
        setFriendRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));
    };

    return (
        <div className="friend-requests">
            <h2>Friend Requests</h2>
            {friendRequests.map((request) => (
                <FriendRequest key={request._id} requestId={request._id}
                    senderUsername={request.senderId.username} onRespond={handleRespond} />
            ))}
        </div>
    );
};

export default FriendRequests;
