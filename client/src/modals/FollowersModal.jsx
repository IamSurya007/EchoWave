import React, { useState } from "react";
import Modal from "react-modal";
import axios from "@/utils/api.js";
import { useAuthContext } from "@/hooks/UseAuthContext";
import { Link } from "react-router-dom";

const customStyles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    margin: "0 auto",
    width: "40vh", // Adjust width
    height: "60%", // Adjust height
    overflow: "hidden", // Ensure content stays within boundaries
    padding: "10px", // Add padding for aesthetics
    backgroundColor: "#333", // Background color for content
    borderRadius: "10px", // Rounded corners
  },
};


const FollowersModal = ({userAccount}) => {
  Modal.setAppElement(document.getElementById("root"));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state for better UX
  const {user} = useAuthContext();

  async function openModal() {
    setLoading(true); // Start loading
    try {
      const res = await axios.get("/user/secured/followers/useraccount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userAccountId: userAccount?._id
        }
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
    className=""
  >
    <div
      className="flex flex-col gap-2 py-3 overflow-y-auto"
      style={{
        maxHeight: "100%", // Limit the height to fit within modal bounds
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      {loading ? (
        <p>Loading followers...</p>
      ) : followers.length > 0 ? (
        <div>
          {followers.map((follower) => (
            <Link to={`/${follower?.name}`} onClick={closeModal} className="flex items-center py-2 gap-4" key={follower.id}>
              <img className=" size-10 rounded-full" src={follower.userIcon} />
              <div className="flex flex-col">
                <label className=" text-bas">
                  {follower.name}
                </label>
                <label className="text-sm text-gray-300">
                  {follower?.username}
                </label>
                </div>
            </Link>
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
