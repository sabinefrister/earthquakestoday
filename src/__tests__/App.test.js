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
    expect(wrapper.find('Alert').length).toBe(1); //prop should be false
    expect(wrapper.find('.title').length).toBe(1); 
    expect(wrapper.find('Alert').props().show).toBe(false)
    expect(wrapper.find('Spinner').length).toBe(1)

  })  

  test('renders App component with all elements after loading page', () => {
  	const data = {
  		metadata: {
  			count: 250
  		}, 
  		features: [
  			{
					properties: {
	  				felt: 40, 
	  				mag: 1.35,
	  				place: "12km N of Banning, CA",
	  				type: "earthquake",
	  				time: 1616079471284,
	  			}
	  		},
	  		{
					properties: {
	  				felt: 400, 
	  				mag: 8,
	  				place: "9km N of Warner Springs, CA",
	  				type: "quarry blast",
	  				time: 1616079212980,
	  			}
	  		},
	  		{
					properties: {
	  				felt: 3, 
	  				mag: 5,
	  				place: "28 km E of Honaunau-Napoopoo, Hawaii",
	  				type: "explosion",
	  				time: 1616071842210,
	  			}
	  		}
  		]
  	}
  	wrapper.setState({ loading: false, earthquakeData: data });
  	console.log(wrapper.debug()) 
  	expect(wrapper.find('Spinner').length).toBe(0)
  	expect(wrapper.find('.title').length).toBe(1); 
    expect(wrapper.find('.special-events div').length).toBe(3)
    expect(wrapper.find('DisplayCard').length).toBe(9)
    expect(wrapper.find('BarChart').length).toBe(1)
  })  

  test('shows error message', () => {
  	wrapper.setState({ showAlert: true, alertMessage: "This is an error message",});
    expect(wrapper.find('Alert').length).toBe(1);
    expect(wrapper.find('Alert').props().show).toBe(true)
  })
});

