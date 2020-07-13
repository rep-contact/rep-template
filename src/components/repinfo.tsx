import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";

type ContactProps = {
  phone?: string;
  email?: string;
  address1?: string;
  address2?: string;
  state?: string;
  zip?: string;
};

const ContactList: FunctionComponent<ContactProps> = ({
  phone,
  email,
  address1,
  address2,
  state,
  zip,
}) => {
  return (
    <ul>
      {phone && (
        <li>
          <PhoneIcon />
          {phone}
        </li>
      )}
      {email && (
        <li>
          <EmailIcon />
          {email}
        </li>
      )}
      <li>
        <BusinessIcon />
        {address1}
        {address2}
        {state} {zip}
      </li>
    </ul>
  );
};

export default ContactList;
