import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';

const ListItemLink = ({ primary, to }) => {
  const CustomLink = React.useMemo(
    () => React.forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={CustomLink} sx={{ color: "text.primary" }}>
        <ListItemText primary={primary} style={{ color: "#000000 !important" }}/>
      </ListItem>
    </li>
  );
};

export default ListItemLink;
