import Pagination from '@/Components/Pagination';
import App from '@/Layouts/App';
import { Link } from '@inertiajs/inertia-react';
import React, { useCallback, useEffect, useState } from 'react';
import { debounce, pickBy } from 'lodash';
import { Inertia } from '@inertiajs/inertia';
import Filter from '@/Components/Filter';

export default function Index(props) {
    const { filter, categories } = props;
    const { data: threads, meta } = props.threads;
    const [keyword, setKeyword] = useState(filter.search);

    const reload = useCallback(
        debounce((q) => {
            Inertia.get('/threads', pickBy({ search: q, page: filter.page, category: filter.category }), { preserveState: true });
        }, 500)
        , []);

    useEffect(() => reload(keyword), [keyword]);
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between w-full gap-x-2">
                <div className="flex items-center gap-x-2">
                    <select className="w-full lg:w-36 h-10 rounded-lg border-gray-200 focus:ring focus:border-blue-400 focus:ring-blue-100 duration-200">
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    <Filter categories={categories} initialState={filter.category} />
                </div>
                <div className="bg-white flex items-center overflow-hidden rounded-lg border px-2 focus-within:ring focus-within:border-blue-400 focus-within:ring-blue-100 duration-200">
                    <svg className="w-5 h-5 mr-1.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                    <input type="text" className="h-10 p-0 focus:outline-none focus:ring-transparent focus:border-transparent border-0" name="search" id="search" placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                </div>
            </div>
            {threads.length ? threads.map(thread => (
                <div className="bg-white flex gap-x-4 p-4 rounded-lg shadow" key={thread.id}>
                    <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={thread.user.picture} alt={thread.user.name} />
                    </div>
                    <div className="w-full">
                        <Link href={route('threads.show', thread.slug)}>
                            <h1>{thread.title}</h1>
                        </Link>
                        <div className="leading-relaxed text-sm mb-3 text-gray-500">
                            {thread.teaser}``
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm gap-x-4">
                                <div className="text-blue-500 font-semibold">{thread.user.name}</div>
                                <Link href={`/threads?category=${thread.category.slug}`} className="hidden md:block text-gray-500 font-semibold">{thread.category.name}</Link>
                                <span className="text-gray-500 hidden md:block">{thread.created_at}</span>
                            </div>
                            <div className="flex items-center text-sm gap-x-4">
                                <span>
                                    <svg className="w-5 h-5 text-gray-500 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                    <span className="ml-1">{thread.likes_count}</span>
                                </span>
                                <span>
                                    <svg className="w-5 h-5 text-gray-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    <span className="ml-1">{thread.replies_count}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )) : 'No Threads.'}

            <Pagination meta={meta} />
        </div>
    );
}

Index.layout = page => <App children={page} title="Threads" />;
