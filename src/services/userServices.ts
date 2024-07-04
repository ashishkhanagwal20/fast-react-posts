interface UserData {
    email : string;
}
export const fetchusers = async (): Promise<UserData[]> => {
    const response = await fetch('http://localhost:8000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
         
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
    
      return response.json();
}
