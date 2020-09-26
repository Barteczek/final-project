import React from 'react';
import { shallow } from 'enzyme';
import { BannerComponent } from './Banner';

describe('Component Banner', () => {
  it('should render without crashing', () => {
    const component = shallow(<BannerComponent />);
    expect(component).toBeTruthy();
  });
});
