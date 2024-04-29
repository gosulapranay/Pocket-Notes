import { useState, useEffect } from "react";
import HomePage from "../HomePage/HomePage";
import NoteSection from "../NoteSection/NoteSection";
import { v4 as uuidv4 } from "uuid";

export default function Mobile() {
  const [myNotes, setMyNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [clickNote, setClickNote] = useState();
  const [isNoteOpen, setIsNoteOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [sendButtonDisabled, setSendButtonDisabled] = useState(true);

  const sendMessage = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newNote = {
      textContent: message,
      date: formattedDate,
      time: formattedTime,
    };
    const selectedNoteIndex = myNotes.findIndex(
      (note) => note.id === clickNote.id
    );
    if (selectedNoteIndex !== -1) {
      const updatedNote = {
        ...myNotes[selectedNoteIndex],
        pocketNotes: [
          ...(myNotes[selectedNoteIndex].pocketNotes || []),
          newNote,
        ],
      };

      const updatedMyNotes = [
        ...myNotes.slice(0, selectedNoteIndex),
        updatedNote,
        ...myNotes.slice(selectedNoteIndex + 1),
      ];

      setMyNotes(updatedMyNotes);
      setClickNote(updatedNote);
      localStorage.setItem("myNotes", JSON.stringify(updatedMyNotes));
      setMessage("");
    }
  };

  const handleMessageChange = (event) => {
    const input = event.target.value;
    setMessage(input);
    setSendButtonDisabled(input.trim() === "");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const savedNotes = localStorage.getItem("myNotes");

    if (savedNotes) {
      setMyNotes(JSON.parse(savedNotes));
    } else {
      setMyNotes([]);
    }
  }, []);

  const handleGroupNameChange = (event) => {
    const input = event.target.value;
    setGroupName(input);
    setSubmitDisabled(input.trim() === "" || selectedColor === "");
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSubmitDisabled(groupName.trim() === "" || color === "");
  };

  const handleSubmit = () => {
    const groupNameInitials = groupName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    const newNote = {
      id: uuidv4(),
      color: selectedColor,
      groupName,
      groupNameInitials,
    };
    const newNotes = [...myNotes, newNote];
    setMyNotes(newNotes);
    localStorage.setItem("myNotes", JSON.stringify(newNotes));

    setIsModalOpen(false);
  };

  function handleNoteClick(id) {
    const savedNotes = JSON.parse(localStorage.getItem("myNotes"));
    const clickedNote = savedNotes.find((note) => note.id === id);
    setClickNote(clickedNote);
    setIsNoteOpen(false);
  }

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  return (
    <>
      <div>
        {isNoteOpen ? (
          <HomePage
            myNotes={myNotes}
            openModal={openModal}
            handleNoteClick={handleNoteClick}
            closeModal={closeModal}
            handleGroupNameChange={handleGroupNameChange}
            isModalOpen={isModalOpen}
            groupName={groupName}
            colors={colors}
            handleColorSelect={handleColorSelect}
            handleSubmit={handleSubmit}
            submitDisabled={submitDisabled}
          />
        ) : (
          clickNote && (
            <NoteSection
              clickNote={clickNote}
              handleMessageChange={handleMessageChange}
              sendMessage={sendMessage}
              message={message}
              sendButtonDisabled={sendButtonDisabled}
              isNoteOpen={isNoteOpen}
              setIsNoteOpen={setIsNoteOpen}
            />
          )
        )}
      </div>
    </>
  );
}
