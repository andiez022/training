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
    const apiSearchParam = {
      search_by: searchOptions.searchBy,
      search_value: searchOptions.searchValue,
      page: searchOptions.page,
      page_size: searchOptions.pageSize,
      user_id: searchOptions.userID,
    };
    const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}`;
    try {
      const response = await this.axios.get(apiUrl, { params: apiSearchParam });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
