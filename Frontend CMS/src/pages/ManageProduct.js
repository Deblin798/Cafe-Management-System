import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  TextField,
  createTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

const defaultTheme = createTheme();

const ManageProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getProducts()
  }, []);

  const getProducts = () => {
    const apiUrl = "http://localhost:8000/product/get";
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setProduct(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }

  // useEffect(() => {
  //   const getProducts = () => {
  //     const apiUrl = "http://localhost:8000/product/get";
  //     fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setProduct(result);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //         setLoading(false);
  //       });
  //   };
  
  //   getProducts();
  // }, [token]);
  

  const handleAddProduct = () => {
    const apiUrl = "http://localhost:8000/product/add";
    fetch(apiUrl, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        getProducts();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const getByCategory = () => {
    const apiUrl = "http://localhost:8000/product/getByCategory/:id";
    fetch(apiUrl, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        getProducts();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const getById = () => {
    const apiUrl = "http://localhost:8000/product/getById/:id";
    fetch(apiUrl, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        getProducts();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const updateProduct = () => {
    const apiUrl = `http://localhost:8000/category/update`;
    const requestBody = {
      name: name,
      categoryId: categoryId,
      description: description,
      price: price,
      id: id,
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
  };

  const handleDeleteProduct = () => {
    const apiUrl = `http://localhost:8000/product/delete/:id`;
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box>
              <h2>Add Product</h2>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Product ID"
                onChange={(e) => setId(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Product Name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Category ID"
                onChange={(e) => setCategoryId(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </Box>
            <Box>
              <h2>Filter Products</h2>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Filter by Category ID"
                onChange={(e) => setCategoryId(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={getByCategory}>
                Filter
              </Button>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Filter by Product ID"
                onChange={(e) => setId(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={getById}>
                Filter
              </Button>
            </Box>
            <Box>
              <h2>Product List</h2>
              <List>
                {/* Map and display your product list here */}
                {product?.map((product) => (
                  <ListItem key={product.id}>
                    <ListItemText primary={product.name} secondary={product.category} />
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      // onClick={() => handleEditProduct(product.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </Layout>
  );
};

export default ManageProduct;
