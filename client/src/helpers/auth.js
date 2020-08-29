export const isAuthenticated = () => {
    if(typeof window === "object") {
        const user = JSON.parse(localStorage.getItem("user"));

        if(user) return user.id && user.token;

        return false;
    }

    return false;
}

export const saveLogin = ({ nick, id, token }) => {
    if(typeof window === "object") {
        const user = {
            nick, id, token
        };

        localStorage.setItem("user", JSON.stringify(user));
    }

    return false;
}

export const getLogin = () => {
    if(typeof window === "object") {
        const user = JSON.parse(localStorage.getItem("user"));

        return user;
    }
}

export const delLogin = () => {
    if(typeof window === "object") {
        localStorage.removeItem("user");
    }
}