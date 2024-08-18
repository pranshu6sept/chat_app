import React, { useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';

const MessageInput = ({ onSend }) => {
    const [text, setText] = useState('');
  
    const handleSend = () => {
      if (text.trim()) {
        onSend(text);
        setText('');
      }
    };
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
    };
  
    return (
      <div className="flex gap-x-2 items-center p-4 border-t bg-white">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Type your message here"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <label htmlFor="file-upload" className="bg-gray-200 p-2 rounded-r-md mr-2 cursor-pointer">
          <AttachmentIcon />
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <Button variant="outlined" onClick={handleSend} color="primary" className="bg-orange-500 text-white p-2 rounded-md">
          <SendIcon />
        </Button>
      </div>
    );
  }

export default MessageInput