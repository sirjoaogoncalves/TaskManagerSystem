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

    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Tasks per Project</h2>
                            <Chart
                                type="bar"
                                width={500}
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
                                    },
                                }}
                            />
                        </div>
                          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Tasks Status per Project</h2>
                            <Chart
                                type="bar"
                                width={500}
                                height={400}
                                series={statusSeries}
                                options={{
                                    colors: ['#28a745', '#ffc107', '#dc3545'], // Green, Yellow, Red
                                    xaxis: {
                                        categories: projectNames,
                                    },
                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            stacked: true,
                                        },
                                    },
                                    legend: {
                                        show: true,
                                        position: 'bottom',
                                        labels: {
                                            colors: '#ffffff', // Light legend text color
                                            useSeriesColors: false, // To use custom colors
                                            formatter: function(value, seriesIndex) {
                                                return statusLabels[value]; // Custom label
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Project Timeline</h2>
                        <Chart
                            type="line"
                            width={700}
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
                                },
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
                                },
                            }}
                        />
                    </div>


                     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Tasks per User</h2>
                            <Chart
                                type="bar"
                                width={500}
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
