import { IoSendSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";
import styles from "./NoteSection.module.css";

function NoteSection({
  clickNote,
  handleMessageChange,
  sendMessage,
  message,
  sendButtonDisabled,
  setIsNoteOpen,
}) {
  const handleGoBack = () => {
    setIsNoteOpen(true);
  };
  return (
    <>
      <div className={styles.dRight}>
        <div className={styles.Allnotes}>
          <header className={styles.allNoteHeader}>
            <div className={styles.headerFlex}>
              <button className={styles.goBackButton} onClick={handleGoBack}>
                <FaArrowLeftLong />
              </button>
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
      </div>
    </>
  );
}
export default NoteSection;
