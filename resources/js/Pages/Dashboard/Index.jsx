import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chart from 'react-apexcharts';

export default function Dashboard({ auth, projects, tasks, users }) {

    // Count the number of tasks per project
    const tasksPerProject = {};
    tasks.data.forEach(task => {
        tasksPerProject[task.project.name] = tasksPerProject[task.project.name] ? tasksPerProject[task.project.name] + 1 : 1
    });

    // Count the number of tasks per user
    const tasksPerUser = {};
    tasks.data.forEach(task => {
        tasksPerUser[task.assignedUser.name] = tasksPerUser[task.assignedUser.name] ? tasksPerUser[task.assignedUser.name] + 1 : 1
    });

    // Prepare data for the project tasks chart
    const projectNames = projects.data.map(project => project.name);
    const tasksCount = projectNames.map(projectName => tasksPerProject[projectName] || 0);

    // Prepare data for the user tasks chart
    const userNames = users.data.map(user => user.name);
    const userTasksCount = userNames.map(userName => tasksPerUser[userName] || 0);

    // Prepare data for the stacked bar chart
    const uniqueStatuses = ['completed', 'in_progress', 'pending'];

    const statusSeries = uniqueStatuses.map(status => ({
        name: status,
        data: projectNames.map(projectName => {
            const tasksForProject = tasks.data.filter(task => task.project.name === projectName);
            return tasksForProject.filter(task => task.status === status).length;
        }),
    }));

    // Custom labels for status
    const statusLabels = {
        completed: 'Completed',
        in_progress: 'In Progress',
        pending: 'Pending',
    };

    // Extract creation and due dates from projects
    const projectCreationDates = projects.data.map(project => new Date(project.created_at).toLocaleDateString());
    const projectDueDates = projects.data.map(project => new Date(project.due_date).toLocaleDateString());

    // Count the number of projects created or due on each date
    const projectCreationCounts = {};
    const projectDueCounts = {};

    projectCreationDates.forEach(date => {
        projectCreationCounts[date] = projectCreationCounts[date] ? projectCreationCounts[date] + 1 : 1;
    });

    projectDueDates.forEach(date => {
        projectDueCounts[date] = projectDueCounts[date] ? projectDueCounts[date] + 1 : 1;
    });

    // Combine creation and due counts to get unique dates
    const allDates = new Set([...projectCreationDates, ...projectDueDates]);

    // Sort the dates in ascending order
    const sortedDates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

    // Prepare data for the timeline chart
    const creationData = sortedDates.map(date => projectCreationCounts[date] || 0);
    const dueData = sortedDates.map(date => projectDueCounts[date] || 0);

    // Donut chart for task priorities
    const priorityCounts = tasks.data.reduce((acc, task) => {
        acc[task.priority] = acc[task.priority] ? acc[task.priority] + 1 : 1;
        return acc;
    }
        , {});
    // Extract the counts and labels
    const prioritySeries = Object.keys(priorityCounts).map(priority => priorityCounts[priority]);
    const priorityLabels = Object.keys(priorityCounts);

    // Chart for duration of project in days (created_at to due_date)

    const projectDurations = projects.data.map(project => {
        const created = new Date(project.created_at);
        const due = new Date(project.due_date);
        return Math.ceil((due - created) / (1000 * 60 * 60 * 24));
    });
    const projectDurationSeries = projectDurations.reduce((acc, duration) => {
        if (duration <= 7) {
            acc[0]++;
        } else if (duration <= 14) {
            acc[1]++;
        } else if (duration <= 30) {
            acc[2]++;
        } else {
            acc[3]++;
        }
        return acc;
    }, [0, 0, 0, 0]);
    const projectDurationLabels = ['1 week or less', '1-2 weeks', '2-4 weeks', '1 month or more'];



    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Boxes for project, task, and user counts */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div className="bg-white border border-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 flex flex-col items-center justify-center">
                            <div className="rounded-full bg-blue-500 text-white h-10 w-10 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 w-6" fill="lightgray">
                                    <path d="M48 115.8C38.2 107 32 94.2 32 80c0-26.5 21.5-48 48-48c14.2 0 27 6.2 35.8 16H460.2c8.8-9.8 21.6-16 35.8-16c26.5 0 48 21.5 48 48c0 14.2-6.2 27-16 35.8V396.2c9.8 8.8 16 21.6 16 35.8c0 26.5-21.5 48-48 48c-14.2 0-27-6.2-35.8-16H115.8c-8.8 9.8-21.6 16-35.8 16c-26.5 0-48-21.5-48-48c0-14.2 6.2-27 16-35.8V115.8zM125.3 96c-4.8 13.6-15.6 24.4-29.3 29.3V386.7c13.6 4.8 24.4 15.6 29.3 29.3H450.7c4.8-13.6 15.6-24.4 29.3-29.3V125.3c-13.6-4.8-24.4-15.6-29.3-29.3H125.3zm2.7 64c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160zM256 320h32c35.3 0 64-28.7 64-64V224h64c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V320z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Projects</h2>
                            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{projects.data.length}</p>
                        </div>
                        <div className="bg-white border border-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 flex flex-col items-center justify-center">
                            <div className="rounded-full bg-green-500 text-white h-10 w-10 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6" fill="lightgray">
                                    <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Tasks</h2>
                            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{tasks.data.length}</p>
                        </div>
                        <div className="bg-white border border-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 flex flex-col items-center justify-center">
                            <div className="rounded-full bg-yellow-500 text-white h-10 w-10 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-6 w-6' fill="lightgray" >
                                    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Users</h2>
                            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{users.data.length}</p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-2 gap-6">

                        {/* Task Priorities */}
                        <div className="bg-white  dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 m-9">
                            <h2 className="text-lg text-center font-semibold text-gray-800 dark:text-gray-200 mb-4">Task Priorities</h2>
                            <Chart
                                type="donut"
                                width={530}
                                height={300}
                                series={prioritySeries}
                                options={{
                                    labels: priorityLabels,
                                    colors: ['#ffc107', '#007bff', '#dc3545'], // Yellow, Blue, Red
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            colors: ['#ffffff'], // Light text color for data labels
                                        },
                                    },
                                    legend: {
                                        show: true,
                                        position: 'bottom',
                                        labels: {
                                            colors: '#ffffff', // Light legend text color
                                        },
                                        horizontalAlign: 'center',
                                    },
                                    tooltip: {
                                        enabled: true,
                                        y: {
                                            formatter: function(val) {
                                                return val + " tasks";
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                        {/* Project Durations */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 m-9">
                            <h2 className="text-lg text-center   font-semibold text-gray-800 dark:text-gray-200 mb-4">Project Durations</h2>
                            <Chart
                                type="pie"
                                width={530}
                                height={300}
                                position="center"
                                series={projectDurationSeries}
                                options={{
                                    labels: projectDurationLabels,
                                    colors: ['#007bff', '#28a745', '#ffc107', '#dc3545'], // Blue, Green, Yellow, Red
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            colors: ['#ffffff'], // Light text color for data labels
                                        },
                                    },
                                    legend: {
                                        show: true,
                                        position: 'bottom',
                                        labels: {
                                            colors: '#ffffff', // Light legend text color
                                        },
                                        horizontalAlign: 'center',
                                    },
                                }}
                            />
                        </div>
                        {/* Tasks Status per Project */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 m-9">
                            <h2 className="text-lg text-center  font-semibold text-gray-800 dark:text-gray-200 mb-4">Tasks Status per Project</h2>
                            <Chart
                                type="bar"
                                width={530}
                                height={400}
                                series={statusSeries}
                                options={{
                                    colors: ['#28a745', '#ffc107', '#dc3545'], // Green, Yellow, Red
                                    xaxis: {
                                        categories: projectNames,
                                        labels: {
                                            style: {
                                                size: '5px',
                                                colors: '#ffffff', // Light text color for x-axis labels
                                            },
                                        },
                                    },
                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            stacked: true,
                                        },
                                    },
                                    legend: {
                                        show: true,
                                        position: 'top',
                                        labels: {
                                            colors: '#ffffff', // Light legend text color
                                            useSeriesColors: false, // To use custom colors
                                            custom: statusLabels,
                                        },
                                        horizontalAlign: 'center',
                                    },
                                }}
                            />
                        </div>

                        {/* Task per Project */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 m-9">
                            <h2 className="text-lg text-center  font-semibold text-gray-800 dark:text-gray-200 mb-4">Tasks per Project</h2>
                            <Chart
                                type="bar"
                                width={530}
                                height={400}
                                series={[
                                    {
                                        name: 'Tasks',
                                        data: tasksCount,
                                    },
                                ]}
                                options={{
                                    colors: ['#007bff'], // Blueish bars
                                    xaxis: {
                                        categories: projectNames,
                                        labels: {
                                            style: {
                                                size: '5px',
                                                colors: '#ffffff', // Light text color for x-axis labels
                                            },
                                        },
                                    },
                                    dataLabels: {
                                        enabled: false,
                                        categories: projectNames,
                                        style: {
                                            colors: ['#ffffff'], // Light text color for the data labels
                                        },
                                    },
                                    tooltip: {
                                        enabled: true,
                                        y: {
                                            formatter: function(val) {
                                                return val + " tasks";
                                            },
                                        },
                                    },
                                    legend: {
                                        show: true,
                                        position: 'bottom',
                                        labels: {
                                            colors: '#fff',
                                        },
                                        horizontalAlign: 'center',
                                    },
                                    plotOptions: {
                                        bar: {
                                            endingShape: 'rounded',
                                        },
                                    },
                                }}
                            />
                        </div>
                        {/* Tasks per User */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 m-9">
                            <h2 className="text-lg text-center  font-semibold text-gray-800 dark:text-gray-200 mb-4">Tasks per User</h2>
                            <Chart
                                type="bar"
                                width={530}
                                height={400}
                                series={[
                                    {
                                        name: 'Tasks',
                                        data: userTasksCount,
                                    },
                                ]}
                                options={{
                                    colors: ['#ffc107', '#dc3545'], // Blueish bars
                                    xaxis: {
                                        categories: userNames,
                                        labels: {
                                            style: {
                                                size: '5px',
                                                colors: '#ffffff', // Light text color for x-axis labels
                                            },
                                        },
                                    },
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            colors: ['#ffffff'], // Light text color for the data labels
                                        },
                                    },
                                    tooltip: {
                                        enabled: true,
                                        y: {
                                            formatter: function(val) {
                                                return val + " tasks";
                                            },
                                        },
                                    },
                                    legend: {
                                        show: true,
                                        position: 'bottom',
                                        labels: {
                                            colors: '#ffffff', // Light legend text color
                                        },
                                        horizontalAlign: 'center',
                                    },
                                }}
                            />
                        </div>
                        {/* Project Timeline */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 m-9">
                            <h2 className="text-lg text-center  font-semibold text-gray-800 dark:text-gray-200 mb-4">Project Timeline</h2>
                            <Chart
                                type="line"
                                width={530}
                                height={400}
                                series={[
                                    {
                                        name: 'Projects Created',
                                        data: creationData,
                                    },
                                    {
                                        name: 'Projects Due',
                                        data: dueData,
                                    },
                                ]}
                                options={{
                                    colors: ['#007bff', '#28a745'], // Blue, Green
                                    xaxis: {
                                        categories: sortedDates,
                                        labels: {
                                            style: {
                                                size: '5px',
                                                colors: '#ffffff', // Light text color for x-axis labels
                                            },
                                        },
                                    },
                                    dataLabels: {
                                        enabled: false,
                                        style: {
                                            colors: ['#ffffff'], // Light text color for data labels
                                        },
                                    },
                                    stroke: {
                                        curve: 'smooth',
                                    },
                                    legend: {
                                        show: true,
                                        position: 'bottom',
                                        labels: {
                                            colors: '#ffffff', // Light legend text color
                                        },
                                        horizontalAlign: 'center',
                                    },
                                }}
                            />
                        </div>


                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
