import Cookies from 'universal-cookie';

export const IsLoggedIn = (requestCookie = null) => {
  const cookies = new Cookies();
  if (!requestCookie) {
    return !!cookies.get('user_logged_in')
  }

  return !!requestCookie
}

export const LogIn = () => {
  const cookies = new Cookies();
  cookies.set('user_logged_in', true, { sameSite: 'lax' })
}

export const LogOut = () => {
  const cookies = new Cookies();
  if (typeof window !== undefined) {
    cookies.remove('user_logged_in', { sameSite: 'lax' })
  }
}
