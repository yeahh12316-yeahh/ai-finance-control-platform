import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface DefectStatusChartProps {
  stats?: Record<string, number>;
}

export default function DefectStatusChart({ stats }: DefectStatusChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const categories = ['待整改', '整改中', '待验证', '已验证', '已关闭'];
    const values = stats
      ? [
          stats.pending || 0,
          stats.inProgress || 0,
          stats.completed || 0,
          stats.verified || 0,
          stats.closed || 0,
        ]
      : [];

    chartInstance.current.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: { fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
      },
      series: [
        {
          type: 'bar',
          data: values.map((v, i) => ({
            value: v,
            itemStyle: {
              color: ['#d9d9d9', '#1890ff', '#722ed1', '#13c2c2', '#52c41a'][i],
              borderRadius: [4, 4, 0, 0],
            },
          })),
          barWidth: '40%',
          label: {
            show: true,
            position: 'top',
            fontSize: 11,
          },
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
  }, [stats]);

  return <div ref={chartRef} style={{ width: '100%', height: 300 }} />;
}
