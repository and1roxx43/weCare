import { useMutation, gql } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Button, Form, Image, Header } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';


function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // success
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    // failure
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
        <div className="space"></div>
    <Header as='h2' color='purple' textAlign='center'>
        Log-in to your account
    </Header>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Form.Input
          type="text"
          placeholder="Username..."
          name="username"
          size="big"
          value={values.username}
          error={!!errors.username}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          placeholder="Password..."
          name="password"
          size="big"
          value={values.password}
          error={!!errors.password}
          onChange={onChange}
        />
        <Button style={{width: "100%"}} type="submit" color="purple" size="big">
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
