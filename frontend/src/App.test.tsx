import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { State } from './App';

afterEach(() => {
  cleanup();
});

test('sets the current user to null, when not logged in', async () => {
  const mock = new MockAdapter(axios);
  mock.onGet('http://localhost:3000/api/v1/users/current').reply(403, 'Forbidden');
  const component = render(<App />);
  await act(async () => {
    expect(await component.findAllByText('Our content is only available to registered users.')).toHaveLength(1);
  });
});

test('sets the user correctly, when logged in', async () => {
  const mock = new MockAdapter(axios);
  mock.onGet('http://localhost:3000/api/v1/users/current').reply(200, {
    id: 1,
    email: 'email@example.org',
    fullname: 'Example User',
    createdAt: '2020-09-11',
    updatedAt: '2020-09-11',
    password: '__protected__'
  });
  const component = render (<App />);
  await act(async () => {
    expect(await component.findAllByText(/.*Example\ User.*/)).toHaveLength(1);
  });
});
