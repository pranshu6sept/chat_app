import React, { useState } from 'react';
import Sidebar from './SideBar';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

const messagesData = [
  { id: 1, name: 'Claire', daysAgo: '12 days', text: '2nd Hello, I wanted to know more about the product design position opened at Atlassian.' },
  { id: 2, name: 'Parik', daysAgo: '11 days', text: '3rd Hello, I wanted to know more about the product design position opened at Atlassian.' },
  { id: 3, name: 'Naina', daysAgo: '11 days', text: '4th Hello, I wanted to know more about the product design position opened at Atlassian.' },
  { id: 4, name: 'John', daysAgo: '11 days', text: '5th Hello, I wanted to know more about the product design position opened at Atlassian.' },
  { id: 5, name: 'Kristine', daysAgo: '11 days', text: 'Hello, I wanted to know more about the product design position opened at Atlassian.' }
];

const conversationData = {
  1: [
    { from: 'Claire', text: '2nd Hello, I wanted to know more about the product design position opened at Atlassian.' },
    { from: 'You', text: 'Sure, tell us. what do you wanna know?' },
    { from: 'Claire', text: 'I’m interested in the team culture and daily responsibilities.' }
  ],
  2: [
    { from: 'Parik', text: '3rd Hello, I wanted to know more about the product design position opened at Atlassian.' },
    { from: 'You', text: 'Can you specify what you’re curious about?' },
    { from: 'Parik', text: 'What are the growth opportunities in this role?' }
  ],
  3: [
    { from: 'Naina', text: '4th Hello, I wanted to know more about the product design position opened at Atlassian.' },
    { from: 'You', text: 'Let me know your specific questions.' },
    { from: 'Naina', text: 'How much experience do you require for this position?' }
  ],
  4: [
    { from: 'John', text: '5th Hello, I wanted to know more about the product design position opened at Atlassian.' },
    { from: 'You', text: 'What exactly would you like to know?' },
    { from: 'John', text: 'Is the position remote or on-site?' }
  ],
  5: [
    { from: 'Kristine', text: 'Hello, I wanted to know more about the product design position opened at Atlassian.' },
    { from: 'You', text: 'Sure, tell us. what do you wanna know?' },
    { from: 'Kristine', text: 'Take this part of your letter seriously because it\'s likely one of your first genuine opportunities to make a personal, positive impression on a prospective employer. You want your words to invite them to keep reading and to convey exactly why you\'re the best choice for their open position. Review your language to ensure it\'s concise and informative. If you\'re applying to multiple positions, take great care to edit your letter so that the first paragraph is personal and relevant to the exact position you want.' },
    { from: 'You', text: 'You\'ve a good folio' },
    { from: 'You', text: 'However we’re looking for someone with a little more experience!' }
  ]
};

const Home = () =>  {

  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleSendMessage = (text) => {
    // Handle message sending
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar messages={messagesData} onSelect={handleSelectMessage} />
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="flex items-center p-4 border-b bg-white">
              <img src={`https://i.pravatar.cc/40?u=${selectedMessage.name}`} alt={`${selectedMessage.name}`} className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="text-lg font-semibold">{selectedMessage.name}</div>
                <div className="text-sm text-gray-500">Typing...</div>
              </div>
            </div>
            <MessageDisplay messages={conversationData[selectedMessage.id]} />
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
}

export default Home;
