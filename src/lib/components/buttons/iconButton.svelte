<script lang="ts">
    let {icon, action}:{icon:string, action?:Function} = $props();
</script>

<button type="button" onclick={() => action?.()}>
    {icon}
</button>