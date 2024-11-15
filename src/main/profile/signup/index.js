import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usersApi } from "../../../services/users/api";

const SignUp = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null); // State for image preview
  console.log("users", users);
  const {
    getRootProps: getRootPropsProfileImage,
    getInputProps: getInputPropsProfileImage,
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setProfileImagePreview(URL.createObjectURL(file)); // Set the preview URL
        formik.setFieldValue("profileImage", file);
      }
    },
  });

  const {
    getRootProps: getRootPropsProfileBackground,
    getInputProps: getInputPropsProfileBackground,
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        formik.setFieldValue("profileBackground", file);
      }
    },
  });

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    profileBackground: null,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    profileImage: Yup.mixed().required("Profile image is required"),
    profileBackground: Yup.mixed().required(
      "Profile background image is required"
    ),
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // Create a FormData instance
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("profileimage", values.profileImage); // Fixed key for consistency
      formData.append("profilebackground", values.profileBackground); // Fixed key for consistency

      // Make API call to add user
      await usersApi.addUser(formData);

      // Fetch the updated list of users
      const { data } = await usersApi.getAllUsers();
      setUsers(data); // Ensure response structure is handled correctly

      console.log("User created successfully");
    } catch (err) {
      console.error("Error creating user:", err.message || err);
    } finally {
      setLoading(false);
    }
  };
  const getAllUsers = async () => {
    setLoading(true);

    try {
      const { data } = await usersApi.getAllUsers();
      setUsers(data); // Ensure response structure is handled correctly

      console.log("Users", data);
    } catch (err) {
      console.error("Error creating user:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {/* General error */}
          {formik.errors.general && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ mb: 2 }}
            >
              {formik.errors.general}
            </Typography>
          )}

          {/* Username */}
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          {/* Email */}
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Mobile Number"
            name="phone"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          {/* Password */}
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          {/* Profile Image Upload */}
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <div {...getRootPropsProfileImage()}>
              <input {...getInputPropsProfileImage()} />
              <Button variant="contained" sx={{ mr: 2 }}>
                Upload Profile Image
              </Button>
            </div>
            {profileImagePreview && (
              <Avatar
                src={profileImagePreview}
                alt="Profile Preview"
                sx={{ width: 56, height: 56 }}
              />
            )}
            {formik.touched.profileImage && formik.errors.profileImage && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {formik.errors.profileImage}
              </Typography>
            )}
          </Box>

          {/* Profile Background Image Upload */}
          <Box sx={{ mt: 2 }}>
            <div {...getRootPropsProfileBackground()}>
              <input {...getInputPropsProfileBackground()} />
              <Button variant="contained" fullWidth>
                Upload Profile Background Image
              </Button>
            </div>
            {formik.touched.profileBackground &&
              formik.errors.profileBackground && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {formik.errors.profileBackground}
                </Typography>
              )}
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={formik.isSubmitting || loading}
          >
            {formik.isSubmitting || loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        {/* Users List */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Users List
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                getAllUsers();
              }}
            >
              Get users
            </Button>
          </Typography>
          <List>
            {users.map((user) => {
              const imageUrl = `http://localhost:5000/api/users/image/${user.useruuid}/profilebackground`;
              console.log(imageUrl); // Check the URL being generated
              return (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <Avatar
                      alt={user.username}
                      src={imageUrl}
                      sx={{ width: 100, height: 100 }} // Avatar size
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`${user.username} - ${user.email}`} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
