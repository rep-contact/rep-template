import React, { FunctionComponent } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import { List, ListItem, ListItemText } from "@material-ui/core";

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
    <List>
      {phone && (
        <ListItem>
          <ListItemText>
            <PhoneIcon />
            <a href={"tel:" + phone}>{phone}</a>
          </ListItemText>
        </ListItem>
      )}
      {email && (
        <ListItem>
          <ListItemText>
            <EmailIcon /> <a href={"mailto:" + email}>{email}</a>
          </ListItemText>
        </ListItem>
      )}
      {address && (
        <ListItem>
          <ListItemText>
            <BusinessIcon />
            {address.address1}
            {address.address2}
            {address.state} {address.zip}
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default ContactList;
