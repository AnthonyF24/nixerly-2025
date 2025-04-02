<script>
  // Imports if needed
</script>

<div class="page-container overflow-auto">
  <div class="content">
    <h1 class="text-2xl font-bold">About Us</h1>
    <p class="my-4">Content here...</p>
    <!-- Add more content to force scrolling -->
    <div class="h-screen bg-gray-100 my-4 flex items-center justify-center">Tall content section 1</div>
    <div class="h-screen bg-gray-200 my-4 flex items-center justify-center">Tall content section 2</div>
  </div>
</div>

<style>
  /* Ensure specific scrolling behavior for this page */
  :global(body), :global(html), :global(main), :global(.root-layout), :global(.main-content) {
    overflow-y: auto !important;
  }
  
  /* Ensure the page container itself scrolls properly */
  .page-container {
    min-height: 100%;
    width: 100%;
    overflow-y: auto !important;
  }
</style> 