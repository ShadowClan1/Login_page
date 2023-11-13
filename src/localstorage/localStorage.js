export const getUser = () =>  localStorage.getItem('USER')
export const setUser = (userObj) => localStorage.setItem('USER', JSON.stringify(userObj))
export const logoutUser = () => localStorage.clear()