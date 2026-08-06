import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { TrendDataPoint } from '@/types/dashboard';

interface RiskTrendChartProps {
  data: TrendDataPoint[];
}

export default function RiskTrendChart({ data }: RiskTrendChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const months = data.map((d) => d.monthLabel || d.month);
    const scores = data.map((d) => d.score || 0);
    const highRisk = data.map((d) => d.highRiskCount || 0);
    const mediumRisk = data.map((d) => d.mediumRiskCount || 0);
    const lowRisk = data.map((d) => d.lowRiskCount || 0);

    chartInstance.current.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: { color: '#999' },
        },
      },
      legend: {
        data: ['健康度评分', '高风险数', '中风险数', '低风险数'],
        top: 0,
        textStyle: { fontSize: 12 },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: months,
        axisLabel: { fontSize: 11 },
      },
      yAxis: [
        {
          type: 'value',
          name: '评分',
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: '{value}',
            fontSize: 11,
          },
        },
        {
          type: 'value',
          name: '数量',
          min: 0,
          axisLabel: {
            fontSize: 11,
          },
        },
      ],
      series: [
        {
          name: '健康度评分',
          type: 'line',
          data: scores,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#1890ff' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
              { offset: 1, color: 'rgba(24, 144, 255, 0.05)' },
            ]),
          },
          itemStyle: { color: '#1890ff' },
        },
        {
          name: '高风险数',
          type: 'line',
          yAxisIndex: 1,
          data: highRisk,
          smooth: true,
          symbol: 'diamond',
          symbolSize: 6,
          lineStyle: { width: 2, color: '#ff4d4f', type: 'dashed' },
          itemStyle: { color: '#ff4d4f' },
        },
        {
          name: '中风险数',
          type: 'line',
          yAxisIndex: 1,
          data: mediumRisk,
          smooth: true,
          symbol: 'triangle',
          symbolSize: 6,
          lineStyle: { width: 2, color: '#faad14', type: 'dashed' },
          itemStyle: { color: '#faad14' },
        },
        {
          name: '低风险数',
          type: 'line',
          yAxisIndex: 1,
          data: lowRisk,
          smooth: true,
          symbol: 'rect',
          symbolSize: 6,
          lineStyle: { width: 2, color: '#52c41a', type: 'dashed' },
          itemStyle: { color: '#52c41a' },
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
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: 300 }} />;
}
