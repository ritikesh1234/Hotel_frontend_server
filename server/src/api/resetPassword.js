export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`/api/public/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Reset failed');
    }

    return data; // ✅ returns { status, message }
  } catch (error) {
    console.error('Error during reset password request:', error);
    return { status: 'error', message: error.message };
  }
};
