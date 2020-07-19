import React, { FunctionComponent } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import {
  List,
  ListItem,
  ListItemText,
  Link,
  ListItemIcon,
} from "@material-ui/core";

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
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText>
            <Link href={"tel:" + phone}>{phone}</Link>
          </ListItemText>
        </ListItem>
      )}
      {email && (
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>
            <Link href={"mailto:" + email}>{email}</Link>
          </ListItemText>
        </ListItem>
      )}
      {address && (
        <ListItem>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText>
            {address.address1}{' '}
            {address.address2}
            {address.state} {address.zip}
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default ContactList;
