/**
 * 是否已经登录或者 token 超时
 *
 * @export
 * @returns { boolean }
 */
export default () => {
  if (!sessionStorage.getItem('TOKEN')) {
    return false;
  }
  const token = JSON.parse(sessionStorage.getItem('TOKEN') || '');
  if (!token.access_token) {
    return false;
  }
  return true;
};
