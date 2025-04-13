import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../../hooks/useauth';
import { useToast } from '@/hooks/use-toast';
import { getDatabase, ref, push, onValue, query, limitToLast } from "firebase/database";

// Fix SpeechRecognition in TS
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: number;
  type?: 'text' | 'audio' | 'document'; // Added type for message
}

interface ChatInterfaceProps {
  messageData?: Message[];
}

const ChatInterface = ({ messageData = [] }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [transcript, setTranscript] = useState('');
  const inputFileRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(0);


  const messageEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // SpeechRecognition setup
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const RecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new RecognitionClass();
      recognitionRef.current.continuous = true; // Changed to true for continuous recognition
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(prev => prev + ' ' + transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      //Process transcript here
      const userMessage: Message = {
        id: Date.now().toString(),
        text: transcript,
        sender: 'user',
        timestamp: Date.now(),
        type: 'audio'
      };
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);
      //Send to backend
    } else {
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
    setTranscript(''); //Clear transcript after processing

  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          text: "Hello! I'm your Scanova Health Assistant. I can help you with health questions, medication reminders, interpreting your test results, or providing personalized wellness tips. How can I assist you today?",
          sender: 'assistant',
          timestamp: Date.now()
        }
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const messagesRef = query(ref(db, `chats/${user.uid}/messages`), limitToLast(50));

      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messageList: Message[] = Object.entries(data).map(([id, msg]: [string, any]) => ({
            id,
            ...msg
          }));
          messageList.sort((a, b) => a.timestamp - b.timestamp);
          setMessages(messageList);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: Date.now(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      if (user) {
        const db = getDatabase();
        await push(ref(db, `chats/${user.uid}/messages`), userMessage);
      }

      const response = await fetch('http://localhost:5000/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });

      const data = await response.json();
      const botResponse = data.response;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'assistant',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      if (user) {
        const db = getDatabase();
        await push(ref(db, `chats/${user.uid}/messages`), assistantMessage);
      }

    } catch (error) {
      console.error("Error during send:", error);
      setIsTyping(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again."
      });
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    toast({
      title: "File uploaded",
      description: `Uploaded: ${file.name}`
    });

    //Added file upload handling
    const formData = new FormData();
    formData.append('file', file);
    try{
      const response = await fetch('http://localhost:5000/ai/file', { // Assuming a separate endpoint for file upload
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      const botResponse = data.response;
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'assistant',
        timestamp: Date.now(),
        type: 'document'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch(error){
      console.error("Error uploading file:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload file. Please try again.'
      });
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-4 text-white">
        <div className="flex items-center">
          <motion.div className="text-3xl mr-4" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <i className="fas fa-robot"></i>
          </motion.div>
          <div>
            <h2 className="text-xl font-semibold">Scanova Health Assistant</h2>
            <p className="text-sm text-cyan-100">Powered by advanced AI for personalized health guidance</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-6 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div key={msg.id} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`} variants={messageVariants} initial="hidden" animate="visible" exit="exit" layout>
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white mr-3 flex-shrink-0">
                  <i className="fas fa-robot"></i>
                </div>
              )}
              <div className={`rounded-lg py-3 px-4 max-w-[80%] ${msg.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 ml-3 flex-shrink-0">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div className="flex mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white mr-3 flex-shrink-0">
                <i className="fas fa-robot"></i>
              </div>
              <div className="bg-gray-100 rounded-lg py-3 px-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messageEndRef} />
        </AnimatePresence>
      </div>

      {/* Input & Buttons */}
      <div className="border-t border-gray-200 px-6 py-4">
        <form onSubmit={handleSendMessage}>
          <div className="flex items-center gap-2">
            {/* Mic Button */}
            <Button type="button" variant="ghost" size="icon" onClick={handleToggleRecording}
              className={`text-gray-500 hover:text-cyan-600 h-10 w-10 ${isRecording ? 'text-cyan-600 animate-pulse' : ''}`}>
              <i className={`fas ${isRecording ? 'fa-microphone-slash' : 'fa-microphone'} text-xl`}></i>
            </Button>

            {/* File Import Button */}
            <Button type="button" variant="ghost" size="icon" onClick={handleFileButtonClick}
              className="text-gray-500 hover:text-cyan-600 h-10 w-10">
              <i className="fa-solid fa-file-import text-xl"></i>
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden"
              accept=".pdf,.docx,.txt,.jpg,.jpeg,.png" />

            <Input type="text" placeholder="Type your message..." value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)} className="flex-grow" />
            <Button type="submit" disabled={!newMessage.trim() || isTyping}
              className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition duration-200">
              <i className="fas fa-paper-plane"></i>
            </Button>
          </div>
        </form>

        {/* Quick Suggestions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {["Medication reminders", "Explain my test results", "Diet suggestions", "Sleep improvement tips"].map((text) => (
            <Button key={text} variant="outline" size="sm"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full"
              onClick={() => handleQuickSuggestion(text)}>
              {text}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;