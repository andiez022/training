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
    },
  ) {
    const apiSearchParams = {
      search_by: searchOptions.searchBy,
      search_value: searchOptions.searchValue,
      page: searchOptions.page,
      page_size: searchOptions.pageSize,
    };

    const apiUrl = `${pageType}`;

    try {
      const response = await this.axios.get(apiUrl, { params: apiSearchParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  }

  async fetchDataById(pageType: string, itemId: string) {
    const apiUrl = `${pageType}/${itemId}`;

    try {
      const response = await this.axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching data by ID: ', error);
      throw error;
    }
  }
}
