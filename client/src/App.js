// Importing required modules and components
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import state from "state"; // (Assuming this is a custom state module)

// Main component - App
function App() {
  // Using 'useSelector' hook from react-redux to get the 'mode' state from the Redux store
  const mode = useSelector((state) => state.mode);

  // Using 'useMemo' hook to create a theme based on the selected 'mode' value
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      {/* Wrapping the entire app with 'ThemeProvider' from Material-UI to apply the created theme */}
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Applying a baseline CSS reset using 'CssBaseline' from Material-UI */}
        <Routes>
          {/* Defining routes for different pages */}
          <Route path="/" element={<LoginPage />} /> {/* Route for the login page */}
          <Route path="/home" element={<HomePage />} /> {/* Route for the home page */}
          <Route
            path="/profile/:userId"
            element={<ProfilePage />} // Route for the profile page with a dynamic parameter 'userId'
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;