import create from 'zustand'

export interface IUser {
  userName: string
}

export interface IUserStore {
  user: IUser
  setUserName: (userName: string) => void
}

const useUserStore = create<IUserStore>((set) => ({
  user: {
    userName: ''
  },
  setUserName: (userName: string) => {
    set(() => ({ user: { userName }}))
  }
}))

export default useUserStore;
