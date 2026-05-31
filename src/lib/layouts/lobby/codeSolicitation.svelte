<script lang="ts">
    import IconButton from "$lib/components/buttons/iconButton.svelte";
</script>

<form id="code_solicitation" class="user_role_config">
    <input type="text" placeholder="insert code" name="code">
    <div id="code_submit">
        <IconButton icon="send" />
    </div>
</form>