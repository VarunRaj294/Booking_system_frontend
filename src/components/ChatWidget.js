import React, { useState, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "How do I make a booking?",
    "What are the cancellation policies?",
    "Can I modify my booking?",
    "What amenities are available?"
  ]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setError(null);
  };

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
    setError(null);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Booking-related responses
    if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('booking')) {
      return "To make a booking, please follow these steps:\n1. Select your desired property\n2. Choose your check-in and check-out dates\n3. Select the number of guests\n4. Click on 'Book Now'\n5. Fill in your details and complete the payment";
    }
    
    if (lowerMessage.includes('cancel') || lowerMessage.includes('cancellation')) {
      return "Our cancellation policy is as follows:\n- Free cancellation up to 24 hours before check-in\n- 50% refund for cancellations within 24 hours of check-in\n- No refund for no-shows";
    }
    
    if (lowerMessage.includes('modify') || lowerMessage.includes('change')) {
      return "You can modify your booking by:\n1. Logging into your account\n2. Going to 'My Bookings'\n3. Selecting the booking you want to modify\n4. Clicking 'Modify Booking'\nNote: Changes are subject to availability and may affect pricing";
    }
    
    if (lowerMessage.includes('amenities') || lowerMessage.includes('facilities')) {
      return "Our properties typically include these amenities:\n- Free WiFi\n- Air conditioning\n- Kitchen facilities\n- Parking\n- 24/7 support\n- Housekeeping services\nSpecific amenities may vary by property";
    }
    
    if (lowerMessage.includes('check-in') || lowerMessage.includes('check out')) {
      return "Standard check-in and check-out times:\n- Check-in: 3:00 PM\n- Check-out: 11:00 AM\nEarly check-in and late check-out may be available upon request, subject to availability";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('payment')) {
      return "Pricing varies based on:\n- Property type and size\n- Season and demand\n- Length of stay\n- Number of guests\nAll prices include taxes and fees. Payment can be made via credit card, debit card, or bank transfer";
    }
    
    // Default responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I help you with your booking today?";
    }
    
    if (lowerMessage.includes('help')) {
      return "I can help you with:\n- Making a booking\n- Modifying existing bookings\n- Cancellation policies\n- Check-in/check-out information\n- Property amenities\n- Pricing and payment\nWhat would you like to know?";
    }
    
    // If no specific match, provide a general response
    return "I'm here to help with booking-related questions. You can ask about:\n- Making a booking\n- Cancellation policies\n- Modifying bookings\n- Property amenities\n- Check-in/check-out times\n- Pricing and payment options";
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message to chat
    const userMessage = { text: inputMessage, sender: 'user', timestamp: new Date().toISOString() };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get bot response
      const botResponse = getBotResponse(inputMessage);

      // Add bot response to chat
      setMessages(prevMessages => [...prevMessages, { 
        text: botResponse, 
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error processing message:', error);
      setError('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-widget">
      <button className="chat-button" onClick={toggleChat}>
        💬
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Booking Assistant</h3>
            <div className="header-buttons">
              <button className="clear-button" onClick={clearChatHistory} title="Clear chat history">
                🗑️
              </button>
              <button onClick={toggleChat}>×</button>
            </div>
          </div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>Hello! I'm your booking assistant. How can I help you today?</p>
                <div className="suggested-questions">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggested-question"
                      onClick={() => {
                        setInputMessage(question);
                        handleSendMessage();
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  <div className="message-content">{message.text}</div>
                  <div className="message-timestamp">
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about bookings, properties, or policies..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget; 