import axios from 'axios';

const API_KEY = '35924143-9020fc77f3274be39114409f4';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const getImagesByQuery = async (query, page = 1) => {
  try {
    let imageData = await axios(
      `?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    console.log(imageData.data);
    return imageData.data;
  } catch (error) {
    console.warn(error.message);
  }
};
