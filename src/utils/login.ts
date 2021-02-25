/**
 * 是否已经登录或者 token 超时
 *
 * @export
 * @returns { boolean }
 */
export default () => {
	if (!window.localStorage.getItem('TOKEN')) {
		return false
	}
  const tokens = JSON.parse(window.localStorage.getItem('TOKEN') || '')
	if (!tokens.access_token || !tokens.refresh_token) {
		return false
	}
	return true
}
