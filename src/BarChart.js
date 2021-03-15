import React from 'react';
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
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'bar',
      options: {
	      maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: parseInt(this.props.maxTicks)
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.data.map(d => `${d.magnitude} - ${d.title}`),
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