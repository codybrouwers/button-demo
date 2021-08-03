import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useToggle } from "hooks";

// == Types ================================================================

interface IProps {
  setUser: (user: IUser) => void;
}

// == Constants ============================================================

const USER_KEY = "user";

// == Functions ============================================================

// == Component ============================================================

export function WelcomeModal({ setUser }: IProps) {
  const [name, setName] = useState("");
  const [isModalVisible, toggleIsModalVisible] = useToggle(true);

  useEffect(() => {
    const existingUserJson = window.localStorage.getItem(USER_KEY);
    if (existingUserJson) {
      const existingUser = JSON.parse(existingUserJson);
      setUser(existingUser);
      toggleIsModalVisible(false);
    }
  }, [setUser, toggleIsModalVisible]);

  const onSubmit = () => {
    if (name.length < 1) {
      return;
    }
    const newUser = {
      id: nanoid(),
      name,
    };
    window.localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
    toggleIsModalVisible(false);
  };

  return (
    <div style={{ ...styles.container, display: isModalVisible ? "flex" : "none" }}>
      <div id="cookiesPopup" style={styles.cookiesContent}>
        <p style={styles.emoji}>✌️</p>
        <p style={styles.modalText}>Add a nickname you want to use!</p>
        <input
          maxLength={20}
          minLength={1}
          placeholder="Nickname"
          style={styles.nameInput}
          type="text"
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <button style={styles.buttonSubmit} type="submit" onClick={onSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}
// == Styles ===============================================================

const styles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    zIndex: 10,
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
  cookiesContent: {
    width: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    borderRadius: "20px",
    padding: "30px 30px 50px",
  },
  emoji: { zoom: 3, marginBottom: "0px" },
  modalText: { marginBottom: "30px", fontSize: "18px" },
  nameInput: {
    width: "200px",
    marginBottom: "30px",
  },
  buttonSubmit: {
    backgroundColor: "#03a87c",
    border: "none",
    borderRadius: "5px",
    width: "200px",
    padding: "14px",
    fontSize: "16px",
    color: "white",
    boxShadow: "0px 6px 18px -5px rgba(21, 103, 85, 1)",
  },
} as const;
