import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Link from "@mui/material/Link";

export default function AlertComponent({ alertObj, onAlertClose }) {
  return (
    <Alert
      sx={{
        width: "30%",
        position: "absolute",
        left: "60%",
        top: 10,
        right: 10,
      }}
      severity={alertObj.alertType}
      onClose={() => {
        onAlertClose(alertObj.alertId);
      }}
    >
      <AlertTitle>{alertObj.alertText}</AlertTitle>
      <Link href={alertObj.alertLink}>{alertObj.alertLink}</Link>
    </Alert>
  );
}
