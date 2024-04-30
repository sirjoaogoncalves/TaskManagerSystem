import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true); // Start with dark mode

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>

            <nav className="bg-gray-900 shadow-md">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="h-16 w-16" />
                            </Link>
                            <div className="hidden sm:block sm:ml-10">
                                <div className="flex space-x-4">
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Dashboard
                                    </NavLink>
                                    <NavLink href={route('project.index')} active={route().current('project.index')}>
                                        Projects
                                    </NavLink>
                                    <NavLink href={route('task.myTasks')} active={route().current('task.myTasks')}>
                                        My Tasks
                                    </NavLink>
                                    <NavLink href={route('task.index')} active={route().current('task.index')}>
                                        All Tasks
                                    </NavLink>
                                    <NavLink href={route('user.index')} active={route().current('user.index')}>
                                        Users
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:text-white"
                                onClick={toggleDarkMode}
                            >
                                {isDarkMode ? (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11.993 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.999 9a6 6 0 01-5.365 5.977A4.001 4.001 0 0016 11c0-2.206-1.794-4-4-4 0-.553-.447-1-1-1a6 6 0 014.999 8.942A6.002 6.002 0 0116 15c1.105 0 2-.894 2-2 0-.553-.447-1-1-1z"
                                        />
                                    </svg>
                                )}
                            </button>
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center text-sm font-medium text-white">
                                            <span>{user.name}</span>
                                            <svg
                                                className="ml-1 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="-mr-2 flex sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(prevState => !prevState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:text-white"
                            >
                                {showingNavigationDropdown ? (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {showingNavigationDropdown && (
                    <div className="sm:hidden bg-gray-900">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('project.index')} active={route().current('project.index')}>
                                Projects
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('task.myTasks')} active={route().current('task.myTasks')}>
                                My Tasks
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('task.index')} active={route().current('task.index')}>
                                All Tasks
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('user.index')} active={route().current('user.index')}>
                                Users
                            </ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </nav>
            {header && (
                <header className="bg-gray-900 py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}
            <main className="bg-gray-800 h-full h-screen">{children}</main>
        </div>
    );
}
