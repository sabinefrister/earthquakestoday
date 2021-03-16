import React from 'react';
import { shallow, mount } from 'enzyme';
import DisplayCard from '../DisplayCard';


describe('DisplayCard', () => {
	let wrapper;

	beforeEach(() => {
    const mag = "2.1"
    const felt = "400"
    const place = "SW from CA"
    const date = "June 30 2020"
    const type = "earthquake"
	  wrapper = shallow(<DisplayCard mag={mag} felt={felt} place={place} date={date} type={type}/>);
	});

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders AudioAccess component with all elements', () => {
    console.log(wrapper.debug())
    expect(wrapper.find('Card').length).toBe(1);
  })

  test('renders BarChart component with all necessary props', () => {
    expect(wrapper.instance().props.mag).toEqual("2.1");
    expect(wrapper.instance().props.felt).toEqual("400");
    expect(wrapper.instance().props.place).toEqual("SW from CA");
    expect(wrapper.instance().props.data).toEqual("June 30 2020");
    expect(wrapper.instance().props.type).toEqual("earthquake");
  })
});

