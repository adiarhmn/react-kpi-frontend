import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function useNotificationMobile(message: string, localName: string) {
  // [NOTIFICATION 🔔]
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    const hasNotified = localStorage.getItem(localName);
    if (state?.success && hasNotified != 'yes') {
      Swal.fire({
        width: '80%',
        title: message,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      localStorage.setItem(localName, 'yes');
    }
  }, [state, navigate]);
  // [END NOTIFICATION 🔔]
}
