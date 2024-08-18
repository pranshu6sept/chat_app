  
import axios from 'axios';

const url = 'http://localhost:3000';

export const addUser = async (data) => {
    try {
        let response = await axios.post(`${url}/saveuser`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling save User API ', error);
    }
}

export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/getuser`);
        return response.data
    } catch (error) {
        console.log('Error while calling get Users API ', error);
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/create-conversation`, data);
    } catch (error) {
        console.log('Error while calling setConversation API ', error);
    }
}

export const getConversation = async (users) => {
    try {
        let response = await axios.post(`${url}/get-conversation`, users);
        return response.data;
    } catch (error) {
        console.log('Error while calling getConversation API ', error);
    }
}

export const getMessages = async (id) => {
    try {
        let response = await axios.get(`${url}/get-message/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getMessages API ', error);
    }
}

export const newMessages = async (data) => {
    try {
        return await axios.post(`${url}/send-message`, data);
    } catch (error) {
        console.log('Error while calling newMessages API ', error);
    }
}