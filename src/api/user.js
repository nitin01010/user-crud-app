import axios from "axios";

export async function handleUserGET(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("GET request failed:", error);
        throw error;
    }
}



export async function handleUserDelete(url) {
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("GET request failed:", error);
        throw error;
    }
}


export async function handleUserCreate(url, userData) {
    try {
        const response = await axios.post(url, userData);
        return response.data;
    } catch (error) {
        console.error("POST request failed:", error);
        throw error;
    }
}

export async function handleUserUpdate(url, userData) {
  try {
    const response = await axios.put(url, userData);
    return response.data;
  } catch (error) {
    console.error("PUT request failed:", error);
    throw error;
  }
}