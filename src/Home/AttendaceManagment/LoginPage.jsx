// import SchoolIcon from "@mui/icons-material/School";
// import { Avatar, Button, Container, Paper, TextField, Typography, Box } from "@mui/material";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleSend = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:3001/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ username, password }),
//             });

//             const data = await response.json();

//             if (data.error) {
//                 setError(data.message);
//             } else {
//                 localStorage.setItem("userAuth", JSON.stringify(data.user));
                
//                 if (data.user.role === "admin") {
//                     navigate("/admin");
//                 } else {
//                     navigate("/teacher");
//                 }
//             }
//         } catch (err) {
//             console.error("Login failed", err);
//         }
//     };

//     return (
//         <Container maxWidth="xs">
//             <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
//                 <Avatar sx={{ mx: "auto", bgcolor: "secondary.main", textAlign: "center", mb: 1 }}>
//                     <SchoolIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
//                     Sign In
//                 </Typography>
//                 {error && <Typography color="error" sx={{ textAlign: "center" }}>{error}</Typography>}
//                 <Box component="form" onSubmit={handleSend} noValidate sx={{ mb: 1 }}>
//                     <TextField
//                         placeholder="Enter username"
//                         fullWidth
//                         required
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         sx={{ mb: 2 }}
//                     />
//                     <TextField
//                         placeholder="Enter password"
//                         fullWidth
//                         required
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//                         <Button type="submit" variant="contained">Sign in</Button>
//                     </Box>
//                 </Box>
//             </Paper>
//         </Container>
//     );
// };

// export default LoginPage;
import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Button, Container, Paper, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://school.geoparchin.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.message);
            } else {
                localStorage.setItem("userAuth", JSON.stringify(data.user));

                if (data.user.role === "admin") {
                    navigate("/admin");
                } else if (data.user.role === "teacher") {
                    localStorage.setItem("students", JSON.stringify(data.students)); // Store students for teacher
                    navigate("/teacher");
                }
            }
        } catch (err) {
            console.error("Login failed", err);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{ mx: "auto", bgcolor: "secondary.main", textAlign: "center", mb: 1 }}>
                    <SchoolIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                    Sign In
                </Typography>
                {error && <Typography color="error" sx={{ textAlign: "center" }}>{error}</Typography>}
                <Box component="form" onSubmit={handleSend} noValidate sx={{ mb: 1 }}>
                    <TextField
                        placeholder="Enter username"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        placeholder="Enter password"
                        fullWidth
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Button type="submit" variant="contained">Sign in</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
