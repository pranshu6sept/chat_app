import { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import MessageDisplay from "./MessageDisplay";
import MessageInput from "./MessageInput";
import { getUsers, getConversation, newMessages } from "../services/api.js";

const Home = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userData = await getUsers();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchConversation = async (userId) => {
    try {
      const conversationData = await getConversation({ senderId: userId, receiverId: "currentUserId" });
      setConversations(prevConversations => ({
        ...prevConversations,
        [userId]: conversationData
      }));
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const handleSelectMessage = async (user) => {
    setSelectedMessage(user);
    if (!conversations[user.id]) {
      await fetchConversation(user.id);
    }
  };

  const handleSendMessage = async (text) => {
    if (selectedMessage) {
      try {
        await newMessages({
          senderId: "currentUserId",
          receiverId: selectedMessage.id,
          conversationId: conversations[selectedMessage.id]?.id,
          text: text
        });
        await fetchConversation(selectedMessage.id);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar messages={users} onSelect={handleSelectMessage} />
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="flex items-center p-4 border-b bg-white">
              <img
                src={`https://i.pravatar.cc/40?u=${selectedMessage.username}`}
                alt={`${selectedMessage.username}`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="text-lg font-semibold">
                  {selectedMessage.username}
                </div>
                <div className="text-sm text-gray-500">Online</div>
              </div>
            </div>
            <MessageDisplay messages={conversations[selectedMessage.id] || []} />
            <MessageInput onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
