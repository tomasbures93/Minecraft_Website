export const BASE_URL = "https://localhost:7198/api";

export const API_PUBLIC_ENDPOINTS = {
    HOMEPAGE: "/Website/GetHomePagePaged",
    ABOUTPAGE: "/Website/GetAboutPage",
    RULES: "/Website/GetRulesPage",
    CHANGELOG: "/Website/GetChangeLogPagePaged",
    SERVERINFO: "/Website/GetServerInfo",
}

export const API_ADMIN_ENDPOINTS = {
    GET_ARTICLES: "/Website/GetHomePage",
    GET_ARTICLE: "/Website/GetSpecificArticle",
    ADD_ARTICLE: "/Website/AddArticle",
    EDIT_ARTICLE: "/Website/EditArticle",
    DELETE_ARTICLE: "/Website/DeleteArticle",
    GET_CHANGELOG: "/Website/GetChangeLogPage",
    ADD_CHANGELOG: "/Website/AddChangeLog",
    EDIT_CHANGELOG: "/Website/UpdateChangeLog",
    DELETE_CHANGELOG: "/Website/DeleteChangeLog",
    EDIT_RULES: "/Website/UpdateRulesPage",
    EDIT_ABOUT: "/Website/UpdateAboutPage",
    EDIT_SERVERINFO: "/Website/UpdateServerInfo",
}

export const API_AUTH_ENDPOINTS = {
    LOGIN: "/Auth/Login",
    CHANGE_PASSWORD: "/Auth/ChangePassword",
    CHANGE_PIN: "/Auth/ChangePin",
    LOGOUT: "/Auth/Logout",
}