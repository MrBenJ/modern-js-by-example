// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Menu from './PureMenu';
describe('Menu tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow( <Menu links={[]} />);

    expect(wrapper).toBeTruthy();

  });

  it('Renders at least 1 link', () => {
    const wrapper = shallow( <Menu links={[]} />);

    expect(wrapper.find('.link-wrapper')).toHaveLength(1);
  });

  it('Renders links with correct titles', () => {
    const mockLinks = [
      {
        title: 'Guy',
        path: '/guy',
        chapter: '1'
      },
      {
        title: 'Guy2',
        path: '/guy2',
        chapter: '2'
      },
      {
        title: 'Guy3',
        path: '/guy3',
        chapter: '3'
      }
    ];

    const wrapper = shallow( <Menu links={mockLinks} />);
    expect(wrapper.find('.link-wrapper')).toHaveLength(4);

  });
});