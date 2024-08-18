import React from 'react'

const MessageDisplay = ({ messages }) => {
    return (
      <div className="flex-grow p-4 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.from === 'You' ? 'text-right' : 'text-left'}`}>
            <div className="text-sm text-gray-600 mb-1">{msg.from}</div>
            <div className={`inline-block p-3 rounded-lg ${msg.from === 'You' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    );
  }

export default MessageDisplay