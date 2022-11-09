import create from 'zustand';

export interface IUserName {
  userName: string;
}
export interface IUserId {
  id: string;
}

export interface IUser extends IUserId, IUserName{}


export interface IUserStore {
  user: IUserName;
  setUserName: (userName: string) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: {
    userName: '',
  },
  setUserName: (userName: string) => {
    set(() => ({ user: { userName } }));
  },
}));

export default useUserStore;
