// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			loggedIn: boolean = false;
		}
		interface PageData {
			status: number,
			body: {
				message: string
			}
		}
		// interface Platform {}
	}
}

export {};
