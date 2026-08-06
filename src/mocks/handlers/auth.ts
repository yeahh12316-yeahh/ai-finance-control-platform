import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { seedUsers } from '../data/users';
import { seedRoles } from '../data/roles';
import { seedPermissions } from '../data/permissions';

function successResponse<T>(data: T) {
  return {
    code: 0,
    message: 'success',
    data,
    timestamp: Date.now(),
    requestId: uuid(),
  };
}

function errorResponse(message: string, code = 1) {
  return {
    code,
    message,
    data: null,
    timestamp: Date.now(),
    requestId: uuid(),
  };
}

const tokens = new Map<string, string>();

function generateToken(): string {
  return `token_${uuid()}_${Date.now()}`;
}

export const authHandlers = [
  // POST /api/v1/auth/login
  http.post('/api/v1/auth/login', async ({ request }) => {
    const body = (await request.json()) as { username?: string; password?: string };
    const { username, password } = body;

    if (!username || !password) {
      return HttpResponse.json(errorResponse('用户名和密码不能为空'), { status: 400 });
    }

    const user = seedUsers.find((u) => u.username === username && u.password === password);

    if (!user) {
      return HttpResponse.json(errorResponse('用户名或密码错误'), { status: 401 });
    }

    if (user.status !== 'active') {
      return HttpResponse.json(errorResponse('账户已被禁用'), { status: 403 });
    }

    const token = generateToken();
    tokens.set(user.id, token);

    const { password: _, ...userWithoutPassword } = user;

    return HttpResponse.json(
      successResponse({
        token,
        user: userWithoutPassword,
      }),
    );
  }),

  // GET /api/v1/auth/me
  http.get('/api/v1/auth/me', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(errorResponse('未登录或登录已过期'), { status: 401 });
    }

    const token = authHeader.slice(7);
    let userId: string | undefined;
    for (const [uid, t] of tokens) {
      if (t === token) {
        userId = uid;
        break;
      }
    }

    if (!userId) {
      return HttpResponse.json(errorResponse('未登录或登录已过期'), { status: 401 });
    }

    const user = seedUsers.find((u) => u.id === userId);
    if (!user) {
      return HttpResponse.json(errorResponse('用户不存在'), { status: 404 });
    }

    const { password: _, ...userWithoutPassword } = user;

    return HttpResponse.json(successResponse(userWithoutPassword));
  }),

  // POST /api/v1/auth/logout
  http.post('/api/v1/auth/logout', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      for (const [uid, t] of tokens) {
        if (t === token) {
          tokens.delete(uid);
          break;
        }
      }
    }
    return HttpResponse.json(successResponse(null));
  }),

  // GET /api/v1/auth/menus
  http.get('/api/v1/auth/menus', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(errorResponse('未登录或登录已过期'), { status: 401 });
    }

    const token = authHeader.slice(7);
    let userId: string | undefined;
    for (const [uid, t] of tokens) {
      if (t === token) {
        userId = uid;
        break;
      }
    }

    if (!userId) {
      return HttpResponse.json(errorResponse('未登录或登录已过期'), { status: 401 });
    }

    const user = seedUsers.find((u) => u.id === userId);
    if (!user) {
      return HttpResponse.json(errorResponse('用户不存在'), { status: 404 });
    }

    const role = seedRoles.find((r) => r.roleCode === user.role);
    if (!role) {
      return HttpResponse.json(successResponse([]));
    }

    const userPermissions = role.permissions;

    // Build menu tree from permissions
    const menuPermissions = seedPermissions.filter(
      (p) => p.permType === 'menu' && userPermissions.includes(p.permCode),
    );

    function buildMenuTree(parentId: string): Array<Record<string, unknown>> {
      return menuPermissions
        .filter((p) => p.parentId === parentId)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((p) => ({
          id: p.id,
          permCode: p.permCode,
          name: p.permName,
          path: p.path,
          icon: p.icon,
          children: buildMenuTree(p.id),
        }));
    }

    const menuTree = buildMenuTree('0');

    return HttpResponse.json(successResponse(menuTree));
  }),
];
