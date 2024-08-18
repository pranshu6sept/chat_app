import { useContext, useEffect, useState } from 'react';


import { UserContext } from '../context/UserProvider';
import { AccountContext } from '../context/AccountProvider';

import { setConversation, getConversation } from '../services/api';
import { formatDate } from '../utils/common-utils';

const MessageItem = ({user }) => {


  const url = user.picture || emptyProfilePicture;
    
  const { setPerson } = useContext(UserContext);
  const { account, newMessageFlag }  = useContext(AccountContext);

  const [message, setMessage] = useState({});

  useEffect(() => {
      const getConversationMessage = async() => {
          const data = await getConversation({ senderId: account.id, receiverId: user.id });
          setMessage({ text: data?.message, timestamp: data?.updatedAt });
      }
      getConversationMessage();
  }, [newMessageFlag]);

  const getUser = async () => {
      setPerson(user);
      await setConversation({ senderId: account.id, receiverId: user.id });
  }
  
        return (
          <div onClick={getUser} className="p-4 cursor-pointer hover:bg-gray-50 border-b flex items-center">
            <img src={url} alt={`${username}`} className="w-8 h-8 rounded-full mr-3" />
            <div>
              <div className="text-sm text-black font-semibold">{username} <span className="text-gray-500 text-xs"> {formatDate(message?.timestamp)}</span></div>
              <div className="text-gray-700 text-xs mt-1">{message}</div>
            </div>
          </div>
        );
}

export default MessageItem