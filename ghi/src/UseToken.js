import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
let internalToken = null;


export function getToken() {
    return internalToken;
}

export async function getTokenInternal() {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/token/`;
    try {
        const response = await fetch(url, {
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            internalToken = data.access_token;
            return internalToken;
        }
    } catch (e) {}
    return false;
}

function handleErrorMessage(error) {
    if ("error" in error) {
        error = error.error;
        try {
            error = JSON.parse(error);
            if ("__all__" in error) {
                error = error.__all__;
            }
        } catch {}
    }
    if (Array.isArray(error)) {
        error = error.join("<br>");
    } else if (typeof error === "object") {
        error = Object.entries(error).reduce(
            (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
            ""
        );
    }
    return error;
}

export function useToken() {
    const {token, setToken} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchToken() {
            const token = await getTokenInternal();
            setToken(token);
        }
        if (!token) {
            fetchToken();
        }
    }, [setToken, token]);

    async function logout() {
        if (token) {
            const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/token/refresh/logout/`;
            await fetch(url, { method: "delete", credentials: "include" });
            internalToken = null;
            setToken(null);
            navigate("/");
        }
    }

    const login = async (loginCred) => {
        const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/token`;
        const form = new FormData();
        form.append("username", loginCred.username);
        form.append("password", loginCred.password);
        const response = await fetch(url, {
            method: "post",
            credentials: "include",
            body: form,
        });
        if (response.ok) {
            const token = await getTokenInternal();
            setToken(token);
            return;
        }
        let error = await response.json();
        return handleErrorMessage(error);
    }

    async function signup(username, password, email) {
        const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/accounts`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                username,
                password,
                email,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            await login(username, password);
        }
        return false;
    }

    async function update(email, password, username) {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/accounts/`;
        const response = await fetch(url, {
            method: "patch",
            body: JSON.stringify({
                email,
                password,
                username,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            await login(username, password);
        }
        return false;
    }

    return [token, login, logout, signup, update];
}
