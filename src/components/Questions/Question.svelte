<script lang="ts">
    import { answers } from "../../store";

    export let question: any;
    export let selectedOption: null | string;
    export let handleChangeOption: (label: string) => void;
    export let showCorrectAnswer: boolean;
    export let handleSubmit: () => void;
</script>

<div class="shadow border-spacing-0 rounded-sm bg-gray-200 m-3">
    <div class="p-4">
        <p class="text-xl font-bold">{question.question}</p>
    </div>
    <div class="p-4">
        <div class="flex flex-wrap">
            {#if showCorrectAnswer}
                {#each question.options as option}
                    <div class="w-1/2 p-2">
                        <button
                            class={`w-full p-2 rounded-md ${
                                option.label === question.answer
                                    ? "bg-green-200"
                                    : option.label === selectedOption? "bg-yellow-200" : "bg-red-300"
                            }`}
                            on:click={() => handleChangeOption(option.label)}
                            >{option.text}</button
                        >
                    </div>
                {/each}
            {:else}
                {#each question.options as option}
                    <div class="w-1/2 p-2">
                        <button
                            class={`w-full p-2 bg-slate-50 rounded-md ${
                                selectedOption === option.label
                                    ? "bg-yellow-200"
                                    : ""
                            }`}
                            on:click={() => handleChangeOption(option.label)}
                            >{option.text}</button
                        >
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>
