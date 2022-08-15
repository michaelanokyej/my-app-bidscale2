import React, { useReducer, useState, useEffect } from "react";
import {
  Container,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Alert,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import ListIcon from "@mui/icons-material/List";
import AlertManager from "./AlertManager";
import AlertForm from "./AlertForm";
import useGenerateId from "../helpers/hooks/useGenerateId";
import AlertComponent from "./AlertComponent";
/*
 * on mount check if there is an alert,
 * if there, set timer, if not show alert form
 */
const Alerts = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  const [showAlertForm, setShowForm] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [time, setTime] = useState(0);
  const [alertObj, setAlertObj] = useState(null);
  const generateAlertId = useGenerateId();

  const handleAction = (action) => {
    if (!action) {
      return;
    }
    if (action === "update") {
      setShowAlerts(false);
      setShowForm(true);
    } else if (action === "list") {
      setShowForm(false);
      setShowAlerts(true);
    }
  };

  useEffect(() => {
    let interval = null;
    if (time > 0) {
      interval = setInterval(() => {
        const alertObj = alerts.shift();
        const filteredAlerts = alerts.slice(0);
        setAlerts(filteredAlerts);
        setAlertObj(alertObj);

        if (filteredAlerts.length > 0) {
          setTime(filteredAlerts[0].alertLimit * 1000);
        } else {
          setTime(0);
        }
      }, time);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [alerts, time]);

  const handleDeleteAlert = (alertId) => {
    const filteredAlerts = alerts.filter((alert) => alert.alertId !== alertId);
    setAlerts(filteredAlerts);
    if (filteredAlerts.length > 0) {
      setTime(filteredAlerts[0].alertLimit * 1000);
    } else {
      setTime(0);
    }
  };

  const handleAlertClose = (alertId) => {
    const filteredAlerts = alerts.filter((alert) => alert.alertId !== alertId);
    setAlerts(filteredAlerts);
    setAlertObj(null);
    if (filteredAlerts.length > 0) {
      setTime(filteredAlerts[0].alertLimit * 1000);
    } else {
      setTime(0);
    }
  };

  const handleAlertList = () => {
    if (alerts.length <= 0) {
      return (
        <Alert variant="filled" severity="info">
          You don't have any alerts at this time. Click on Update Alerts to add
          to an alert!
        </Alert>
      );
    } else {
      return <AlertManager alerts={alerts} onDeleteAlert={handleDeleteAlert} />;
    }
  };

  const handleFormSubmit = (formData) => {
    let myAlerts = alerts;
    /* generate uui here instead of ALertForm component so no 
    unncessary processing is needed if form is cancelled */
    const alertId = generateAlertId(formData.alertText);
    let alertObj = formData;
    alertObj.alertId = alertId;
    /* Add new alert to alert list */
    myAlerts.push(alertObj);
    setAlerts(myAlerts);
    setShowForm(false);
    setShowAlerts(true);
    if (!time) {
      setTime(formData.alertLimit * 1000);
    }
  };

  const handleFormCancel = (formData) => {
    setShowForm(false);
    setShowAlerts(false);
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Box sx={{ height: "100vh" }}>
          <BottomNavigation
            showLabels
            onChange={(event, newValue) => {
              handleAction(newValue);
            }}
          >
            <BottomNavigationAction
              label="Update Alerts"
              icon={<UpdateIcon />}
              value="update"
            />
            <BottomNavigationAction
              label="All ALerts"
              icon={<ListIcon />}
              value="list"
            />
          </BottomNavigation>
          {showAlerts && handleAlertList()}
          {showAlertForm && (
            <AlertForm
              onSubmitForm={handleFormSubmit}
              OnCancelForm={handleFormCancel}
            />
          )}
          {alertObj && (
            <AlertComponent
              alertObj={alertObj}
              onAlertClose={handleAlertClose}
            />
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Alerts;
