import React, { FunctionComponent } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";

type Address = {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
};
type ContactProps = {
  phone?: string;
  email?: string;
  address?: Address;
};

const ContactList: FunctionComponent<ContactProps> = ({
  phone,
  email,
  address,
}) => {
  return (
    <ul>
      {phone && (
        <li>
          <PhoneIcon />
          <a href={"tel:" + phone}>{phone}</a>
        </li>
      )}
      {email && (
        <li>
          <EmailIcon /> <a href={"mailto:" + email}>{email}</a>
        </li>
      )}
      {address && (
        <li>
          <BusinessIcon />
          {address.address1}
          {address.address2}
          {address.state} {address.zip}
        </li>
      )}
    </ul>
  );
};

export default ContactList;
