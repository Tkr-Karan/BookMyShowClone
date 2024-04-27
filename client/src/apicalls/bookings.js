import { axiosInstance } from ".";

export const MakePayment = async (token, amount) => {
  try {
    const response = await axiosInstance.post("/api/bookings/make-payments", {
      token,
      amount,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
