import type { MenuProps } from 'antd'
import {
  DashboardOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  RobotOutlined,
  AlertOutlined,
  AuditOutlined,
  BugOutlined,
  DatabaseOutlined,
  HistoryOutlined,
  SettingOutlined,
  PartitionOutlined,
  WarningOutlined,
  TableOutlined,
  FormOutlined,
  FundProjectionScreenOutlined,
  HeatMapOutlined,
  ScheduleOutlined,
  FileSearchOutlined,
  FileDoneOutlined,
  EditOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  UserOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

const menuItems: MenuItem[] = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '管理驾驶舱',
  },
  {
    key: '/internal-control',
    icon: <ApartmentOutlined />,
    label: '内控体系',
    children: [
      {
        key: '/internal-control/process',
        icon: <PartitionOutlined />,
        label: '流程目录',
      },
      {
        key: '/internal-control/risk',
        icon: <WarningOutlined />,
        label: '风险目录',
      },
      {
        key: '/internal-control/rcm',
        icon: <TableOutlined />,
        label: 'RCM矩阵',
      },
    ],
  },
  {
    key: '/documents',
    icon: <FileTextOutlined />,
    label: '制度文档',
  },
  {
    key: '/copilot',
    icon: <RobotOutlined />,
    label: 'AI工作台',
  },
  {
    key: '/risk',
    icon: <AlertOutlined />,
    label: '风险管理',
    children: [
      {
        key: '/risk/list',
        icon: <FormOutlined />,
        label: '风险清单',
      },
      {
        key: '/risk/questionnaire',
        icon: <FundProjectionScreenOutlined />,
        label: '风险问卷',
      },
      {
        key: '/risk/matrix',
        icon: <TableOutlined />,
        label: '评估矩阵',
      },
      {
        key: '/risk/heatmap',
        icon: <HeatMapOutlined />,
        label: '风险热力图',
      },
    ],
  },
  {
    key: '/evaluation',
    icon: <AuditOutlined />,
    label: '内控评价',
    children: [
      {
        key: '/evaluation/plan',
        icon: <ScheduleOutlined />,
        label: '评价计划',
      },
      {
        key: '/evaluation/worksheet',
        icon: <FileSearchOutlined />,
        label: '测试底稿',
      },
      {
        key: '/evaluation/report',
        icon: <FileDoneOutlined />,
        label: '报告生成',
      },
    ],
  },
  {
    key: '/defects',
    icon: <BugOutlined />,
    label: '缺陷整改',
    children: [
      {
        key: '/defects/register',
        icon: <EditOutlined />,
        label: '缺陷登记',
      },
      {
        key: '/defects/board',
        icon: <ProjectOutlined />,
        label: '任务看板',
      },
      {
        key: '/defects/verify',
        icon: <CheckCircleOutlined />,
        label: '闭环验证',
      },
    ],
  },
  {
    key: '/knowledge',
    icon: <DatabaseOutlined />,
    label: '知识库',
  },
  {
    key: '/audit',
    icon: <HistoryOutlined />,
    label: '审计日志',
  },
  {
    key: '/system',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      {
        key: '/system/users',
        icon: <UserOutlined />,
        label: '用户管理',
      },
      {
        key: '/system/roles',
        icon: <TeamOutlined />,
        label: '角色管理',
      },
      {
        key: '/system/permissions',
        icon: <SafetyCertificateOutlined />,
        label: '权限配置',
      },
    ],
  },
]

export default menuItems
