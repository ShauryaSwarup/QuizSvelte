<script lang="ts">
    import { onMount } from "svelte";
    import Question from "../../../components/Questions/Question.svelte";
    import { answers, type Answer } from "../../../store";
    import QuestionProgress from "../../../components/Questions/QuestionProgress.svelte";
    import { goto } from "$app/navigation";

    //load function for a +page.ts called first, then page loaded
    export let data: any;
    console.log({ data });

    let currQuestionIndex = 0;
    let answersValue: Answer[] = [];
    let selectedOption: null | string = null;
    let showCorrectAnswer: boolean = false;

    answers.subscribe((value) => {
        answersValue = value;
    });

    const handleChangeOption = (label: string) => {
        selectedOption = label;
    };

    const onSubmit = (question: any) => {
        showCorrectAnswer = true;
        answers.update((currentState) => {
            const updatedAnswerState = currentState;
            updatedAnswerState[currQuestionIndex].isCorrect =
                selectedOption === question.answer;
            return updatedAnswerState;
        });
    };

    const handleSubmit = () => {
        selectedOption = null;
        console.log(answersValue);
    };
    $: currQuestion = data.questions[currQuestionIndex];
    onMount(() => {
        answers.set(
            data.questions.map((question: any) => {
            return {
                id: question.id,
                isCorrect: null,
            }
        }));    
    });
</script>

<div class="flex flex-col">
    <div class="flex justify-center">
        {#each answersValue as answer}
        <QuestionProgress isCorrect={answer.isCorrect} />
        {/each}
    </div>
    <Question
        question={currQuestion}
        {selectedOption}
        {handleChangeOption}
        {showCorrectAnswer}
        {handleSubmit}
    />
    <div class="flex justify-around m-2">
        <button
            class="rounded-sm bg-yellow-400 w-40 h-12 self-center"
            on:click={() =>
                currQuestionIndex - 1 < 0
                    ? currQuestionIndex
                    : (currQuestionIndex -= 1)}>Back</button
        >
        {#if selectedOption !== null && !showCorrectAnswer}
            <button
                class="rounded-sm bg-blue-400 w-40 h-12 self-center"
                on:click={() => onSubmit(currQuestion)}>Submit</button
            >
        {:else}
            <button
                class="rounded-sm bg-green-400 w-40 h-12 self-center"
                on:click={() => {
                    onSubmit(currQuestion),
                        currQuestionIndex + 1 < data.questions.length
                            ? (currQuestionIndex += 1)
                            : goto(`/results`),
                        (selectedOption = null),
                        (showCorrectAnswer = false);
                }}>Next</button
            >
        {/if}
    </div>
</div>
