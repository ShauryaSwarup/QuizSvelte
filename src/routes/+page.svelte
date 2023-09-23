<script>
    import "../app.css";
    import quizzes from "../data.json";
    import Card from "../components/Card.svelte";
</script>

{#each quizzes as quiz}
    <Card {quiz} />
{/each}
