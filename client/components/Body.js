import Head from 'next/head';
import Router from 'next/router';

const Body = ({ children }) => {
  const head = () => (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="/static/css/styles.css" />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Head>{head()}</Head>
      <div
        className="container pt-5 pb-5"
        style={{ minHeight: '100vh', position: 'relative' }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default Body;
