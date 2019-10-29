import React from 'react';
import styled from 'styled-components';
import SignUp from '../components/organisms/SignUp';
import SignIn from '../components/organisms/SignIn';
import RequestReset from '../components/organisms/RequestReset';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignUpPage = () => (
  <Columns>
    <SignUp />
    <SignIn />
    <RequestReset />
  </Columns>
);

export default SignUpPage;
