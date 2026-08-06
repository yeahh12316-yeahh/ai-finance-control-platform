import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface RiskDistributionChartProps {
  stats?: Record<string, number>;
}

export default function RiskDistributionChart({ stats }: RiskDistributionChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const data = stats
      ? [
          { name: '信用风险', value: stats.creditRisk || 15 },
          { name: '市场风险', value: stats.marketRisk || 8 },
          { name: '操作风险', value: stats.operationalRisk || 12 },
          { name: '合规风险', value: stats.complianceRisk || 6 },
          { name: '流动性风险', value: stats.liquidityRisk || 4 },
          { name: '其他风险', value: stats.otherRisk || 3 },
        ]
      : [];

    chartInstance.current.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { fontSize: 12 },
      },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{d}%',
            fontSize: 11,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
            },
          },
          data,
          color: ['#ff4d4f', '#faad14', '#1890ff', '#722ed1', '#13c2c2', '#8c8c8c'],
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
