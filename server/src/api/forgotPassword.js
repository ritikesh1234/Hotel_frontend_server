export const forgotPassword = async (email) => { 
  try {
    const response = await fetch(`/api/public/forget-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Forgot password request failed');
    }

    return data; // ✅ now returns proper JSON from backend
  } catch (error) {
    console.error('Error during forgot password request:', error);
    return { status: 'error', message: error.message };
  }
};
