import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {Users} from "../../../api/Users";


export interface UserProps {
    dataList?: Users[];
}

export default function Person({dataList}: UserProps) {
    const router = useRouter();
    const [data, setData] = useState(dataList);
    useEffect(() => {
        async function loadData() {
            const response = await fetch('https://jsonplaceholder.typicode.com/users?name=' + router.query.person);
            const dataList: Users[] | undefined = await response.json();
            // set value for data
            setData(dataList);
        }

        // check dataList
        if (dataList?.length == 0) {
            // if don't have data start request data
            loadData()
        }
    }, []);

    if (!data?.[0]) {
        return <div>Loading ... </div>
    }

    return <pre>{JSON.stringify(data, null, 4)}</pre>
}

Person.getInitialProps = async (ctx) => {
    // check context object have request or not
    if (!ctx.req) {
        // if don't have return empty
        return {dataList: []};
    }
    // Handle request
    const {query} = ctx;
    let url = 'https://jsonplaceholder.typicode.com/users?name=' + query.person;
    const response = await fetch(url);
    const dataList: Users[] | undefined = await response.json();

    return {dataList}
}
