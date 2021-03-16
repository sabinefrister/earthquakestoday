import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';


describe('App', () => {
	let wrapper;

	beforeEach(() => {
	  wrapper = shallow(<App />);
	});

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders App component with all elements when loading page', () => {
  	console.log(wrapper.debug())
    expect(wrapper.find('Alert').length).toBe(1); //prop should be false
    expect(wrapper.find('.title').length).toBe(1); 
  })
});

