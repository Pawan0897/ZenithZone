
import { useSelector } from 'react-redux'
export default function useDetails() {
 return useSelector((state) => state?.user?.details ?? "")
}
