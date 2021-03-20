import React from 'react';
import { shallow, mount } from 'enzyme';
import DisplayCard from '../DisplayCard';


describe('DisplayCard', () => {
	let wrapper;

	beforeEach(() => {
    const initialProps = {
      mag: "2.1",
      felt: 400,
      place: "SW from CA",
      date: "June 30 2020",
      type: "earthquake",
      id: 2,
      description: "mag"
    }
    
	  wrapper = shallow(<DisplayCard {...initialProps} />);
	});

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders DisplayCard component with all elements', () => {
    expect(wrapper.find('Card').length).toBe(1);
  })
});
