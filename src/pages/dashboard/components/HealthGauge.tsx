import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface HealthGaugeProps {
  value: number;
}

export default function HealthGauge({ value }: HealthGaugeProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    chartInstance.current.setOption({
      series: [
        {
          type: 'gauge',
          center: ['50%', '55%'],
          radius: '85%',
          startAngle: 210,
          endAngle: -30,
          min: 0,
          max: 100,
          splitNumber: 10,
          axisLine: {
            show: true,
            lineStyle: {
              width: 20,
              color: [
                [0.4, '#ff4d4f'],
                [0.6, '#ff7a45'],
                [0.8, '#faad14'],
                [1, '#52c41a'],
              ],
            },
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '60%',
            width: 8,
            offsetCenter: [0, '-10%'],
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2,
            },
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 4,
            },
          },
          axisLabel: {
            distance: 25,
            color: '#666',
            fontSize: 12,
            formatter: '{value}%',
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 20,
            itemStyle: {
              borderWidth: 2,
            },
          },
          title: {
            show: true,
            offsetCenter: [0, '75%'],
            fontSize: 14,
            color: '#666',
          },
          detail: {
            valueAnimation: true,
            fontSize: 32,
            offsetCenter: [0, '40%'],
            formatter: '{value}%',
            color: 'auto',
          },
          data: [
            {
              value,
              name: '内控健康度',
            },
          ],
        },
      ],
    });

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [value]);

  return <div ref={chartRef} style={{ width: '100%', height: 300 }} />;
}
