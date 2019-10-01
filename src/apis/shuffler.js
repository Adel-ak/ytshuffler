import axios from 'axios';

//For now use local for calling the database server
const databaseURL = 'http://localhost:3000/';
const youtubeURL = databaseURL + 'youtube/';
const shufflerURL = databaseURL + 'shuffler/';

const getAxios = (url, initalQuery = {}) => (query = {}) => 
	axios.get(url, {
		params: {
			...initalQuery,
			...query
		}
	});

const postAxios = (url, initialData = {}) => (data = {}) => 
	axios.post(url, {...initialData, ...data});

export const getYoutubeSearch = q => getAxios(youtubeURL + 'search')({q});
export const getYoutubeChannels = ids => getAxios(youtubeURL + 'channels')({ids});
export const getYotubeTopicIds = () => getAxios(youtubeURL + 'topicIds')();
export const createChannel = postAxios(shufflerURL + 'channels');
