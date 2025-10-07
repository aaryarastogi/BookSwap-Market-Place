import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import backend_url from "../config/auth.js"; 

const Requests = () => {
  const { user } = useContext(AuthContext);
  const [incoming, setIncoming] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const incomingRes = await axios.get(`${backend_url}/api/requests/owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sentRes = await axios.get(`${backend_url}/api/requests/sent`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIncoming(incomingRes.data);
      setSent(sentRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const handleAction = async (requestId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${backend_url}/api/requests/${requestId}`,
        { status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update request");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading requests...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Book Requests</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Incoming Requests</h2>
        {incoming.length === 0 ? (
          <p className="text-gray-600">No incoming requests.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {incoming.map((req) => (
              <div key={req._id} className="bg-white shadow-lg rounded-xl p-4">
                <h3 className="font-semibold">{req.book.title}</h3>
                <p className="text-gray-600">Requested by: {req.requester.name}</p>
                <p className="text-gray-500 text-sm">Status: {req.status}</p>
                {req.status === "pending" && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleAction(req._id, "accepted")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req._id, "declined")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sent Requests</h2>
        {sent.length === 0 ? (
          <p className="text-gray-600">You have not sent any requests.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sent.map((req) => (
              <div key={req._id} className="bg-white shadow-lg rounded-xl p-4">
                <h3 className="font-semibold">{req.book.title}</h3>
                <p className="text-gray-600">Status: {req.status}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Requests;