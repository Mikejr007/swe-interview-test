import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  //fetches product
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/products'); 
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  //deletes selected product based on id
  const handleDelete = async(id) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
//call fetchProduct when mounted
  useEffect(() => {
    fetchProducts();
  }, []);

  return (// displays card 
    <Container>
     <h1 style={{ marginTop:15,height:40,textAlign: 'center' }}>Simple card List</h1>
      <Grid container spacing={1}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div" style={{fontWeight:'bold'}}>
                    {product.name}
                  </Typography>
                  <Typography variant='h6'>
                  Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(product.id)}
                  style={{ color: 'red' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No products to display</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ProductList;