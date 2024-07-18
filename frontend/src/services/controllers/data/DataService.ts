import { AxiosInstance } from 'axios';

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
    const apiUrl = `http://qa.forum-bulletin-board.dev.politetech.com/api/v1/${pageType}?search_by=${searchOptions.searchBy}&search_value=${searchOptions.searchValue}&page=${searchOptions.page}&page_size=${searchOptions.pageSize}`;
    try {
      const response = await this.axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
