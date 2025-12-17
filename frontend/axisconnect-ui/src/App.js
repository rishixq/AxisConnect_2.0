import { useState } from "react";
import ChatBubble from "./components/ChatBubble";
import Sidebar from "./components/Sidebar";

import { login, chat } from "./api";




function App() {
  const [email, setEmail] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  

  const [employeeProfile, setEmployeeProfile] = useState(null);

  const [messages, setMessages] = useState([]);


  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const handleQuickAction = (message) => {
  setInput(message);
  setTimeout(() => {
    sendMessage();
  }, 0);
};


  // -----------------------
  // LOGIN
  // -----------------------
  const handleLogin = async () => {
    setError("");
    try {
      const profile = await login(employeeCode, email);
        setEmployeeProfile(profile);
        setMessages([]);
        setChatHistory([]);

      } catch (err) {
      setError("Invalid employee code or email. Try again");
    }

    
  };
  const handleLogout = () => {
  setEmployeeProfile(null);
  setEmployeeCode("");
  setEmail("");
  setMessages([
    { role: "ai", content: "👋 Welcome! Please log in to continue." }
  ]);
  setChatHistory([]);
};


  // -----------------------
  // CHAT
  // -----------------------
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const newHistory = [...chatHistory, userMsg];

    try {
      setIsTyping(true);

      const data = await chat(
        userMsg.content,
        employeeProfile,
        newHistory
      );

      const aiMsg = { role: "ai", content: data.reply };

      setMessages((prev) => [...prev, aiMsg]);
      setChatHistory([...newHistory, aiMsg]);
      setIsTyping(false);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Axis is temporarily unavailable." }
      ]);
    }
  };

  // -----------------------
  // LOGIN UI (NO SIDEBAR)
  // -----------------------
  if (!employeeProfile) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
  <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 border border-gray-200">
    
    {/* Logo */}
    <div className="flex items-center justify-center mb-6">
      <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center">
        <img
          src="https://i.pinimg.com/1200x/f8/33/15/f83315a9855a4c0d41269f3980b2404b.jpg"
          alt="AxisConnect Logo"
          className="h-full w-full object-contain p-0.5"
        />
      </div>
    </div>

    {/* Title */}
    <h2 className="text-2xl font-semibold text-center mb-1">
      AxisConnect
    </h2>
    <p className="text-sm text-gray-600 text-center mb-6">
      Employee Self-Service Chatbot
    </p>

    {/* Input */}
    
    <input
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="Enter email (e.g. employee@company.com)"
      type="email"
      className="w-full border rounded-lg px-4 py-2 mb-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
    />
    <input
      value={employeeCode}
      onChange={e => setEmployeeCode(e.target.value)}
      placeholder="Enter Employee Code (e.g. EMP001)"
      className="w-full border rounded-lg px-4 py-2 text-xs mb-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
    />


    {/* Button */}
    <button
      onClick={handleLogin}
      className="w-full bg-blue-950 text-white py-2.5 rounded-lg hover:bg-blue-900 transition"
    >
      Login
    </button>

    {/* Error */}
    {error && (
      <p className="text-red-500 text-sm mt-3 text-center">
        {error}
      </p>
    )}
  </div>
</div>

    );
  }

  // -----------------------
  // MAIN APP UI (WITH SIDEBAR)
  // -----------------------
  return (
    <div className="flex h-screen bg-blue-50/80 backdrop-blur-md">
      
      {/* LEFT SIDEBAR */}
      <Sidebar
        employee={{
          name: employeeProfile.name,
          id: employeeProfile.employee_code,
          department: employeeProfile.department,
          role: employeeProfile.role,
          joined: employeeProfile.join_date,
        }}
        onQuickAction={handleQuickAction}
        onLogout={handleLogout}
      />


      {/* RIGHT CHAT AREA */}
      <main className="flex-1 flex flex-col">
        
        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="max-w-3xl mb-8">
              <div className="bg-blue-100 backdrop-blur-md border  border-l-4 border-black rounded-lg p-5">
                <h1 className="text-2xl font-semibold mb-1">
                  <strong>Welcome to AxisConnect 🤖 , {employeeProfile.name}!</strong>
                </h1>
                
              </div>

              <div className="mt-6 text-gray-700 space-y-3">
                <div className="flex items-center gap-2">
                  
                  
              </div>

              <p>
                I am Axis, your AI-powered Employee Self-Service and HR Support Assistant.
              </p>

              <p>Your session is authenticated and active.</p>

              <p className="mt-2 font-medium">I can assist you with:</p>

              <ul className="list-disc pl-6 space-y-1">
                <li>Leave, attendance, payslips, tax & CTC details</li>
                <li>Role hierarchy, reporting manager & HRBP information</li>
                <li>Skills, goals, performance cycle & appraisal insights</li>
                <li>Assigned assets, IT/facility tickets & access permissions</li>
                <li>Insurance, benefits & compliance requirements</li>
                <li>Corporate policies, onboarding guidance & internal protocols</li>
              </ul>

              <p className="text-sm text-gray-500 mt-3">
                Your access is controlled by your clearance level. Requests beyond
                authorization will be acknowledged but not processed.
              </p>
            </div>
          </div>
        )}

          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} content={m.content} />
          ))}
          {isTyping && (
            <div className="text-sm text-gray-500 italic">
                🤖 Axis is typing…
            </div>
        )}

        </div>

        {/* INPUT */}
        <div className="border-t bg-blue-50/80 backdrop-blur-md p-4 flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask Axis anything..."
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-300 text-blue-950 font-bold mt-3border border-blue-400 hover:bg-blue-400 transition rounded-lg px-3 py-2"


          >
            Send
          </button>
        </div>

      </main>
    </div>
  );
}

export default App;
