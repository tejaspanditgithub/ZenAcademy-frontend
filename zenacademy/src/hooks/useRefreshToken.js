import axios from '../api/axios';
import useData from './useData';

const useRefreshToken = () => {
    const { setAuth } = useData();

    const refresh = async () => {
        const response = await axios.get('/user/token', {
            withCredentials: true
        });
        setAuth(prev => {
            return { 
                ...prev,
                userRoll:response.data.userRoll, 
                accessToken: response.data.accessToken 
            }

        });
        return response.data.accessToken;
    }
    
    return refresh;
};

export default useRefreshToken;