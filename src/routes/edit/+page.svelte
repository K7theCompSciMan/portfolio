<script lang="ts">
	import AnimatedInputLabel from '$lib/AnimatedInputLabel.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import type { ActionData } from './$types';
    import type { Data } from '$lib';

	export let actionData: ActionData;
	let loggedIn = false;
	if ($page.data.status == 401) {
		loggedIn = false;
	} else {
		loggedIn = true;
	}
	let username = '';
	let password = '';
	let peek = false;
	$: if (actionData && actionData.status == 200) {
		loggedIn = true;
	}

	let selectedPage = 'home';
	let data: Data = {
		homePage: {
			headline: {
				tagline: ['']
			}
		}
	};
	onMount(() => {
	});
	$: console.log(data);
    const saveData = () => {
    }
</script>

<div
	class="h-[94vh] text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar flex flex-col fixed bg-slate-800 w-screen"
	id="scrollable"
>
	{#if !loggedIn}
		<div class="flex justify-center">
			<div class="flex flex-col w-1/2 left-1/4 justify-center">
				<AnimatedInputLabel
					name="Username"
					labelbg="bg-slate-800"
					bind:value={username}
					size="scale-110"
				></AnimatedInputLabel>
				<AnimatedInputLabel
					name="Password"
					type={peek ? 'text' : 'password'}
					labelbg="bg-slate-800"
					bind:value={password}
					size="scale-110"
				></AnimatedInputLabel>
				<button
					class="absolute right-[30%] top-[15.5%]"
					on:click={() => {
						if (!peek) peek = true;
						else peek = false;
					}}
				>
					{#if !peek}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						</svg>
					{/if}
				</button>
				<form use:enhance method="post">
					<input type="text" bind:value={username} class="hidden" name="username" />
					<input type="password" bind:value={password} class="hidden" name="password" />
					<button
						type="submit"
						class="border bg-transparent w-[75%] relative left-[12.5%] pl-4 pr-4 text-current rounded-md mt-[4%] scale-110 mt[6%]"
						>Log In</button
					>
				</form>
			</div>
		</div>
	{:else}
		<div class="flex flex-col justify-center">
			<h1 class="text-4xl text-center">Welcome, Admin</h1>
			<h1 class="text-2xl text-center">Enter Info Below</h1>
			<div
				class="w-3/4 h-[48rem] rounded-2xl border-slate-500 border-[1px] left-[12.5%] relative"
			>
				<div
					class="rounded-3xl border-[1px] border-slate-500 w-[25%] h-[5%] left-[37.5%] mt-[1%] relative flex-row flex align-middle justify-center items-center text-sm"
				>
					<Button name="Home" onclick={() => (selectedPage = 'home')} more="mr-4"
					></Button>
					<Button
						name="My Projects"
						onclick={() => (selectedPage = 'projects')}
						more="mr-4"
					></Button>
					<Button name="About Me" onclick={() => (selectedPage = 'about-me')}></Button>
				</div>
				<div>
					{#if selectedPage === 'home'}
						<div
							id="headline"
							class="w-1/3 h-[16rem] rounded-2xl border-slate-500 border-[1px] ml-4 mt-2"
                            >
							<h1 class="text-2xl">Headline</h1>
                            <div class="overflow-auto h-[12rem] w-3/4">
                            <div class="flex flex-row">
							<AnimatedInputLabel
								name="Content"
								value={data.homePage?.headline?.content}
								labelbg="bg-slate-800"
								size="ml-2"
                                height="w-36"
							></AnimatedInputLabel>
							<AnimatedInputLabel
								name="Name"
								value={data.homePage?.headline?.name}
								labelbg="bg-slate-800"
								size="ml-2"
                                height="w-24"
							></AnimatedInputLabel>
                        </div>
							{#if data.homePage?.headline?.tagline}
								{#each data.homePage.headline.tagline as text, i}
									<AnimatedInputLabel
										name="Tagline Word {i+1}"
										value={text}
										labelbg="bg-slate-800"
										size="ml-2"
                                        height="w-36"
									></AnimatedInputLabel>
								{/each}
							{/if}
						</div>
                    </div>
                    <Button name="Save" more="absolute bottom-[4%] w-[4%] left-[48%] border-slate-500 border-[1px] rounded-3xl " onclick={()=>{saveData()}}></Button>
					{:else if selectedPage === 'projects'}{:else if selectedPage === 'about-me'}{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
