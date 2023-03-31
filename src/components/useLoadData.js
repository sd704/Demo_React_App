import { useEffect, useState } from "react";
import axios from "axios";


function useLoadData(pageno) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {

        setLoading(true);

        const api = process.env.REACT_APP_API_URL;
        axios(api).then(res => {
            setData(prevData => {
                return [...prevData, ...res.data.results];
            })
            setLoading(false);
        });
    }, [pageno]);

    return { loading, data };
}

export default useLoadData;