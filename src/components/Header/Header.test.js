// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';
describe('<Header> tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Header siteTitle="Modern Javascript by Example" />);

    expect(wrapper).toBeTruthy();
  });

  it('renders the site title', () => {
    const wrapper = shallow(<Header siteTitle="Modern Javascript by Example" />);
    expect(wrapper
      .find('h1')
      .childAt(0)
      .dive()
      .text())
    .toBe('Modern Javascript by Example');
  });
});
