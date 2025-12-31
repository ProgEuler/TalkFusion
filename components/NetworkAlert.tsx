import { baseApi } from '@/api/baseApi';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Toast } from 'toastify-react-native';

const NetworkAlert = () => {
  const dispatch = useDispatch();
  const wasOffline = useRef<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === true) {
        if (wasOffline.current) {
          Toast.success('online back', 'bottom');

          dispatch(baseApi.util.invalidateTags(['Topics', 'Company', 'UploadedFiles', 'Chat']));

          wasOffline.current = false;
        }
      } else if (state.isConnected === false) {
        Toast.error('turn on your internet wifi', 'bottom');
        wasOffline.current = true;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return null;
};

export default NetworkAlert;
