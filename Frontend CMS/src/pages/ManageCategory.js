import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import EditCategoryDialog from "./EditCategoryDialog";

const defaultTheme = createTheme();

const ManageCategory = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [filterText, setFilterText] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getCategories();
  },[token]);

  const getCategories = () => {
    const apiUrl = "http://localhost:8000/category/get";
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setCategories(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleAddCategory = () => {
    const apiUrl = "http://localhost:8000/category/add";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newCategory }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("success", result);
        getCategories();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleEditClick = (categoryId) => {
    setEditingCategoryId(categoryId);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditingCategoryId(null);
    setIsDialogOpen(false);
  };

  const handleEditCategory = (newName) => {
    const apiUrl = `http://localhost:8000/category/update`;
    const requestBody = {
      name: newName, 
      id: editingCategoryId, 
    };
    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Category updated") {
          getCategories();
          console.log("Category updated successfully");
        } else if (data.message === "Category id not found") {
          console.error("Category ID not found");
        } else {
          console.error("Error updating category:", data);
        }
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
    handleDialogClose();
  };

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ m: 1, fontSize: "40px" }}>Category Manager</Box>

              <TextField
                label="Filter Categories"
                variant="outlined"
                value={filterText}
                onChange={handleFilterChange}
              />

              <List>
                {filteredCategories?.map((category) => (
                  <ListItem key={category.id}>
                    <ListItemText primary={category.name} />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditClick(category.id)}
                    >
                      Edit
                    </Button>
                  </ListItem>
                ))}
              </List>

              <EditCategoryDialog
                open={isDialogOpen}
                onClose={handleDialogClose}
                onSave={handleEditCategory}
              />
            </Box>
            <TextField
              label="New Category"
              variant="outlined"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              sx={{}}
            >
              Add Category
            </Button>
          </Container>
        </ThemeProvider>
      )}
    </Layout>
  );
};

export default ManageCategory;
