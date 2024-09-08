import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event ) => {
    console.log(event.cookies.get('loggedIn'))
    return { 
        loggedIn: event.cookies.get('loggedIn')
    }
}