import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Terms = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Terms & Conditions</Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>1. Acceptance of Terms</Typography>
        <Typography paragraph>By accessing and using FreshMart, you accept and agree to be bound by these terms.</Typography>
        
        <Typography variant="h6" gutterBottom>2. Use of Service</Typography>
        <Typography paragraph>You agree to use our service only for lawful purposes and in accordance with these terms.</Typography>
        
        <Typography variant="h6" gutterBottom>3. Product Information</Typography>
        <Typography paragraph>We strive to provide accurate product information, but we do not warrant that descriptions are error-free.</Typography>
        
        <Typography variant="h6" gutterBottom>4. Pricing</Typography>
        <Typography paragraph>All prices are subject to change without notice. We reserve the right to modify prices at any time.</Typography>
        
        <Typography variant="h6" gutterBottom>5. Delivery</Typography>
        <Typography paragraph>Delivery times are estimates and not guaranteed. We are not liable for delays beyond our control.</Typography>
      </Box>
    </Container>
  );
};

export default Terms;
