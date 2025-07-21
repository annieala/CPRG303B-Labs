import supabase from './supabase'; // Adjust the import path as necessary


const TABLE_NAME = "users";

export async function getUsers() {
  const { data, error } = await supabase.from(TABLE_NAME).select("*");
    if (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }  
    return data;
}
// Simplified response types
type CrudResult<T> = { 
  data: T | null; 
  error: string | null; 
  success: boolean; 
  count?: number 
};

// Generic error handler wrapper
const handleQuery = async <T>(queryFn: () => Promise<any>): Promise<CrudResult<T>> => {
  try {
    const result = await queryFn();
    return {
      data: result.data || null,
      error: result.error?.message || null,
      success: !result.error,
      ...(result.count !== undefined && { count: result.count })
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error',
      success: false
    };
  }
};

// CREATE
export const create = async <T>(
  table: string, 
  data: Partial<T> | Partial<T>[]
): Promise<CrudResult<T | T[]>> => {
  return handleQuery(async () => {
    return await supabase.from(table).insert(data).select();
  });
};

// READ
export const getAll = async <T>(
  table: string, 
  options: {
    select?: string;
    where?: Record<string, any>;
    order?: { column: string; asc?: boolean };
    limit?: number;
    offset?: number;
  } = {}
): Promise<CrudResult<T[]>> => {
  return handleQuery(async () => {
    let query = supabase.from(table).select(options.select || '*', { count: 'exact' });
    
    if (options.where) {
      Object.entries(options.where).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          query = query.in(key, value);
        } else if (typeof value === 'string' && value.includes('%')) {
          query = query.like(key, value);
        } else {
          query = query.eq(key, value);
        }
      });
    }
    
    if (options.order) {
      query = query.order(options.order.column, { ascending: options.order.asc ?? true });
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }
    
    return await query;
  });
};

export const getById = async <T>(
  table: string, 
  id: string | number, 
  idCol = 'id', 
  select = '*'
): Promise<CrudResult<T>> => {
  return handleQuery(async () => {
    return await supabase.from(table).select(select).eq(idCol, id).single();
  });
};

// UPDATE
export const update = async <T>(
  table: string, 
  updates: Partial<T>, 
  where: Record<string, any>
): Promise<CrudResult<T[]>> => {
  return handleQuery(async () => {
    let query = supabase.from(table).update(updates);
    
    Object.entries(where).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value);
      } else {
        query = query.eq(key, value);
      }
    });
    
    return await query.select();
  });
};

export const updateById = async <T>(
  table: string, 
  id: string | number, 
  updates: Partial<T>, 
  idCol = 'id'
): Promise<CrudResult<T>> => {
  return handleQuery(async () => {
    return await supabase.from(table).update(updates).eq(idCol, id).select().single();
  });
};

// DELETE
export const deleteWhere = async (
  table: string, 
  where: Record<string, any>
): Promise<CrudResult<any[]>> => {
  return handleQuery(async () => {
    let query = supabase.from(table).delete();
    
    Object.entries(where).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value);
      } else {
        query = query.eq(key, value);
      }
    });
    
    return await query.select();
  });
};

export const deleteById = async (
  table: string, 
  id: string | number, 
  idCol = 'id'
): Promise<CrudResult<any>> => {
  return handleQuery(async () => {
    return await supabase.from(table).delete().eq(idCol, id).select().single();
  });
};

export const softDelete = async (
  table: string, 
  id: string | number, 
  idCol = 'id', 
  deletedCol = 'deleted_at'
): Promise<CrudResult<any>> => {
  return handleQuery(async () => {
    return await supabase
      .from(table)
      .update({ [deletedCol]: new Date().toISOString() })
      .eq(idCol, id)
      .select()
      .single();
  });
};

// Convenience methods
export const db = {
  // Simplified method names
  add: create,
  get: getAll,
  find: getById,
  edit: updateById,
  remove: deleteById,
  
  // Quick helpers
  findWhere: async <T>(table: string, where: Record<string, any>) => 
    await getAll<T>(table, { where }),
  
  count: async (table: string, where?: Record<string, any>) => {
    const result = await getAll(table, { select: 'id', where, limit: 0 });
    return result.count || 0;
  },
};

// Usage examples:
// await db.add('users', { name: 'John', email: 'john@test.com' });
// await db.get('users', { limit: 10, order: { column: 'created_at' } });
// await db.find('users', '123');
// await db.findWhere('users', { active: true });
// await db.edit('users', '123', { name: 'Jane' });
// await db.remove('users', '123');

// Or use the functions directly:
// await create('users', { name: 'John', email: 'john@test.com' });
// await getAll('users', { limit: 10, order: { column: 'created_at' } });
// await getById('users', '123');
// await updateById('users', '123', { name: 'Jane' });
// await deleteById('users', '123');