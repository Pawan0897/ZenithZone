
import { useSelector } from 'react-redux'

export default function useRole() {
  return useSelector((state) => state?.user?.details?.role ?? "")
}
