import { useState, useRef } from 'react';
import Notes from './Components/notes';
import AddNote from './Components/addNote'; // Import AddNote component
import DeleteIcon from './Components/deleteIcon';

const App = () => {
  const [notes, setNotes] = useState([
    { id: 1, text: 'this is the first note' },
    { id: 2, text: 'this is the second note' },
  ]);

  // Function to add a new note
  const addNote = (noteText) => {
    const newNote = {
      id: notes.length + 1, // Simple ID assignment
      text: noteText,
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const deleteIconRef = useRef(null);

  return (
    <div>
      <AddNote addNote={addNote} /> {/* Render AddNote component */}
      <Notes notes={notes} setNotes={setNotes} />
      <div ref={deleteIconRef}>
        <DeleteIcon />
      </div>
    </div>
  );
};

export default App;
