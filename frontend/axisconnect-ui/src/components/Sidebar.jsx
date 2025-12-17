// src/components/Sidebar.jsx

import React from "react";

const Sidebar = ({ employee, onQuickAction, onLogout }) => {
  const actions = [
    { label: "Apply Leave", message: "I want to apply for leave" },
    { label: "My Goals", message: "Show my goals" },
    { label: "Salary Details", message: "Show my salary details" },
    { label: "IT Assets", message: "Show my IT assets" },
    { label: "Leave Balance", message: "Show my leave balance" },
    { label: "HR Policies", message: "What are the HR policies?" },
    { label: "Raise Ticket", message: "Raise a ticket" },
    { label: "Holidays", message: "How many holidays are there this year?" },
  ];

  return (
    <aside className="w-72 h-screen bg-[#0B0F14] text-white font-bold mt-3 flex flex-col px-6 py-5">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
          <img
          src="https://i.pinimg.com/1200x/f8/33/15/f83315a9855a4c0d41269f3980b2404b.jpg"
            alt="AxisConnect Logo"
            className="h-full w-full object-contain p-1"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold">AxisConnect</h1>
          <p className="text-xs text-gray-400">
            Employee Self Service Chatbot
          </p>
        </div>
      </div>

      <div className="border-b border-gray-800 mb-6" />

      {/* Employee Card */}
      <div className="bg-blue-950/60 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-sm">
            👤
          </div>
          <h2 className="text-sm text-white font-bold">
            {employee.name}
          </h2>
        </div>

        <div className="text-xs text-gray-300 font-semibold mt-3 space-y-1">
          <p><span className="text-sm text-white font-bold mt-3">ID:</span>  {employee.id}</p>
          <p><span className="text-sm text-white font-bold mt-3">Department:</span>  {employee.department}</p>
          <p><span className="text-sm text-white font-bold mt-3">Role:</span>  {employee.role}</p>
          <p><span className="text-sm text-white font-bold mt-3">Joined:</span>  {employee.joined}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => onQuickAction(action.message)}
              className="bg-blue-950/60 backdrop-blur-md border border-white/10  hover:bg-[#2A3441] transition rounded-lg px-3 py-2 text-xs text-gray-200"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full mt-8 text-sm text-red-400 hover:text-red-500 border border-red-400/30 rounded-lg py-2 hover:bg-red-500/10 transition"
      >
        Logout
      </button>

    </aside>
    

  );
};

export default Sidebar;
