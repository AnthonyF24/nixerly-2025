<script>
  // Add any necessary imports or logic here
</script>

<div class="page-container overflow-auto">
  <div class="content">
    <h1 class="text-2xl font-bold mb-4">Welcome to Our Website</h1>
    <p class="mb-4">This is the home page content.</p>
    
    <!-- Add enough content to ensure scrolling is possible -->
    <div class="my-8">
      <h2 class="text-xl font-semibold mb-2">Section 1</h2>
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
      <!-- More content... -->
    </div>
    
    <div class="my-8">
      <h2 class="text-xl font-semibold mb-2">Section 2</h2>
      <p class="mb-4">Vivamus pellentesque tellus arcu, et imperdiet urna tempus non.</p>
      <!-- More content... -->
    </div>
    
    <!-- Force scrolling with tall content -->
    <div class="h-screen bg-gray-100 my-4 flex items-center justify-center">
      <span class="text-lg">Tall content section 1</span>
    </div>
    
    <div class="h-screen bg-gray-200 my-4 flex items-center justify-center">
      <span class="text-lg">Tall content section 2</span>
    </div>
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