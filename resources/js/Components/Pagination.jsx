import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {links.map(link => (
                <Link dangerouslySetInnerHTML={{ __html: link.label }}
                key={link.label}
                href={link.url || ''}
                preserveScroll
                className={`
                        inline-block py-2 px-4 text-sm font-medium leading-5 text-gray-600
                        transition duration-150 ease-in-out border border-transparent
                        rounded-md focus:outline-none focus:shadow-outline-blue
                        ${link.active ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : ''}
                        ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                    `}>
                </Link>
            ))}
        </nav>
    )
}
