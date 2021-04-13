import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Logout(props) {
  useEffect(() => {
    props.onMount();
  });
  return <Redirect to="/login" />;
}

export default Logout;
