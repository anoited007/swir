import {useRouter} from "next/router";
import {useEffect} from "react";

const Redirect = ({location}) => {
    const router = useRouter();

    useEffect(() => {
        router.push(location);
    },[location])
    return null
}

export default Redirect