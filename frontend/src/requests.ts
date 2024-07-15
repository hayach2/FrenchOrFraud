import axios from 'axios';

export const fetchNewVerb = async (difficult : boolean, idsToExclude : string) => {
  try {
    const response = await axios.get('/french-verb', {
      params: {
        difficult: difficult,
        idsToExclude: idsToExclude
      }
    });
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error('Error fetching new verb:', error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};

export const updateVerb = async (id: number, successes: boolean) => {
  try {
    const response = await axios.post('/french-verb', { id: id, successes: successes });
    return response.data; // Optionally return data received from the backend
  } catch (error) {
    console.error('Error sending updated verb to backend:', error);
    throw error; // Propagate the error to handle it further up the call stack if needed
  }
};

export const updateHistory = (status: boolean) => {
  return axios.post('/history', { status: status })
    .then(response => {
      console.log('Score sent to backend successfully');
    })
    .catch(error => {
      console.error('Error sending score to backend:', error);
      throw error;
    });
};


export const getHistory = () => {
  return axios.get('/history')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching history:', error);
      throw error;
    });
};
 