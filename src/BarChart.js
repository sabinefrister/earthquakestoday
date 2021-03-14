import React, { Component }  from 'react';
import Chart from 'chart.js';


class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.magnitude);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.count);
    this.myChart.update();
  }

  componentDidMount() {
    console.log(this.props.data)
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'bar',
      options: {
	      maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.data.map(d => d.magnitude),
        datasets: [{
          label: this.props.title,
          data: this.props.data.map(d => d.count),
          backgroundColor: this.props.color
        }]
      }
    });
  }

  render() {
    return (
        <canvas ref={this.canvasRef} />
    );
  }
}


export default BarChart;