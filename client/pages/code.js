import React, { useState, useEffect} from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";
import Body from "../components/Body";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const useStyles = makeStyles({
  editor: {
    height: 500,
    width: "100%",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "10px",
  },
});

const customEditorOptions = {
  theme: "vs-dark",
  fontSize: 16,
  fontFamily: "Arial",
  lineNumbersColor: "#bbb",
  cursorColor: "#ddd",
  lineNumbers: "on",
};

const API_URL = "https://judge0-ce.p.rapidapi.com/submissions";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const classes = useStyles();

  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  const handleCompile = async () => {
    try {
      // First, make a post request to submit the code
      const postResponse = await axios.post(
        `${API_URL}`,
        {
          source_code: btoa(code),
          language_id: 71,
          stdin: "",
        },
        {
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "956b93970amsh0557a4725a6aec2p1f7630jsnd6516534bfa7",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      // Extract the token from the post response
      const { token } = postResponse.data;

      // Use the token to make a get request to retrieve the submission details
      const getResponse = await axios.get(`${API_URL}/${token}`, {
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "956b93970amsh0557a4725a6aec2p1f7630jsnd6516534bfa7",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      });

      // Extract the compiled output from the get response
      const { stdout } = getResponse.data;

      // Decode the base64 encoded output
      const decodedOutput = atob(stdout);

      // Update the output state with the compiled output
      setOutput(decodedOutput);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('code')) {
      setCode(localStorage.getItem('code'))
    }
  },

  []);

  return (
    <React.Fragment>
      <Nav />
      <Body>
        <div>
          <Typography
            variant="h3"
            component="h1"
            style={{ fontFamily: "monospace" }}
          >
            Practice some Python coding
          </Typography>
          <Box mb={2}>
            <MonacoEditor
              language="python"
              value={code}
              onChange={handleCodeChange}
              className={classes.editor}
              options={customEditorOptions}
            />
          </Box>
          <Button variant="contained" onClick={handleCompile}>
            Compile
          </Button>
          <Box mt={2} style={{ border: "1px solid black" }}>
            <pre>Output: {output}</pre>
          </Box>
        </div>
      </Body>
      <Footer />
    </React.Fragment>
  );
}

export default App;
