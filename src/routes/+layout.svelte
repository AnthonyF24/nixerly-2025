<script>
  import '../app.css';
</script>

<div class="root-layout">
  <main class="main-content">
    <slot />
  </main>
</div>

<style>
  .root-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: auto;
    overflow-y: auto;
  }

  .main-content {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    position: relative;
  }
</style> 