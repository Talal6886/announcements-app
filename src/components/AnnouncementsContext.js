import React, { createContext, useState } from 'react';
import logo from '@assets/images/Logo.png';

export const AnnouncementsContext = createContext();

export const AnnouncementsProvider = ({ children }) => {
    const [announcements, setAnnouncements] = useState([
        // HR Announcements
        {
            category: "HR",
            title: "HR Policy Update",
            description: "Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.Updates to the HR policy including new leave entitlements and revised working hours.",
            expiryDate: "2024-08-20",
            id: 1722773447827,
            image: logo,
            pinned: false,
            text: "Read more about the latest HR policy changes.",
            checkedUsers: []
        },
        {
            category: "HR",
            title: "New Benefits Package",
            description: "Introducing new benefits and perks for employees. Find out what’s included.",
            expiryDate: "2024-08-21",
            id: 1722773447828,
            image: logo,
            pinned: false,
            text: "Learn about the new benefits package available to all employees.",
            checkedUsers: []
        },
        {
            category: "HR",
            title: "Upcoming HR Workshop",
            description: "Join our upcoming workshop on professional development and career growth.",
            expiryDate: "2024-08-22",
            id: 1722773447829,
            image: logo,
            pinned: false,
            text: "Register for our HR workshop to boost your professional skills.",
            checkedUsers: []
        },
        // IT Announcements
        {
            category: "IT",
            title: "System Maintenance Scheduled",
            description: "Planned maintenance for our IT systems will occur this weekend. Expect some downtime.",
            expiryDate: "2024-08-24",
            id: 1722773447830,
            image: logo,
            pinned: false,
            text: "Be aware of the scheduled system maintenance and plan accordingly.",
            checkedUsers: []
        },
        {
            category: "IT",
            title: "New Software Rollout",
            description: "We are rolling out new software updates. Please update your applications by the end of the week.",
            expiryDate: "2024-08-25",
            id: 1722773447831,
            image: logo,
            pinned: false,
            text: "Ensure your software is up-to-date with the latest updates.",
            checkedUsers: []
        },
        {
            category: "IT",
            title: "Cybersecurity Awareness Training",
            description: "Participate in our cybersecurity training to stay informed about the latest threats and best practices.",
            expiryDate: "2024-08-26",
            id: 1722773447832,
            image: logo,
            pinned: false,
            text: "Join our training to enhance your understanding of cybersecurity.",
            checkedUsers: []
        },
        // Retails Announcements
        {
            category: "Retails",
            title: "New Product Launch",
            description: "Check out the latest products launching this month and see what’s new in our inventory.",
            expiryDate: "2024-08-28",
            id: 1722773447833,
            image: logo,
            pinned: false,
            text: "Explore our new product range available this month.",
            checkedUsers: []
        },
        {
            category: "Retails",
            title: "End of Season Sale",
            description: "Don’t miss out on our end-of-season sale with discounts on select items.",
            expiryDate: "2024-08-29",
            id: 1722773447834,
            image: logo,
            pinned: false,
            text: "Take advantage of our end-of-season sale for great deals.",
            checkedUsers: []
        },
        {
            category: "Retails",
            title: "Customer Feedback Survey",
            description: "We value your feedback. Participate in our survey to help us improve our services.",
            expiryDate: "2024-08-30",
            id: 1722773447835,
            image: logo,
            pinned: false,
            text: "Give us your feedback to enhance your shopping experience.",
            checkedUsers: []
        },
        // Security Announcements
        {
            category: "Security",
            title: "New Security Protocols",
            description: "Updates to our security protocols. Make sure to review the new procedures.",
            expiryDate: "2024-08-30",
            id: 1722773447836,
            image: logo,
            pinned: false,
            text: "Review the new security protocols to ensure compliance.",
            checkedUsers: []
        },
        {
            category: "Security",
            title: "Emergency Response Plan",
            description: "Revised emergency response plan. Familiarize yourself with the updated procedures.",
            expiryDate: "2024-08-31",
            id: 1722773447837,
            image: logo,
            pinned: false,
            text: "Understand the new emergency response plan and stay safe.",
            checkedUsers: []
        },
        {
            category: "Security",
            title: "Security Awareness Training",
            description: "Mandatory security awareness training for all employees. Attendance is required.",
            expiryDate: "2024-09-01",
            id: 1722773447838,
            image: logo,
            pinned: false,
            text: "Participate in security awareness training to stay informed.",
            checkedUsers: []
        },
    ]);
    const [user, setUser] = useState(null);
    const [userPinnedAnnouncements, setUserPinnedAnnouncements] = useState({});

    const validUsers = [
        { id: 'admin', name: 'Admin', role: 'admin' },
        { id: 'employee1', name: 'Employee 1', role: 'employee' },
        { id: 'employee2', name: 'Employee 2', role: 'employee' },
        { id: 'employee3', name: 'Employee 3', role: 'employee' },
        { id: 'employee4', name: 'Employee 4', role: 'employee' },
        { id: 'employee5', name: 'Employee 5', role: 'employee' },
        { id: 'employee6', name: 'Employee 6', role: 'employee' },
        { id: 'employee7', name: 'Employee 7', role: 'employee' },
        { id: 'employee8', name: 'Employee 8', role: 'employee' },
        { id: 'employee9', name: 'Employee 9', role: 'employee' },
    ];

    const togglePinAnnouncement = (announcementId, userId) => {
        setUserPinnedAnnouncements((prevPinned) => {
            const userPins = prevPinned[userId] || [];
            if (userPins.includes(announcementId)) {
                return {
                    ...prevPinned,
                    [userId]: userPins.filter((id) => id !== announcementId),
                };
            } else {
                return {
                    ...prevPinned,
                    [userId]: [...userPins, announcementId],
                };
            }
        });
    };

    const incrementViews = (id) => {
        setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.map((announcement) =>
                announcement.id === id ? { ...announcement, views: announcement.views + 1 } : announcement
            )
        );
    };

    const markAnnouncementAsRead = (id, userId) => {
        setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.map((announcement) =>
                announcement.id === id && !announcement.checkedUsers.includes(userId)
                    ? { ...announcement, checkedUsers: [...announcement.checkedUsers, userId] }
                    : announcement
            )
        );
    };

    const addAnnouncement = (announcement) => {
        const newAnnouncement = { ...announcement, checkedUsers: [] };
        setAnnouncements((prevAnnouncements) => [...prevAnnouncements, newAnnouncement]);
    };

    const removeAnnouncement = (id) => {
        setAnnouncements((prevAnnouncements) => prevAnnouncements.filter((announcement) => announcement.id !== id));
    };

    return (
        <AnnouncementsContext.Provider
            value={{
                announcements,
                togglePinAnnouncement,
                incrementViews,
                markAnnouncementAsRead,
                addAnnouncement,
                removeAnnouncement,
                user,
                setUser,
                validUsers,
                userPinnedAnnouncements,
            }}
        >
            {children}
        </AnnouncementsContext.Provider>
    );
};