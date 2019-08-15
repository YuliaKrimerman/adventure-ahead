import React from 'react';
import ReactDOM from 'react-dom';
import BucketList from './BucketList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BucketList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
