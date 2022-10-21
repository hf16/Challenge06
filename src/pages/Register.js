import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import GoogleLogin from "../components/GoogleLogin";

import { useHistory } from "react-router-dom";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Email is required");
      return;
    }
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (email !== "" && password !== "" && name !== "") {
      const data = {
        name,
        email,
        password,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/register`,
          data
        );
        if (result.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
          history.replace("/");
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    }
  };


  return (
    <div>
      <header className="App-header mt-5 pt-5">
        <Container>
          <Row>
            <Col>
                <>
                  <GoogleLogin
                    setToken={setToken}
                    label="Register with Google"
                  />

                <h3 className="text-danger mt-3"> OR</h3>

                  <Form onSubmit={handleSubmit}>
                  <Form.Group className="text-primary mt-2" controlId="formBasicEmail">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukan Nama"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required    
                    />
                  </Form.Group>

                    <Form.Group className="text-primary mt-4" controlId="formBasicEmail">
                      <Form.Label>EMAIL ADDRESS</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Masukan email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-5 text-primary mt-4" controlId="formBasicPassword">
                      <Form.Label>PASSWORD</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Masukan Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button variant="danger" size="lg" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </>

            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default Register;
