import axios from 'axios';
const API_KEY = '27726605-068cf1407b48bdba6244e39cb';
axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

export const FetchedCards = async (query, page, perPage) => {
  try {
    const response = await axios.get(
      `&q=${query}&per_page=${perPage}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
