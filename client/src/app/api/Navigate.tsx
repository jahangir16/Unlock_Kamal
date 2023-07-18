import { useNavigate } from 'react-router-dom';

export function useCustomNavigate() {
  const navigate = useNavigate();

  const customNavigate = (to: string, options?: any) => {
    // Perform any custom logic before navigation
    console.log('Custom navigate:', to);

    // Call the navigate function with the provided arguments
    navigate(to, options);
  };

  return customNavigate;
}
