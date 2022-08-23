import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import {Tabs} from "@mui/material";
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import "./Home.css";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import {Modal} from "@mui/material";

import OnCampus from "../Sidebar/OnCampus";
import EligibleStudent from "./EligibleStudent";
import Noteligible from "./Noteligible";

import Footer from './../../common/footer';


function Home() {
  const [value, setValue] = useState("1");

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={styleModal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Are you sure you want to Register?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" color="success" sx={{ margin: "1rem" }}>
              Register
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ margin: "1rem" }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "30%", margin: "0 2rem" }} class="oncamp_side">
          <OnCampus />
        </Box>
        <Box sx={{ width: "78%", margin: "0 2rem" }} class="oncamp_rest">
          <div className="header_company">REGISTER NOW</div>
          <TabContext value={value}>
            <Box
              sx={{ bgcolor: "background.paper" }}
              style={{ padding: "1rem" }}
            >
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Eligible" value="1" />
                <Tab label="Others" value="2" />
              </Tabs>
            </Box>
            <TabPanel value="1">
              <EligibleStudent />
            </TabPanel>
            <TabPanel value="2">
              <Noteligible />
            </TabPanel>
          </TabContext>
        </Box>
        
      </Container>
      
    </div>
    
  );
}

export default Home;
