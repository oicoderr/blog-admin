export const IS_DEV: boolean = process.env.NODE_ENV !== 'production';

export const API_ROOT: string = IS_DEV
  ? 'http://127.0.0.1:8000/'
  : 'http://admin.stealfood.com/api/';
