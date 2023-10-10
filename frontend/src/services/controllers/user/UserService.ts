import { AxiosInstance } from 'axios';

export default class UserService {
  constructor(private axios: AxiosInstance) {}

  getUserDetail = async () => {
    const { data } = await this.axios.get('users/me');

    return data;
  };
}
