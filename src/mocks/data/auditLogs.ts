function generateAuditLogs() {
  const users = [
    { id: '1', name: '张管理' },
    { id: '2', name: '李审计' },
    { id: '3', name: '王业务' },
  ];

  const operations = [
    { type: 'LOGIN', desc: '用户登录系统' },
    { type: 'LOGOUT', desc: '用户退出系统' },
    { type: 'CREATE', desc: '创建了新记录' },
    { type: 'UPDATE', desc: '更新了记录' },
    { type: 'DELETE', desc: '删除了记录' },
    { type: 'VIEW', desc: '查看了详情' },
    { type: 'EXPORT', desc: '导出了数据' },
    { type: 'APPROVE', desc: '审批通过了记录' },
    { type: 'SUBMIT', desc: '提交了记录' },
  ];

  const modules = ['auth', 'process', 'risk', 'control', 'document', 'evaluation', 'defect', 'system'] as const;

  const moduleNames: Record<string, string> = {
    auth: '用户认证',
    process: '业务流程',
    risk: '风险管理',
    control: '控制措施',
    document: '制度文档',
    evaluation: '内控评价',
    defect: '缺陷管理',
    system: '系统管理',
  };

  const moduleDetails: Record<string, string[]> = {
    auth: ['用户登录', '修改密码', '会话过期'],
    process: ['信贷业务流程', '贷前管理', '贷中管理', '贷后管理', '客户准入', '授信审批'],
    risk: ['信用风险评估', '市场风险矩阵', '操作风险事件', '风险热力图', 'RCM矩阵'],
    control: ['预防性控制', '检测性控制', '控制测试', '控制有效性评估'],
    document: ['信贷业务管理办法', '授信审批操作规程', '内控评价工作指引', '反洗钱管理制度'],
    evaluation: ['年度评价计划', '测试底稿', '评价范围', '评价报告'],
    defect: ['缺陷登记', '整改方案', '整改验证', '缺陷关闭'],
    system: ['用户管理', '角色权限', '系统配置', '日志查询'],
  };

  const logs: Array<{
    id: string;
    userId: string;
    userName: string;
    module: string;
    moduleName: string;
    operation: string;
    operationDesc: string;
    detail: string;
    ip: string;
    userAgent: string;
    result: string;
    createdAt: string;
  }> = [];

  const now = new Date('2026-08-06T12:00:00Z');
  const ipBase = '10.10.';

  // Login session tracking for logout pairing
  const loginSessions: Array<{ userId: string; userName: string; loginTime: Date }> = [];

  for (let i = 99; i >= 0; i--) {
    const daysAgo = Math.floor(i / 3.3);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const hour = 8 + Math.floor(Math.random() * 10); // 8:00 - 17:59
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
    date.setHours(hour, minute, second);

    const userIdx = Math.floor(Math.random() * users.length);
    const user = users[userIdx];

    let operation: (typeof operations)[number];
    let module: string;
    let detail: string;

    // Ensure we have varied and realistic audit log patterns
    if (i === 99 || i === 0) {
      // First log of the period - admin login
      operation = operations[0]; // LOGIN
      module = 'auth';
      detail = '管理员登录系统';
    } else if (i % 15 === 0) {
      // Periodic login
      operation = operations[0]; // LOGIN
      module = 'auth';
      detail = `${user.name}于${date.toISOString().split('T')[0]}登录系统`;
      loginSessions.push({ userId: user.id, userName: user.name, loginTime: new Date(date) });
    } else if (i % 17 === 1 && loginSessions.length > 0) {
      // Periodic logout (pair with login)
      operation = operations[1]; // LOGOUT
      module = 'auth';
      const session = loginSessions.shift();
      detail = `${session?.userName || user.name}退出系统`;
    } else {
      // Regular operations
      const opIdx = 2 + Math.floor(Math.random() * (operations.length - 2));
      operation = operations[opIdx];
      const modIdx = Math.floor(Math.random() * modules.length);
      module = modules[modIdx];
      const details = moduleDetails[module];
      detail = `${operation.desc}：${details[Math.floor(Math.random() * details.length)]}`;
    }

    const result = Math.random() > 0.95 ? '失败' : '成功';

    logs.push({
      id: `log-${String(1000 + i).slice(1)}`,
      userId: user.id,
      userName: user.name,
      module,
      moduleName: moduleNames[module],
      operation: operation.type,
      operationDesc: operation.desc,
      detail,
      ip: `${ipBase}${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0 Safari/537.36',
      result,
      createdAt: date.toISOString(),
    });
  }

  // Sort by date descending (newest first)
  logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return logs;
}

export const auditLogs = generateAuditLogs();
