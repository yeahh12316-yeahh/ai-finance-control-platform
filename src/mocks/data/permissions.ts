export const seedPermissions = [
  // 工作台
  { id: '1', permCode: 'dashboard', permName: '工作台', permType: 'menu' as const, parentId: '0', path: '/dashboard', icon: 'DashboardOutlined', sortOrder: 1 },
  { id: '2', permCode: 'dashboard:view', permName: '查看工作台', permType: 'button' as const, parentId: '1', path: '', icon: '', sortOrder: 1 },

  // 流程管理
  { id: '10', permCode: 'process', permName: '流程管理', permType: 'menu' as const, parentId: '0', path: '/process', icon: 'ApartmentOutlined', sortOrder: 2 },
  { id: '11', permCode: 'process:view', permName: '查看流程', permType: 'button' as const, parentId: '10', path: '', icon: '', sortOrder: 1 },
  { id: '12', permCode: 'process:create', permName: '新建流程', permType: 'button' as const, parentId: '10', path: '', icon: '', sortOrder: 2 },
  { id: '13', permCode: 'process:edit', permName: '编辑流程', permType: 'button' as const, parentId: '10', path: '', icon: '', sortOrder: 3 },
  { id: '14', permCode: 'process:delete', permName: '删除流程', permType: 'button' as const, parentId: '10', path: '', icon: '', sortOrder: 4 },

  // 风险管理
  { id: '20', permCode: 'risk', permName: '风险管理', permType: 'menu' as const, parentId: '0', path: '/risk', icon: 'WarningOutlined', sortOrder: 3 },
  { id: '21', permCode: 'risk:view', permName: '查看风险', permType: 'button' as const, parentId: '20', path: '', icon: '', sortOrder: 1 },
  { id: '22', permCode: 'risk:create', permName: '新建风险', permType: 'button' as const, parentId: '20', path: '', icon: '', sortOrder: 2 },
  { id: '23', permCode: 'risk:edit', permName: '编辑风险', permType: 'button' as const, parentId: '20', path: '', icon: '', sortOrder: 3 },
  { id: '24', permCode: 'risk:delete', permName: '删除风险', permType: 'button' as const, parentId: '20', path: '', icon: '', sortOrder: 4 },
  { id: '25', permCode: 'risk:assess', permName: '风险评估', permType: 'button' as const, parentId: '20', path: '', icon: '', sortOrder: 5 },

  // 控制措施
  { id: '30', permCode: 'control', permName: '控制措施', permType: 'menu' as const, parentId: '0', path: '/control', icon: 'SafetyOutlined', sortOrder: 4 },
  { id: '31', permCode: 'control:view', permName: '查看控制', permType: 'button' as const, parentId: '30', path: '', icon: '', sortOrder: 1 },
  { id: '32', permCode: 'control:create', permName: '新建控制', permType: 'button' as const, parentId: '30', path: '', icon: '', sortOrder: 2 },
  { id: '33', permCode: 'control:edit', permName: '编辑控制', permType: 'button' as const, parentId: '30', path: '', icon: '', sortOrder: 3 },
  { id: '34', permCode: 'control:delete', permName: '删除控制', permType: 'button' as const, parentId: '30', path: '', icon: '', sortOrder: 4 },

  // RCM映射
  { id: '40', permCode: 'rcm', permName: 'RCM映射', permType: 'menu' as const, parentId: '0', path: '/rcm', icon: 'LinkOutlined', sortOrder: 5 },
  { id: '41', permCode: 'rcm:view', permName: '查看RCM', permType: 'button' as const, parentId: '40', path: '', icon: '', sortOrder: 1 },
  { id: '42', permCode: 'rcm:create', permName: '新建映射', permType: 'button' as const, parentId: '40', path: '', icon: '', sortOrder: 2 },
  { id: '43', permCode: 'rcm:edit', permName: '编辑映射', permType: 'button' as const, parentId: '40', path: '', icon: '', sortOrder: 3 },
  { id: '44', permCode: 'rcm:delete', permName: '删除映射', permType: 'button' as const, parentId: '40', path: '', icon: '', sortOrder: 4 },

  // 制度文档
  { id: '50', permCode: 'document', permName: '制度文档', permType: 'menu' as const, parentId: '0', path: '/document', icon: 'FileTextOutlined', sortOrder: 6 },
  { id: '51', permCode: 'document:view', permName: '查看文档', permType: 'button' as const, parentId: '50', path: '', icon: '', sortOrder: 1 },
  { id: '52', permCode: 'document:upload', permName: '上传文档', permType: 'button' as const, parentId: '50', path: '', icon: '', sortOrder: 2 },
  { id: '53', permCode: 'document:edit', permName: '编辑文档', permType: 'button' as const, parentId: '50', path: '', icon: '', sortOrder: 3 },
  { id: '54', permCode: 'document:delete', permName: '删除文档', permType: 'button' as const, parentId: '50', path: '', icon: '', sortOrder: 4 },

  // 内控评价
  { id: '60', permCode: 'evaluation', permName: '内控评价', permType: 'menu' as const, parentId: '0', path: '/evaluation', icon: 'AuditOutlined', sortOrder: 7 },
  { id: '61', permCode: 'evaluation:view', permName: '查看评价', permType: 'button' as const, parentId: '60', path: '', icon: '', sortOrder: 1 },
  { id: '62', permCode: 'evaluation:create', permName: '创建评价', permType: 'button' as const, parentId: '60', path: '', icon: '', sortOrder: 2 },
  { id: '63', permCode: 'evaluation:edit', permName: '编辑评价', permType: 'button' as const, parentId: '60', path: '', icon: '', sortOrder: 3 },
  { id: '64', permCode: 'evaluation:delete', permName: '删除评价', permType: 'button' as const, parentId: '60', path: '', icon: '', sortOrder: 4 },
  { id: '65', permCode: 'evaluation:approve', permName: '审批评价', permType: 'button' as const, parentId: '60', path: '', icon: '', sortOrder: 5 },

  // 缺陷管理
  { id: '70', permCode: 'defect', permName: '缺陷管理', permType: 'menu' as const, parentId: '0', path: '/defect', icon: 'BugOutlined', sortOrder: 8 },
  { id: '71', permCode: 'defect:view', permName: '查看缺陷', permType: 'button' as const, parentId: '70', path: '', icon: '', sortOrder: 1 },
  { id: '72', permCode: 'defect:create', permName: '新建缺陷', permType: 'button' as const, parentId: '70', path: '', icon: '', sortOrder: 2 },
  { id: '73', permCode: 'defect:edit', permName: '编辑缺陷', permType: 'button' as const, parentId: '70', path: '', icon: '', sortOrder: 3 },
  { id: '74', permCode: 'defect:delete', permName: '删除缺陷', permType: 'button' as const, parentId: '70', path: '', icon: '', sortOrder: 4 },
  { id: '75', permCode: 'defect:remediate', permName: '整改缺陷', permType: 'button' as const, parentId: '70', path: '', icon: '', sortOrder: 5 },

  // 审计日志
  { id: '80', permCode: 'audit', permName: '审计日志', permType: 'menu' as const, parentId: '0', path: '/audit', icon: 'FileSearchOutlined', sortOrder: 9 },
  { id: '81', permCode: 'audit:view', permName: '查看日志', permType: 'button' as const, parentId: '80', path: '', icon: '', sortOrder: 1 },

  // 统计报表
  { id: '90', permCode: 'report', permName: '统计报表', permType: 'menu' as const, parentId: '0', path: '/report', icon: 'BarChartOutlined', sortOrder: 10 },
  { id: '91', permCode: 'report:view', permName: '查看报表', permType: 'button' as const, parentId: '90', path: '', icon: '', sortOrder: 1 },
  { id: '92', permCode: 'report:export', permName: '导出报表', permType: 'button' as const, parentId: '90', path: '', icon: '', sortOrder: 2 },

  // 系统管理
  { id: '100', permCode: 'system', permName: '系统管理', permType: 'menu' as const, parentId: '0', path: '/system', icon: 'SettingOutlined', sortOrder: 11 },
  { id: '101', permCode: 'system:settings', permName: '系统设置', permType: 'button' as const, parentId: '100', path: '', icon: '', sortOrder: 1 },
  { id: '102', permCode: 'system:user', permName: '用户管理', permType: 'button' as const, parentId: '100', path: '', icon: '', sortOrder: 2 },
  { id: '103', permCode: 'system:role', permName: '角色管理', permType: 'button' as const, parentId: '100', path: '', icon: '', sortOrder: 3 },
  { id: '104', permCode: 'system:log', permName: '操作日志', permType: 'button' as const, parentId: '100', path: '', icon: '', sortOrder: 4 },
];
