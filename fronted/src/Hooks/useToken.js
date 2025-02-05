
import { useSelector } from 'react-redux';

export default function useToken() {
  return useSelector((state) => state?.user?.details?.token ?? "")
}
