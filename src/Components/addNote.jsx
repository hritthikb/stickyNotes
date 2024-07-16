import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const AddNote = ({ addNote }) => {
  const [inputText, setInputText] = useState('');

  //add note to local storage
  const handleAddNote = () => {
    addNote(inputText);
    setInputText(''); // Clear input after adding
  };

  return (
    <div id='add-note-area' style={{ textAlign: 'center' }}>
      <input
        style={{ padding: '2px', }}
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Add a new note...'
      />
      <button onClick={handleAddNote} style={{}}>➕</button>
    </div>
  );
};

export default AddNote;
