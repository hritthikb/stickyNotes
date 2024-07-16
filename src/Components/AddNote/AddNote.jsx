import { useState } from 'react';

const AddNote = ({ addNote }) => {
  const [inputText, setInputText] = useState('');

  const handleAddNote = () => {
    addNote(inputText);
    setInputText('');
  };

  return (
    <div id='add-note-area' style={{ textAlign: 'center' }}>
      <input
        style={{ padding: '2px' }}
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Add a new note...'
      />
      <button onClick={handleAddNote}>➕</button>
    </div>
  );
};

export default AddNote;