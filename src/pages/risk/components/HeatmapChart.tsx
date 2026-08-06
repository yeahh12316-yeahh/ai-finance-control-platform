import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

interface HeatmapDataItem {
  value: [number, number, number];
  name?: string;
  extra?: Record<string, unknown>;
}

interface HeatmapChartProps {
  xAxisData: string[];
  yAxisData: string[];
  data: HeatmapDataItem[];
  visualMin?: number;
  visualMax?: number;
  inRangeColors?: string[];
  height?: number;
  showLabel?: boolean;
  tooltipFormatter?: (params: Record<string, unknown>) => string;
  onClick?: (params: Record<string, unknown>) => void;
}

function HeatmapChart({
  xAxisData,
  yAxisData,
  data,
  visualMin = 0,
  visualMax = 20,
  inRangeColors = ['#52c41a', '#faad14', '#ff7a45', '#ff4d4f'],
  height = 400,
  showLabel = true,
  tooltipFormatter,
  onClick,
}: HeatmapChartProps) {
  const option: EChartsOption = {
    tooltip: {
      position: 'top',
      formatter: tooltipFormatter as EChartsOption['tooltip'],
    },
    grid: {
      left: '10%',
      right: '5%',
      top: 40,
      bottom: 40,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      splitArea: { show: true },
      axisLabel: {
        rotate: xAxisData.length > 5 ? 30 : 0,
      },
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      splitArea: { show: true },
    },
    visualMap: {
      min: visualMin,
      max: visualMax,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: { color: inRangeColors },
      show: true,
    },
    series: [
      {
        type: 'heatmap',
        data: data.map((d) => d.value),
        label: {
          show: showLabel,
          color: '#000',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const onEvents = onClick
    ? {
        click: (params: Record<string, unknown>) => onClick(params),
      }
    : undefined;

  return (
    <ReactECharts
      option={option}
      style={{ height, width: '100%' }}
      onEvents={onEvents}
      opts={{ renderer: 'canvas' }}
    />
  );
}

export default HeatmapChart;
