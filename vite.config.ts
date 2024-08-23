import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'vite-plugin-fs';
import ViteFS from 'vite-fs'
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), fs()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
