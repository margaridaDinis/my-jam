import React from 'react';
import { Card, CardSection } from '@kiwicom/orbit-components/lib';
import SignIn from '../components/organisms/SignIn';

const SignUpPage = () => (
  <Card>
    <CardSection>
      <SignIn shouldRedirectOnSuccess/>
    </CardSection>
  </Card>
);

export default SignUpPage;
