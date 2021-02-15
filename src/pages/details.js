import Link from 'next/link'
import {useEffect, useState} from 'react';

export default function Details() {
    const [owners, setOwners] = useState([]);
    useEffect(() => {
        async function loadData() {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const ownersList = await response.json();
            setOwners(ownersList)
        }
        loadData();
    }, [])

    return <div>
        {
            owners.map((e,index) => (
                <div key={index}>
                    <h1>{e.name}</h1> | {e.username}
                    <br/>
                    <Link  href={`/${e.name}/${e.username}`}>
                        <button>
                            Navigate to {e.name}'s {e.username}
                        </button>
                    </Link>
                    {/*<Link as={`/${e.name}/${e.username}`} href={"/[vehicle]/[person]"}>*/}
                    {/*    <button>*/}
                    {/*        Navigate to {e.name}'s {e.username}*/}
                    {/*    </button>*/}
                    {/*</Link>*/}
                </div>
            ))
        }
    </div>
}
