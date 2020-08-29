export const GET = async ({ url, token }) => {
    const request = await fetch(url, {
        headers: new Headers(token && {
            "Authorization" : token
        })
    });
    const response = await request;

    return response.json();
};

export const POST = async ({ url, method, body, token }) => {
    const request = await fetch(url, {
        method,
        body,
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": token
        })
    });

    const response = await request;

    return response.json();
};