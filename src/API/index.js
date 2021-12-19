import axios from 'axios';

export default class API {
  async postLogin(data) {
    try {
      const params = new FormData();
      params.append('mobile', data.mobile);
      params.append('password', data.password);
      params.append('dataType', data.dataType);
      const response = await axios({
        method: 'POST',
        url: 'https://dev-staging.carbonateapp.com/login',
        data: params,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  }

  async getVideoData() {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://private-4063d9-practicalassignment.apiary-mock.com/videos',
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  }

  async getColorData() {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://private-4063d9-practicalassignment.apiary-mock.com/colours',
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
}
