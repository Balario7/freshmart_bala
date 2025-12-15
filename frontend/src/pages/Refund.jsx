import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Refund = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Refund Policy</Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>1. Return Window</Typography>
        <Typography paragraph>Products can be returned within 24 hours of delivery if they are damaged or defective.</Typography>
        
        <Typography variant="h6" gutterBottom>2. Eligible Items</Typography>
        <Typography paragraph>Only damaged, defective, or incorrect items are eligible for refund. Fresh produce must be reported within 2 hours of delivery.</Typography>
        
        <Typography variant="h6" gutterBottom>3. Refund Process</Typography>
        <Typography paragraph>Refunds will be processed within 5-7 business days after verification of the returned product.</Typography>
        
        <Typography variant="h6" gutterBottom>4. Non-Refundable Items</Typography>
        <Typography paragraph>Opened or used products, and items without original packaging are not eligible for refund.</Typography>
        
        <Typography variant="h6" gutterBottom>5. Contact Us</Typography>
        <Typography paragraph>For refund requests, please contact our customer service team with your order details and photos of the issue.</Typography>
      </Box>
    </Container>
  );
};

export default Refund;
