export const login = async (email, password) => {
  try {
    const response = await fetch(`/api/public/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // ✅ always expect JSON now

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    return { status: 'error', message: error.message };
  }
};
