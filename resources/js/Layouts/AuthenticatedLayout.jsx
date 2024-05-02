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
        <div className={`flex h-screen${isDarkMode ? ' dark' : ''}`}>

            {/* Vertical Navbar */}
            <nav className="bg-gray-900 w-40 flex flex-col justify-between items-center transition-all duration-300 ease-in-out hover:w-72">
                <div className="mt-8">
                    <Link href="/">
                        <ApplicationLogo className="h-12 w-12 flex justify-center items-center" />
                    </Link>

                    <div className="mt-6">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center justify-center text-sm font-medium text-white">
                                    <span>{user.name}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
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
                        <div className="mt-3 flex flex-col space-y-4">
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
            </nav>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                {header && (
                    <header className="bg-gray-800 py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}
                <main className="bg-gray-800 h-full flex-1 overflow-y-auto">{children}</main>
            </div>

        </div>
    );
}

