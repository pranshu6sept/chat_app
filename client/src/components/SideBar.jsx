import React from 'react'
import { Button } from '@mui/material';
import MessageItem from './MessageItem';
import { useClerk } from '@clerk/clerk-react';


const Sidebar = ({ messages, onSelect }) => {

    const { signOut } = useClerk();

    return (
      <div className="w-[400px] bg-white border-r overflow-y-auto">
        <div className="p-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center justify-start p-4 space-x-2 border-b">
          <Button variant="outlined" className="text-sm font-semibold text-gray-600 hover:text-orange-500">All</Button>
          <Button variant="outlined" className="text-sm font-semibold text-gray-600 hover:text-orange-500">Unread</Button>
          <Button variant="outlined" className="text-sm font-semibold text-gray-600 hover:text-orange-500">Archived</Button>
          <Button variant="outlined" className="text-sm font-semibold text-gray-600 hover:text-orange-500">Blocked</Button>
        </div>
        {messages.map(message => (
          <MessageItem
            key={message.id}
            name={message.name}
            daysAgo={message.daysAgo}
            text={message.text}
            onClick={() => onSelect(message)}
          />
        ))}
        <Button onClick={() => signOut()}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
        >
            Sign Out
        </Button>
      </div>
    );
  }

export default Sidebar