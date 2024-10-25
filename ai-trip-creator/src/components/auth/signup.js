import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Signup = ({ closeSignup, openLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.match(passwordRegex)) {
      setError(
        "Password must be at least 8 characters long and contain at least one number."
      );
      setLoading(false);
      return;
    }

    if (!birthday) {
      setError("Please select your birthday");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        name: name.trim(),
        birthday: birthday.format('YYYY-MM-DD'),
        email: email.trim(),
      });

      await sendEmailVerification(auth.currentUser);
      setLoading(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Signup failed:", error);
      setError(
        error.code === "auth/email-already-in-use"
          ? "Email already in use"
          : "Signup failed: " + error.message
      );
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
      className="login-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 440,
        width: '100%',
        padding: '2.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '24px',
        boxShadow: '0 0 40px rgba(0, 0, 0, 0.12)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {!showSuccess ? (
        <>
          <Typography 
            variant="h4" 
            sx={{ 
              textAlign: 'center', 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
            }}
          >
            Create Account
          </Typography>

          {error && <Alert severity="error" sx={{ borderRadius: '12px' }}>{error}</Alert>}

          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  '& fieldset': {
                    borderColor: '#2563eb',
                  },
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1.5px',
              },
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birthday"
              value={birthday}
              onChange={(newValue) => setBirthday(newValue)}
              disableFuture
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    '& fieldset': {
                      borderColor: '#2563eb',
                    },
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1.5px',
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiIconButton-root': {
                  color: '#2563eb',
                  padding: '8px',
                  position: 'absolute',
                  right: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  },
                },
                '& .MuiInputAdornment-root': {
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  marginLeft: 0,
                  marginRight: 0,
                },
              }}
              slotProps={{
                textField: {
                  required: true,
                  error: !birthday && error,
                  helperText: !birthday && error ? 'Birthday is required' : '',
                },
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                    },
                    '& .MuiPickersDay-root': {
                      borderRadius: '8px',
                      '&.Mui-selected': {
                        backgroundColor: '#2563eb',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#1d4ed8',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      },
                    },
                    '& .MuiPickersCalendarHeader-root': {
                      '& .MuiIconButton-root': {
                        borderRadius: '8px',
                      },
                    },
                    '& .MuiPickersYear-yearButton': {
                      borderRadius: '8px',
                      '&.Mui-selected': {
                        backgroundColor: '#2563eb',
                        color: 'white',
                      },
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  '& fieldset': {
                    borderColor: '#2563eb',
                  },
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1.5px',
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  '& fieldset': {
                    borderColor: '#2563eb',
                  },
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1.5px',
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.8,
              mt: 1,
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Already have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  closeSignup();
                  openLogin();
                }}
                sx={{ 
                  fontWeight: 600, 
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'underline',
                  } 
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </>
      ) : (
        <Box textAlign="center" sx={{ py: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Signup Successful!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            A verification link has been sent to your email.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              closeSignup();
              openLogin();
            }}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
              },
            }}
          >
            Go to Login
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Signup;
