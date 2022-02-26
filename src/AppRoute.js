import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" >
            {"Copyright @"}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render(){
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Routes>
                            <Route exact  path="/login" element={<Login />} />
                            <Route exact  path="/signup" element={<SignUp />} />
                            <Route exact  path="/" element={<App />} />
                        </Routes>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </BrowserRouter>
            </div>
        );
    }
}

export default AppRouter;