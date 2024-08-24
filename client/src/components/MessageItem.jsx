import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { AccountContext } from '../context/AccountProvider';
import { setConversation, getConversation, getUser } from '../services/api';
import { formatDate } from '../utils/common-utils';

const MessageItem = ({ userId }) => {
  const { setPerson } = useContext(UserContext);
  const { account, newMessageFlag } = useContext(AccountContext);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: '', timestamp: null });

  useEffect(() => {
    const fetchUserAndConversation = async () => {
      try {
        const userData = await getUser(userId);
        setUser(userData);

        const conversationData = await getConversation(account.id, userId);
        setMessage({ text: conversationData.lastMessage, timestamp: conversationData.updatedAt });
      } catch (error) {
        console.error('Error fetching user or conversation:', error);
      }
    };
    fetchUserAndConversation();
  }, [account.id, userId, newMessageFlag]);

  const handleUserClick = async () => {
    setPerson(user);
    try {
      await setConversation(account.id, userId);
    } catch (error) {
      console.error('Error setting conversation:', error);
    }
  };
  
  if (!user) return null; // Or a loading indicator

  const url = user.profilePicture || '/default-profile-picture.png';

  return (
    <div onClick={handleUserClick} className="p-4 cursor-pointer hover:bg-gray-50 border-b flex items-center">
      <img src={url} alt={`${user.name}'s profile`} className="w-8 h-8 rounded-full mr-3" />
      <div>
        <div className="text-sm text-black font-semibold">
          {user.name} <span className="text-gray-500 text-xs">{formatDate(message.timestamp)}</span>
        </div>
        <div className="text-gray-700 text-xs mt-1">{message.text}</div>
      </div>
    </div>
  );
};

export default MessageItem;