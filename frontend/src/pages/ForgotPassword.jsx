import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper, Link, Alert } from '@mui/material';
import { LockReset } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (Object.keys(users).length === 0) {
      setError('No users registered. Please sign up first.');
      return;
    }
    
    if (!users[email]) {
      setError('Email not registered. Please check your email or sign up.');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setSuccess(`Verification code: ${otp}`);
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (otp !== generatedOtp) {
      setError('Invalid OTP');
      return;
    }
    
    setSuccess('OTP verified! Enter new password');
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[email].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Password reset successfully! Redirecting to login...');
    
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, borderRadius: '50%', mb: 2 }}>
            <LockReset fontSize="large" />
          </Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Reset Password</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {step === 1 && 'Enter your email address'}
            {step === 2 && 'Enter the OTP sent to your email'}
            {step === 3 && 'Enter your new password'}
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2, width: '100%' }}>{success}</Alert>}
          
          {step === 1 && (
            <Box component="form" onSubmit={handleEmailSubmit} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button fullWidth type="submit" variant="contained" size="large" sx={{ py: 1.5, fontSize: '1.1rem', mb: 2 }}>
                Send OTP
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link href="/login" underline="hover">Back to Login</Link>
              </Box>
            </Box>
          )}

          {step === 2 && (
            <Box component="form" onSubmit={handleOtpSubmit} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button fullWidth type="submit" variant="contained" size="large" sx={{ py: 1.5, fontSize: '1.1rem', mb: 2 }}>
                Verify OTP
              </Button>
            </Box>
          )}

          {step === 3 && (
            <Box component="form" onSubmit={handlePasswordSubmit} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button fullWidth type="submit" variant="contained" size="large" sx={{ py: 1.5, fontSize: '1.1rem', mb: 2 }}>
                Reset Password
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
