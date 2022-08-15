import React, { useState } from "react";
import { MenuItem, Box, TextField, Button, Stack } from "@mui/material";

export default function AlertForm({ onSubmitForm, OnCancelForm }) {
  const [formData, setFormData] = useState({
    alertText: "",
    alertLink: "",
    alertType: "",
    alertLimit: 0,
  });
  const alertTypes = [
    {
      value: "warning",
      label: "WARNING",
    },
    {
      value: "error",
      label: "ERROR",
    },
    {
      value: "info",
      label: "INFO",
    },
    {
      value: "success",
      label: "SUCCESS",
    },
  ];
  const handleDisabledButton = () => {
    if (
      formData.alertText !== "" &&
      formData.alertLink !== "" &&
      formData.alertType !== ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (event) => {
    const myFormData = { ...formData };
    myFormData[event.target.name] = event.target.value;
    setFormData(myFormData);
  };


  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate={false}
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-name"
          label="Name"
          placeholder="My Alert"
          variant="filled"
          name="alertText"
          error={formData.alertText === ""}
          helperText={formData.alertText === "" ? 'Empty!' : ' '}
          onChange={handleChange}
        />
        <TextField
          id="filled-link"
          label="link"
          placeholder="www.michaelanokye.com"
          type="url"
          variant="filled"
          name="alertLink"
          error={formData.alertLink === ""}
          helperText={formData.alertLink === "" ? 'Empty!' : ' '}
          onChange={handleChange}
        />
        <TextField
          id="outlined-select-alert-type"
          select
          label="Select"
          value={formData.alertType}
          onChange={handleChange}
          name="alertType"
          error={formData.alertType === ""}
          helperText={formData.alertType === "" ? 'Empty!' : ' '}
        >
          {alertTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="filled-time-limit"
          label="Time Limit in Seconds"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          name="alertLimit"
          error={formData.alertLimit === 0}
          helperText={formData.alertLimit === 0 ? 'Cannot be 0!' : ' '}
          onChange={handleChange}
        />
      </div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          disabled={handleDisabledButton()}
          onClick={() => onSubmitForm(formData)}
        >
          Submit
        </Button>
        <Button variant="contained" onClick={OnCancelForm}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}
