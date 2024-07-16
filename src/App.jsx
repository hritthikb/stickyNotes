import { useState, useRef } from 'react';
import Notes from './Components/Notes/Notes';
import AddNote from './Components/AddNote/AddNote';
import DeleteIcon from './Components/DeleteIcon/DeleteIcon';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [notes, setNotes] = useLocalStorage('notes', [
    { id: 1, text: 'this is the first note' },
    { id: 2, text: 'this is the second note' },
  ]);

  const addNote = (noteText) => {
    const newNote = {
      id: notes.length + 1,
      text: noteText,
    };
    setNotes([...notes, newNote]);
  };

  const deleteIconRef = useRef(null);

  return (
    <div>
      <AddNote addNote={addNote} />
      <Notes 
        notes={notes} 
        setNotes={setNotes} 
        deleteIconRef={deleteIconRef} 
      />

      <div ref={deleteIconRef} >
        <DeleteIcon />
      </div>
    </div>
  );
};

export default App;