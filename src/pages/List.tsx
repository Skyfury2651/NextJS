import Link from 'next/link';
import {Users} from "../../api/Users";

export interface ListProps{
    dataList : Users[] | undefined;
}

export default function List({dataList} : ListProps) {
    return (
        <div>
            {
                dataList?.map((e, index) => (
                    <div key={index}>
                        <Link href={`/${e.username}/${e.name}`}>
                            <a>
                                Navigate to {e.username}'s {e.name}
                            </a>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

List.getInitialProps = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const dataList : Users[] | undefined = await response.json();

    return {dataList}
}