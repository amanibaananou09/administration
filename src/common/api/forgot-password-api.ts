import api from './axios';

const API_URL = "/user";

export const forgotPassword = async (email: string) => {
    const response =  await api.post(`${API_URL}/forgot-password?email=${email}`);
    return response.data;
};

export const resetPassword = async (password: string, resetToken: string | null) => {
      const response = await api.put(`${API_URL}/reset-password?resetToken=${resetToken}`, { password });
      return response.data;
};