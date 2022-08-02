import React, { useState, Fragment, Suspense } from 'react';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import UserTable from './tables/UserTable';
import styles from './App.module.css';
import ReactLogo from './assets/react.svg';
import data from '@emoji-mart/data';
import ErrorBoundary from './common/ErrorBoundary';

const Picker = React.lazy(() => import('@emoji-mart/react'));

const App = () => {
  // Data
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ];

  const initialFormState = { id: null, name: '', username: '' };

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const [openEmoji, setOpenEmoji] = useState(false);

  // CRUD operations
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setEditing(false);

    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const openEmojiDrawer = () => {
    setOpenEmoji(!openEmoji);
  };

  const onEmojiSelect = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <ReactLogo className={styles.svg} />
      <h1>USER MANAGEMENT</h1>
      <div className={styles.flexbox}>
        <div>
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>ADD USER</h2>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>
        <div>
          <h2>View users</h2>
          <div className={styles.tableContainer}>
            <UserTable
              users={users}
              editRow={editRow}
              deleteUser={deleteUser}
            />
          </div>
        </div>
      </div>
      {/* <button onClick={openEmojiDrawer}>Open Emoji</button> */}
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          {openEmoji && <Picker data={data} onEmojiSelect={onEmojiSelect} />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
