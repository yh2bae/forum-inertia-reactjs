import { Link } from '@inertiajs/inertia-react'
import React from 'react'

export default function Pagination({meta}) {
    return (
        <div className="flex items-center gap-x-4 !mb-10">
            {meta.links.map((link, key) => {
                return link.url == null ? <span key={key} className="text-gray-500" dangerouslySetInnerHTML={{ __html: link.label }} /> : 
                <Link key={key} className={`${link.active ? 'text-blue-500' : ''}`} 
                href={link.url || ''} 
                dangerouslySetInnerHTML={{ __html: link.label }} />;
            })}
        </div>
    )
}
