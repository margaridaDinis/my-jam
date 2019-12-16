import React from 'react';
import Head from 'next/head';

const Meta = () => (
  <Head>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
    <meta charSet='utf-8' />
    <link rel='shortcut icon' href='/static/favicon.png' />
    <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
    <link
      href='https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700'
      rel='stylesheet'
    />
    <title>My Jam!</title>
  </Head>
);

export default Meta;
