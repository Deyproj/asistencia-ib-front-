import { memo, useMemo } from "react";
import ReactApexChart from 'react-apexcharts';

const DonutChart = memo(({ title, series, subtitle, onClickAusentes }) => {
    const options = useMemo(() => {
        return {
            chart: {
                type: 'donut',
                events: {
                    dataPointSelection: function(event, chartContext, config) {
                        const selectedLabel = config.w.config.labels[config.dataPointIndex];
                        if (selectedLabel === "Ausentes") {
                            onClickAusentes(title);
                        }
                    },
                },
            },
            labels: ['Presentes', 'Ausentes', 'Por Validar'],
            colors: ['#00963E', '#E82323', '#CBCBCB'],
            legend: {
                position: 'bottom',
                margin: {
                    top: 20,
                    bottom: 20,
                },
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '45%',
                        borderWidth: 2,
                        borderColor: '#E8E8E8',
                    }
                },
            },
            dataLabels: {
                style: {
                    fontSize: 16,
                }
            },
            title: {
                text: title,
                align: 'left',
                margin: 0,
                offsetX: 50,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    color: '#263238'
                },
            },
            subtitle: {
                text: `${subtitle}`,
                align: 'right',
                margin: 0,
                offsetX: -50,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '20px',
                    fontWeight: 'normal',
                    fontFamily: 'Roboto',
                    color: '#9699a2'
                },
            },
        };
    }, [title, subtitle]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="donut"/>
        </div>
    );
});

export default DonutChart;