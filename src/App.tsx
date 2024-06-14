
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import MySession from "./components/MySession";
import AddSession from "./components/AddSession";
import { Session } from "./model";
import { useState } from "react";
import { sessions as initialSessions } from "./components/data/mockData";
import EditSessionModal from "./components/EditSessionModal";

function App() {

  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewSession = (newSession: Session) => {
    setSessions(prevSessions => [...prevSessions, newSession]);
  };

  const updateSession = (updatedSession: Session) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === updatedSession.id ? updatedSession : session
      )
    );
    closeModal();
  };

  const handleDelete = (session: Session) => {
    const updatedSessions = sessions.filter(s => s.id !== session.id);
    setSessions(updatedSessions);
  };

  const openModal = (session: Session) => {
    setSessionToEdit(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSessionToEdit(null);
    setIsModalOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="flex items-start justify-between">
        <Sidebar />
        <div className="w-full h-full">
          <Header />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<MySession sessions={sessions} onEdit={openModal} onDelete={handleDelete} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-session" element={<AddSession addNewSession={addNewSession} />} />
            </Routes>
            {isModalOpen && sessionToEdit && (
              <EditSessionModal
                session={sessionToEdit}
                updateSession={updateSession}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
