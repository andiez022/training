import { AxiosInstance } from 'axios';
import { DataItem } from '../../types/common';

export default class DataService {
  constructor(private axios: AxiosInstance) {}

  async fetchDataList(
    pageType: string,
    searchOptions: {
      searchBy: string;
      searchValue: string;
      page: number;
      pageSize: number;
      userID?: string;
    },
  ) {
    const apiSearchParam = {
      search_by: searchOptions.searchBy,
      search_value: searchOptions.searchValue,
      page: searchOptions.page,
      page_size: searchOptions.pageSize,
      user_id: searchOptions.userID,
    };
    const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}`;
    try {
      const request = await this.axios.get(apiUrl, { params: apiSearchParam });
      const response = await request.data;
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async fetchDataById(pageType: string, itemId: string) {
    const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}/${itemId}`;
    try {
      const request = await this.axios.get(apiUrl);
      const response = await request.data;
      return response;
    } catch (error) {
      console.error('Error fetching data by ID:', error);
      throw error;
    }
  }

  async addData(
    pageType: string,
    data: {
      any: [];
    },
  ) {
    try {
      // const axiosConfig = {
      //   headers: {
      //     Accept: 'application/json',
      //     // Authorization: `Bearer ${obj.token}`
      //   },
      // };

      const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}`;
      const request = await this.axios.post(apiUrl, data);

      const response = await request.data;
      console.log(response);
      return {
        data: response,
        successMsg: '성공적으로 생성했습니다.',
        error: null,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        data: null,
        successMsg: null,
        error: 'Cannot add',
      };
    }
  }
}
