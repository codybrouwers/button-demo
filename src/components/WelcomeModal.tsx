import { useEffect, useState } from "react";
import { Text, Modal, Input, Grid } from "@geist-ui/react";
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
  const [isModalVisible, toggleIsModalVisible] = useToggle(false);

  useEffect(() => {
    const existingUserJson = window.localStorage.getItem(USER_KEY);
    if (existingUserJson) {
      const existingUser = JSON.parse(existingUserJson);
      setUser(existingUser);
      return;
    }
    toggleIsModalVisible(true);
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
    <Modal disableBackdropClick open={isModalVisible}>
      <Modal.Title style={{ zoom: 3 }}>✌️</Modal.Title>
      <Modal.Content>
        <Grid.Container justify="center">
          <Text>Add a nickname you want to use!</Text>
          <Input
            clearable
            maxLength={20}
            minLength={1}
            placeholder="Nickname"
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </Grid.Container>
      </Modal.Content>
      <Modal.Action onClick={onSubmit}>Save</Modal.Action>
    </Modal>
  );
}

// == Styles ===============================================================
