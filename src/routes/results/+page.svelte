<script lang="ts">
    import { goto } from "$app/navigation";
    import {answers, type Answer} from "../../store"
    let answersValue: Answer[] = [];
    answers.subscribe((value) => {
        answersValue = value;
    });
    const numberOfCorrectAnswers = answersValue.filter((answer) => answer.isCorrect).length;
</script>

<div class="flex flex-col">
    <div class="flex justify-center">
        <h1 class="text-3xl font-bold">You got {numberOfCorrectAnswers} out of {answersValue.length} questions correct!</h1>
    </div>
    <div class="flex justify-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => {answers.set([]), goto(`/`)}}>Back to Home</button>
    </div>
</div>