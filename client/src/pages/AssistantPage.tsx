import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useEffect,useState } from 'react';
import ChatInterface from '../components/assistant/ChatInterface';
import AssistantCapabilities from '../components/assistant/AssistantCapabilities';
import { set } from 'date-fns';



const AssistantPage = () => {
  const[messageData, setMessageData] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/ai",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: ""})
    })
    .then(res => res.json())
    .then(data => {setMessageData(data)
   console.log(data.response)
    }
  )
  
  },[]) // Added dependency array

  return (
    <>
      <Helmet>
        <title>AI Personal Health Assistant | Scanova</title>
      </Helmet>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">AI Personal Health Assistant</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Get personalized health recommendations, answers to your questions, and guidance based on your medical data.</p>
          </motion.div>
          
          {/* Assistant Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ChatInterface messageData={messageData} /> 
          </motion.div>
          
          {/* Assistant Capabilities */}
          <AssistantCapabilities />
        </div>
      </section>
    </>
  );
};

export default AssistantPage;
