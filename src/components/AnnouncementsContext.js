import React, { createContext, useState } from "react";
import logo from "@assets/images/Logo.png";

export const AnnouncementsContext = createContext();

export const AnnouncementsProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState(null);
  const [userPinnedAnnouncements, setUserPinnedAnnouncements] = useState({});

  const validUsers = [
    { id: "", name: "Admin", role: "admin" },
    { id: "employee1", name: "Employee 1", role: "employee" },
    { id: "employee2", name: "Employee 2", role: "employee" },
    { id: "employee3", name: "Employee 3", role: "employee" },
    { id: "employee4", name: "Employee 4", role: "employee" },
    { id: "employee5", name: "Employee 5", role: "employee" },
    { id: "employee6", name: "Employee 6", role: "employee" },
    { id: "employee7", name: "Employee 7", role: "employee" },
    { id: "employee8", name: "Employee 8", role: "employee" },
    { id: "employee9", name: "Employee 9", role: "employee" },
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
        announcement.id === id
          ? { ...announcement, views: announcement.views + 1 }
          : announcement
      )
    );
  };

  const markAnnouncementAsRead = (id, userId) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.map((announcement) =>
        announcement.id === id && !announcement.checkedUsers.includes(userId)
          ? {
              ...announcement,
              checkedUsers: [...announcement.checkedUsers, userId],
            }
          : announcement
      )
    );
  };

  const addAnnouncement = (announcement) => {
    const newAnnouncement = { ...announcement, checkedUsers: [] };
    setAnnouncements((prevAnnouncements) => [
      ...prevAnnouncements,
      newAnnouncement,
    ]);
  };

  const removeAnnouncement = (id) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((announcement) => announcement.id !== id)
    );
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
