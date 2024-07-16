import React, { useRef, useEffect } from 'react';
import Note from './Note';

const Notes = ({ notes, setNotes, deleteIconRef }) => {
  const noteRefs = useRef([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      return savedNote ? { ...note, position: savedNote.position } : { ...note, position: determineNewPosition() };
    });
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }, [notes.length]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return { x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY) };
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleDragStart = (note, e) => {
    const { id } = note;
    if (!noteRefs.current[id]) {
      noteRefs.current[id] = React.createRef();
    }
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const startPos = note.position;

    const handleMouseMove = (e) => {
      const newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - noteRef.offsetWidth));
      const newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - noteRef.offsetHeight));
      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = (e) => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        const finalRect = noteRef.getBoundingClientRect();
        const newPosition = { x: finalRect.left, y: finalRect.top };
      
        const deleteIconRect = deleteIconRef.current.getBoundingClientRect();
        const deletionAreaRect = deleteIconRef.current.querySelector('#deletion-area').getBoundingClientRect();
      
        if (
          finalRect.left < deletionAreaRect.right &&
          finalRect.right > deletionAreaRect.left &&
          finalRect.top < deletionAreaRect.bottom &&
          finalRect.bottom > deletionAreaRect.top
        ) {
          noteRef.style.backgroundColor = 'red';
          setTimeout(() => {
            deleteNote(id);
          }, 1000);
        } else if (checkForOverlap(id)) {
          noteRef.style.left = `${startPos.x}px`;
          noteRef.style.top = `${startPos.y}px`;
        } else {
          updateNotePosition(id, newPosition);
        }
      };

  const checkForOverlap = (id) => {
    // Implement your overlap checking logic here
    return false;
  };

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) => (note.id === id ? { ...note, position: newPosition } : note));
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  }
  return (
    <div>
      {notes.map((note) => (
        <Note
          key={note.id}
          ref={(el) => {
            if (!noteRefs.current[note.id]) {
              noteRefs.current[note.id] = React.createRef();
            }
            noteRefs.current[note.id].current = el;
          }}
          content={note.text}
          initialPos={note.position}
          onMouseDown={(e) => handleDragStart(note, e)}
        />
      ))}
    </div>
  );
};

export default Notes;