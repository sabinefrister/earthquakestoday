import React from 'react';
import { shallow, mount } from 'enzyme';
import BarChart from '../BarChart';

jest.mock("chart.js")


describe('BarChart', () => {
	let wrapper;

	beforeEach(() => {
    const initialProps = {
      data: [
        {
          count: 33,
          magnitude: 0,
          title: "Micro"
        }, 
        {
          count: 51,
          magnitude: 1,
          title: "Micro"
        }, 
      ],
      color: "#FFFFFF",
      title: "Title of the diagram",
      maxTicks: 80,
    }
	  wrapper = shallow(<BarChart {...initialProps} />);
	});

  test('renders BarChart component with all elements', () => {
    expect(wrapper.find('canvas').length).toBe(1);
  })

  test('renders BarChart component with all necessary props', () => {
    const data = [
      {
        count: 33,
        magnitude: 0,
        title: "Micro"
      }, 
      {
        count: 51,
        magnitude: 1,
        title: "Micro"
      }, 
    ]
    expect(wrapper.instance().props.data).toEqual(data);
    expect(wrapper.instance().props.color).toEqual("#FFFFFF");
    expect(wrapper.instance().props.title).toEqual("Title of the diagram");
    expect(wrapper.instance().props.maxTicks).toEqual(80);
  })
});

