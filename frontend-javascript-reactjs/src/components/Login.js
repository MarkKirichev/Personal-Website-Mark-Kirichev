import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import { Form, Button } from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/token", {
                username,
                password,
            });

            localStorage.setItem("access_token", response.data.access_token);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className={styles.login-container}>
            <h1 className="h3 mb-3">Sign in</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label className={styles.formLabel}>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.formControl}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label className={styles.formLabel}>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.formControl}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className={styles.submitBtn}>
                    Login
                </Button>
        </Form>
        </div>
    );
};

export default Login;
