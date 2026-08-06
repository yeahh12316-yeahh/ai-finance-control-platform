import { Suspense, lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { createHashRouter, Navigate, type RouteObject } from 'react-router-dom'
import { Spin } from 'antd'

// Layouts (lazy loaded)
const BlankLayout = lazy(() => import('@/layouts/BlankLayout'))
const BasicLayout = lazy(() => import('@/layouts/BasicLayout'))

// Helper: wrap a lazy component with Suspense fallback
function LazyLoad(Component: LazyExoticComponent<ComponentType<unknown>>) {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large" tip="Loading..." />
        </div>
      }
    >
      <Component />
    </Suspense>
  )
}

// Page components (lazy loaded) - paths match actual file structure
const Login = lazy(() => import('@/pages/login'))
const Dashboard = lazy(() => import('@/pages/dashboard'))
const InternalControl = lazy(() => import('@/pages/internal-control'))
const Documents = lazy(() => import('@/pages/documents'))
const Copilot = lazy(() => import('@/pages/copilot'))
const RiskManagement = lazy(() => import('@/pages/risk'))
const RiskList = lazy(() => import('@/pages/risk/RiskList'))
const RiskQuestionnaire = lazy(() => import('@/pages/risk/RiskQuestionnaire'))
const RiskMatrix = lazy(() => import('@/pages/risk/RiskMatrix'))
const RiskHeatmap = lazy(() => import('@/pages/risk/RiskHeatmap'))
const Evaluation = lazy(() => import('@/pages/evaluation'))
const EvaluationPlan = lazy(() => import('@/pages/evaluation/EvaluationPlan'))
const TestWorksheet = lazy(() => import('@/pages/evaluation/TestWorksheet'))
const ReportGenerate = lazy(() => import('@/pages/evaluation/ReportGenerate'))
const Defects = lazy(() => import('@/pages/defects'))
const DefectRegister = lazy(() => import('@/pages/defects/DefectRegister'))
const TaskBoard = lazy(() => import('@/pages/defects/TaskBoard'))
const ClosureVerify = lazy(() => import('@/pages/defects/ClosureVerify'))
const Knowledge = lazy(() => import('@/pages/knowledge'))
const AuditLogPage = lazy(() => import('@/pages/audit'))
const UserManagement = lazy(() => import('@/pages/system/users'))
const RoleManagement = lazy(() => import('@/pages/system/roles'))
const PermissionConfig = lazy(() => import('@/pages/system/permissions'))

const routes: RouteObject[] = [
  {
    path: '/login',
    element: LazyLoad(BlankLayout),
    children: [
      {
        index: true,
        element: LazyLoad(Login),
      },
    ],
  },
  {
    path: '/',
    element: LazyLoad(BasicLayout),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: LazyLoad(Dashboard),
      },
      {
        path: 'internal-control',
        element: LazyLoad(InternalControl),
      },
      {
        path: 'documents',
        element: LazyLoad(Documents),
      },
      {
        path: 'copilot',
        element: LazyLoad(Copilot),
      },
      {
        path: 'risk',
        element: LazyLoad(RiskManagement),
        children: [
          {
            index: true,
            element: <Navigate to="/risk/list" replace />,
          },
          {
            path: 'list',
            element: LazyLoad(RiskList),
          },
          {
            path: 'questionnaire',
            element: LazyLoad(RiskQuestionnaire),
          },
          {
            path: 'matrix',
            element: LazyLoad(RiskMatrix),
          },
          {
            path: 'heatmap',
            element: LazyLoad(RiskHeatmap),
          },
        ],
      },
      {
        path: 'evaluation',
        element: LazyLoad(Evaluation),
        children: [
          {
            index: true,
            element: <Navigate to="/evaluation/plan" replace />,
          },
          {
            path: 'plan',
            element: LazyLoad(EvaluationPlan),
          },
          {
            path: 'worksheet',
            element: LazyLoad(TestWorksheet),
          },
          {
            path: 'report',
            element: LazyLoad(ReportGenerate),
          },
        ],
      },
      {
        path: 'defects',
        element: LazyLoad(Defects),
        children: [
          {
            index: true,
            element: <Navigate to="/defects/register" replace />,
          },
          {
            path: 'register',
            element: LazyLoad(DefectRegister),
          },
          {
            path: 'board',
            element: LazyLoad(TaskBoard),
          },
          {
            path: 'verify',
            element: LazyLoad(ClosureVerify),
          },
        ],
      },
      {
        path: 'knowledge',
        element: LazyLoad(Knowledge),
      },
      {
        path: 'audit',
        element: LazyLoad(AuditLogPage),
      },
      {
        path: 'system',
        children: [
          {
            index: true,
            element: <Navigate to="/system/users" replace />,
          },
          {
            path: 'users',
            element: LazyLoad(UserManagement),
          },
          {
            path: 'roles',
            element: LazyLoad(RoleManagement),
          },
          {
            path: 'permissions',
            element: LazyLoad(PermissionConfig),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>404</h1>
          <p>页面未找到</p>
          <a href="#/">返回首页</a>
        </div>
      </div>
    ),
  },
]

const router = createHashRouter(routes)

export default router
export { routes }
