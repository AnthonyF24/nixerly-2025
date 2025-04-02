<script>
  // Imports if needed
</script>

<div class="page-container overflow-auto">
  <div class="content">
    <h1 class="text-2xl font-bold">Contact Us</h1>
    <p class="my-4">Get in touch with our team.</p>
    
    <form class="max-w-md mt-8">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium mb-1">Name</label>
        <input type="text" id="name" class="w-full p-2 border rounded" />
      </div>
      
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <input type="email" id="email" class="w-full p-2 border rounded" />
      </div>
      
      <div class="mb-4">
        <label for="message" class="block text-sm font-medium mb-1">Message</label>
        <textarea id="message" class="w-full p-2 border rounded h-32"></textarea>
      </div>
      
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Send Message</button>
    </form>
    
    <!-- Extra content to ensure scroll testing -->
    <div class="h-screen bg-gray-100 my-12 flex items-center justify-center">Additional content section</div>
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