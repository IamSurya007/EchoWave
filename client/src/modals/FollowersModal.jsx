import React, { useState } from "react";
import Modal from "react-modal";
import axios from "@/utils/api.js";

const customStyles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {},
};

const FollowersModal = () => {
  Modal.setAppElement(document.getElementById("root"));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state for better UX

  async function openModal() {
    setLoading(true); // Start loading
    try {
      const res = await axios.get("/user/fetchfollowers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFollowers(res.data); // Update followers state
    } catch (error) {
      console.error("Failed to fetch followers:", error);
    } finally {
      setLoading(false); // Stop loading
      setIsOpen(true); // Open modal
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex justify-center">
      <button onClick={openModal}>followers</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className="bg-gray-600 h-1/5 w-1/2"
      >
        <div className="flex flex-col gap-2 py-3 mt-2">
          {loading ? (
            <p>Loading followers...</p>
          ) : followers.length > 0 ? (
            <div>
              {followers.map((follower) => (
                <div key={follower.id}>{follower.name}</div>
              ))}
            </div>
          ) : (
            <p>No followers found.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FollowersModal;
