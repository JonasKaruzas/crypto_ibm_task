import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const color = blue[50];

ReactDOM.createRoot(document.getElementById("root")).render(
  <CssBaseline>
    <div style={{ backgroundColor: color, minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <App />
      </Container>
    </div>
  </CssBaseline>
);
