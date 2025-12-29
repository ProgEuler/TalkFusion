import { baseApi } from '@/api/baseApi';
import NetInfo from '@react-native-community/netinfo';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Toast } from 'toastify-react-native';

const NetworkAlert = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const wasOffline = useRef<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === true) {
        if (wasOffline.current) {
          Toast.success('online back', 'bottom');

          // Refetch all TanStack queries
          queryClient.refetchQueries();

          // Refetch all RTK Query queries by invalidating all tags
          dispatch(baseApi.util.invalidateTags(['Topics', 'Company', 'UploadedFiles']));

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
  }, [queryClient, dispatch]);

  return null;
};

export default NetworkAlert;
