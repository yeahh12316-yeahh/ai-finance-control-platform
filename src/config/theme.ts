import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1a365d',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1a365d',
    colorTextBase: '#1a1a2e',
    colorBgBase: '#ffffff',
    borderRadius: 6,
    fontSize: 14,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    wireframe: false,
  },
  components: {
    Layout: {
      headerBg: '#1a365d',
      headerColor: '#ffffff',
      siderBg: '#001529',
      triggerBg: '#002140',
    },
    Menu: {
      darkItemBg: '#001529',
      darkItemSelectedBg: '#1a365d',
      darkItemHoverBg: '#1a365d',
      itemBorderRadius: 4,
    },
    Button: {
      primaryShadow: '0 2px 0 rgba(26, 54, 93, 0.15)',
    },
    Card: {
      borderRadiusLG: 8,
    },
    Table: {
      headerBg: '#fafafa',
      headerColor: '#1a1a2e',
      rowHoverBg: '#f0f5ff',
    },
  },
}

// Golden accent color for financial industry highlights
export const accentColor = '#d4a853'

export default theme
