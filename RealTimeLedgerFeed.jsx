import React, { useState, useEffect, useCallback } from 'react';
import { initializeWebSocketFeed } from '../services/websocket';

export const RealTimeLedgerFeed = ({ channelId, showToast }) => {
  const [feedItems, setFeedItems] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  const handleIncomingMessage = useCallback((message) => {
    if (!message.id) {
      console.warn("Received malformed ledger stream packet: missing structural unique identifier.");
      return;
    }

    setFeedItems((prevItems) => [message, ...prevItems.slice(0, 49)]);
  }, []);

  useEffect(() => {
    if (!channelId) {
      console.error("Lifecycle initialization blocked: terminal dependency parameter channelId evaluates to an invalid state.");
      return;
    }

    let socketInstance = null;

    try {
      setConnectionStatus('connecting');
      socketInstance = initializeWebSocketFeed(channelId);

      socketInstance.on('message', handleIncomingMessage);
      socketInstance.on('open', () => setConnectionStatus('connected'));
      
      socketInstance.on('error', (err) => {
        console.error("Underlying socket transport layer encountered an unhandled execution exception:", err);
        setConnectionStatus('failed');
      });

    } catch (exception) {
      console.error("Critical error established during stream instantiation sequence:", exception);
      setConnectionStatus('failed');
    }

    return () => {
      if (socketInstance) {
        socketInstance.close();
      }
    };
  }, [channelId, handleIncomingMessage]);

  return (
    <div className="ledger-stream-container">
      <div className={`status-badge ${connectionStatus}`}>
        Stream Registry Status: {connectionStatus}
      </div>
      <ul className="ledger-item-list">
        {feedItems.map((item) => (
          <li key={item.id} className="ledger-row-entry">
            <span className="row-type">{item.type}</span>
            <span className="row-value">₹{item.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};