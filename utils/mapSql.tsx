export const snakeToCamel = <T extends Record<string, any>>(objArr: Record<string, any>[]): T[] => {
  return objArr.map((item) => {
    const newObj: Record<string, any> = {};
    
    Object.entries(item).forEach(([key, value]) => {
      // Actually convert snake_case to camelCase
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      newObj[camelKey] = value;
    });
    
    return newObj as T;
  });
};

export const camelToSnake = <T extends Record<string, any>>(objArr: Record<string, any>[]): T[] => {
  return objArr.map((item) => {
    const newObj: Record<string, any> = {};
    
    Object.entries(item).forEach(([key, value]) => {
      // Convert camelCase to snake_case
      const snakeKey = key.replace(/([A-Z])/g, (_, letter) => '_' + letter.toLowerCase());
      newObj[snakeKey] = value;
    });
    
    return newObj as T;
  });
};