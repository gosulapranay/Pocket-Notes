import { useState, useEffect } from "react";
import styles from "./Desktop.module.css";
import { FaPlus, FaTimes } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { BiSolidLock } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import bgImage from "../../assets/background.png";

function Desktop() {
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
    <div className={styles.desktopMainContainer}>
      <div className={styles.dLeft}>
        <h2 className={styles.leftHead}>Pocket Notes</h2>
        <div className={styles.scrollableLeft}>
          <div className={styles.noteSection}>
            {myNotes.map((note) => (
              <div
                key={note.id}
                className={styles.textFlex}
                onClick={() => handleNoteClick(note.id)}
              >
                <div
                  style={{ backgroundColor: note.color }}
                  className={styles.testNotes}
                >
                  {note.groupNameInitials}
                </div>
                <p className={styles.groupName}>{note.groupName}</p>
              </div>
            ))}
          </div>
          <button className={styles.noteBtn} onClick={openModal}>
            <FaPlus />
          </button>
        </div>

        {isModalOpen && (
          <div className={styles.overlay}>
            <div className={styles.modal}>
              <button className={styles.closeBtn} onClick={closeModal}>
                <FaTimes />
              </button>
              <h2>Create New Group</h2>
              <div className={styles.groupNameFlex}>
                <label htmlFor="group-name">Group Name</label>
                <input
                  type="text"
                  id="group-name"
                  value={groupName}
                  onChange={handleGroupNameChange}
                  placeholder="Enter group name"
                />
              </div>
              <div className={styles.chooseColorFlex}>
                <label>Choose Color:</label>
                <div className={styles.colorOptions}>
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className={`${styles.colorOption} ${
                        selectedColor === color ? styles.selected : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
              </div>
              <button
                className={styles.chooseBtn}
                onClick={handleSubmit}
                disabled={submitDisabled}
              >
                Create Note
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.dRight}>
        {isNoteOpen ? (
          <div className={styles.rightMain}>
            <div className={styles.rightFlex}>
              <img src={bgImage} alt="people taking notes" />
              <h1 className={styles.rightheading}>Pocket Notes</h1>
              <p>
                Send and receive messages without keeping your phone online. Use
                Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
              <div className={styles.encrypted}>
                <BiSolidLock />
                <p>end-to-end encrypted</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.Allnotes}>
            <header className={styles.allNoteHeader}>
              <div className={styles.headerFlex}>
                <div
                  className={styles.headerIcon}
                  style={{ backgroundColor: clickNote.color }}
                >
                  {clickNote.groupNameInitials}
                </div>
                <h2 className={styles.headerTitle}>{clickNote.groupName}</h2>
              </div>
            </header>
            <div className={styles.allNoteScrollable}>
              {clickNote.pocketNotes &&
                (clickNote.pocketNotes || []).map((note, index) => {
                  return (
                    <div key={index} className={styles.pocketNotes}>
                      <p className={styles.pocketText}>{note.textContent}</p>
                      <div className={styles.dateTime}>
                        <span>{note.date}</span>
                        <GoDotFill />
                        <span>{note.time}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
            <footer className={styles.textAreaContainer}>
              <div className={styles.msgDiv}>
                <textarea
                  className={styles.chat}
                  placeholder="Enter your text here"
                  value={message}
                  onChange={handleMessageChange}
                ></textarea>
                <button
                  className={styles.sendButton}
                  onClick={sendMessage}
                  disabled={sendButtonDisabled}
                >
                  <IoSendSharp />
                </button>
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}

export default Desktop;
