// Delete area
const DeleteIcon = () => {
  return (
    <div
      className='delete-area'
      style={{
        position: 'fixed',
        bottom: '0', // Adjusted to stick to the bottom
        width: '100%', // Takes up the whole width
        backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red with transparency
        cursor: 'pointer',
        fontSize: '3rem',
        textAlign: 'center', // Centers the icon/text
      }}
    >
      🗑️
    </div>
  );
};

export default DeleteIcon;
