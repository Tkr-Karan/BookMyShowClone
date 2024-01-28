import { axiosInstance } from ".";

export const AddTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const GetAllTheatresByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-owner",
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatres/update-theatre",
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const DeleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/delete-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllTheatres = async () => {
  try {
    const response = await axiosInstance("/api/theatres/get-all-theatres");

    return response.data;
  } catch (error) {
    return error.message;
  }
};
