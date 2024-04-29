import { FaPlus, FaTimes } from "react-icons/fa";
import styles from "./HomePage.module.css";

function HomePage({
  myNotes,
  openModal,
  handleNoteClick,
  closeModal,
  isModalOpen,
  groupName,
  handleGroupNameChange,
  colors,
  selectedColor,
  handleColorSelect,
  handleSubmit,
  submitDisabled,
}) {
  return (
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
  );
}

export default HomePage;
