import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditCategoryDialog = ({ open, onClose, onSave }) => {
  const [newName, setNewName] = useState('');

  const handleSave = () => {
    onSave(newName);
    setNewName(''); // Clear the input field
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Category Name</DialogTitle>
      <DialogContent>
        <TextField
          label="New Name"
          variant="outlined"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
