import React, { useState } from 'react';

import './style.scss';
import OakTypography from '../../oakui/wc/OakTypography';

interface Props {
  match: any;
  history: any;
}

const Home = (props: Props) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    fileexample: '',
    category: '',
    country: '',
  });

  return <OakTypography variant="h2">Home</OakTypography>;
};

export default Home;
