import React, { useState, Suspense } from 'react';
import styles from './AddUserForm.module.css';
import SmileyLogo from 'assets/smiley.svg';
import data from '@emoji-mart/data';
import ErrorBoundary from 'common/ErrorBoundary';
import {
  Button,
  BUTTON_SIZES,
  BUTTON_TYPES,
} from '../components/button/Button';

const Picker = React.lazy(() => import('@emoji-mart/react'));

const AddUserForm = (props) => {
  const initialFormState = { id: null, name: '', username: '' };
  const [user, setUser] = useState(initialFormState);

  const [openEmoji, setOpenEmoji] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const openEmojiDrawer = () => {
    setOpenEmoji(!openEmoji);
  };

  const onEmojiSelect = (data) => {
    console.log(data);
    setUser({ ...user, name: user.name.concat(data.native) });
    openEmojiDrawer();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.username) return;

    props.addUser(user);
    setUser(initialFormState);
  };

  return (
    <form>
      <label>Name</label>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <SmileyLogo className={styles.smileyLogo} onClick={openEmojiDrawer} />
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            {openEmoji && (
              <div className={styles.emojiContainer}>
                <Picker
                  data={data}
                  onEmojiSelect={onEmojiSelect}
                  // onClickOutside={() => setOpenEmoji(false)}
                />
              </div>
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
      />
      <Button
        size={BUTTON_SIZES.SMALL}
        type={BUTTON_TYPES.PRIMARY}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddUserForm;
