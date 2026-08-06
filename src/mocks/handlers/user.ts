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

function paginatedResponse<T>(list: T[], total: number, page: number, pageSize: number) {
  return successResponse({
    list,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

// Mutable copy for CRUD operations
let users = seedUsers.map((u) => {
  const { password, ...rest } = u;
  return rest;
});

let nextUserId = users.length + 1;

export const userHandlers = [
  // GET /api/v1/users
  http.get('/api/v1/users', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const keyword = url.searchParams.get('keyword') || '';

    let filtered = users;
    if (keyword) {
      filtered = filtered.filter(
        (u) =>
          u.username.includes(keyword) ||
          u.realName.includes(keyword) ||
          u.email.includes(keyword),
      );
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),

  // GET /api/v1/users/:id
  http.get('/api/v1/users/:id', async ({ params }) => {
    const { id } = params;
    const user = users.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json(errorResponse('用户不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(user));
  }),

  // POST /api/v1/users
  http.post('/api/v1/users', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.username || !body.realName || !body.role) {
      return HttpResponse.json(errorResponse('必填字段不能为空'), { status: 400 });
    }

    const exists = users.find((u) => u.username === body.username);
    if (exists) {
      return HttpResponse.json(errorResponse('用户名已存在'), { status: 409 });
    }

    const newUser = {
      id: String(nextUserId++),
      username: body.username as string,
      realName: body.realName as string,
      role: body.role as string,
      roleName: (body.roleName as string) || '',
      status: (body.status as string) || 'active',
      orgId: (body.orgId as string) || '1',
      email: (body.email as string) || '',
      phone: (body.phone as string) || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);

    return HttpResponse.json(successResponse(newUser), { status: 201 });
  }),

  // PUT /api/v1/users/:id
  http.put('/api/v1/users/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('用户不存在'), { status: 404 });
    }

    users[index] = {
      ...users[index],
      ...body,
      id: users[index].id,
      createdAt: users[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(successResponse(users[index]));
  }),

  // DELETE /api/v1/users/:id
  http.delete('/api/v1/users/:id', async ({ params }) => {
    const { id } = params;

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('用户不存在'), { status: 404 });
    }

    users.splice(index, 1);

    return HttpResponse.json(successResponse(null));
  }),

  // GET /api/v1/roles
  http.get('/api/v1/roles', () => {
    return HttpResponse.json(successResponse(seedRoles));
  }),

  // GET /api/v1/permissions
  http.get('/api/v1/permissions', () => {
    return HttpResponse.json(successResponse(seedPermissions));
  }),
];
