import { React, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

const AlertMsg = ({ showStatus, variant, msg }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(showStatus);
  }, []);
  return (
    <div>
      {show ? (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {msg}
        </Alert>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AlertMsg;
